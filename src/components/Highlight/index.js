import React from "react";
import { Grid } from "@material-ui/core";
import HighLightCart from "./HighLightCart";

export default function Highlight({ report }) {
	const data = report && report.length ? report[report.length - 1] : [];

	const summary = [
		{
			title: "Số ca nhiễm",
			count: data.Confirmed,
			type: "confirmed",
		},
		{
			title: "Số ca khỏi",
			count: data.Recovered,
			type: "recovered",
		},
		{
			title: "Số ca tử vong",
			count: data.Deaths,
			type: "deaths",
		},
	];

	return (
		<Grid container spacing={3}>
			{summary.map((data, index) => {
				return (
					<HighLightCart
						key={index}
						title={data.title}
						count={data.count}
						type={data.type}
					/>
				);
			})}
		</Grid>
	);
}
