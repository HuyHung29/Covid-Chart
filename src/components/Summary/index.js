import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import LineChart from "../Charts/LineChart";
import HighMap from "../Charts/HighMap";
import { getMapDataByCountryId } from "../../apis/index";

export default function Summary({ report, countrySelected }) {
	const [mapData, setMapData] = useState({});

	useEffect(() => {
		if (countrySelected) {
			getMapDataByCountryId(countrySelected)
				.then((res) => {
					setMapData(res);
				})
				.catch((err) => console.log({ err }));
		}
	}, [countrySelected]);
	return (
		<Grid container spacing={3}>
			<Grid item sm={8} xs={12}>
				<LineChart data={report} />
			</Grid>
			<Grid item sm={4} xs={12}>
				<HighMap mapData={mapData} />
			</Grid>
		</Grid>
	);
}
