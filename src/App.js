import { useEffect, useState } from "react";
import CountrySelector from "./components/CountrySelector";
import Highlight from "./components/Highlight";
import Summary from "./components/Summary";
import { getCountry, getReportByCountry } from "./apis";
import { sortBy } from "lodash";
import { Container, Typography } from "@material-ui/core";
import "@fontsource/roboto";
import moment from "moment";
import "moment/locale/vi";

moment.locale("vi");

function App() {
	const [countries, setCountries] = useState([]);
	const [selectedCountryId, setSelectedCountryId] = useState("");
	const [report, setReport] = useState([]);

	useEffect(() => {
		getCountry()
			.then((res) => {
				const sortData = sortBy(res.data, "Country");
				setCountries(sortData);
				setSelectedCountryId("vn");
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const handleChange = (e) => {
		setSelectedCountryId(e.target.value);
	};

	useEffect(() => {
		if (selectedCountryId) {
			const { Slug } = countries.find(
				(country) => country.ISO2.toLowerCase() === selectedCountryId
			);

			// Call API
			getReportByCountry(Slug)
				.then((res) => {
					// Delete last item
					res.data.pop();
					setReport(res.data);
				})
				.catch((err) => console.log(err));
		}
	}, [countries, selectedCountryId]);

	return (
		<Container style={{ marginTop: 20 }}>
			<Typography variant="h2" component="h2">
				Biểu đồ Covid-19
			</Typography>
			<Typography>{moment().format("LLL")}</Typography>
			<CountrySelector
				countries={countries}
				handleChange={handleChange}
				value={selectedCountryId}
			/>
			<Highlight report={report} />
			<Summary report={report} countrySelected={selectedCountryId} />
		</Container>
	);
}

export default App;
