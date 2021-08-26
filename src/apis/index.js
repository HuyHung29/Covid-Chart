import axios from "axios";

export const getCountry = () => {
	return axios.get("https://api.covid19api.com/countries");
};

export const getReportByCountry = (country) => {
	return axios.get(`https://api.covid19api.com/dayone/country/${country}`);
};

export const getMapDataByCountryId = (countryId) =>
	import(
		`@highcharts/map-collection/countries/${countryId}/${countryId}-all.geo.json`
	);
