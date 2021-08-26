import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import moment from "moment";
import { ButtonGroup, Button } from "@material-ui/core";

const generateOption = (data) => {
	const categories = data.map((item) => {
		return moment(item.Date).format("DD/MM/YYYY");
	});
	return {
		chart: {
			height: 500,
		},
		title: {
			text: "Tổng ca nhiễm",
		},
		xAxis: {
			categories: categories,
			crosshair: true,
		},
		colors: ["#F3585B"],
		yAxis: {
			min: 0,
			title: {
				text: "Số lượng",
			},
			labels: {
				align: "right",
			},
		},
		tooltip: {
			headerFormat:
				'<span style="font-size:10px">{point.key}</span><table>',
			pointFormat:
				'<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
				'<td style="padding:0"><b>{point.y} ca</b></td></tr>',
			footerFormat: "</table>",
			shared: true,
			useHTML: true,
		},
		plotOptions: {
			column: {
				pointPadding: 0.2,
				borderWidth: 0,
			},
		},
		series: [
			{
				name: "Tổng Ca nhiễm",
				data: data.map((item) => item.Confirmed),
			},
		],
	};
};

const LineChart = ({ data }) => {
	const [options, setOptions] = useState({});
	const [report, setReport] = useState("all");

	useEffect(() => {
		let dataReport = [];
		switch (report) {
			case "all":
				dataReport = data;
				break;
			case "30":
				dataReport = data.splice(data.length - 30);
				break;
			case "7":
				dataReport = data.splice(data.length - 7);
				break;
			default:
				dataReport = data;
				break;
		}
		setOptions(generateOption(dataReport));
	}, [data, report]);

	return (
		<div>
			<ButtonGroup
				size="small"
				style={{
					display: "flex",
					justifyContent: "flex-end",
					marginBottom: 30,
				}}
			>
				<Button
					color={report === "all" ? "secondary" : ""}
					onClick={() => setReport("all")}
				>
					Tất cả
				</Button>
				<Button
					color={report === "30" ? "secondary" : ""}
					onClick={() => setReport("30")}
				>
					30 ngày
				</Button>
				<Button
					color={report === "7" ? "secondary" : ""}
					onClick={() => setReport("7")}
				>
					7 ngày
				</Button>
			</ButtonGroup>
			<HighchartsReact highcharts={Highcharts} options={options} />
		</div>
	);
};

export default React.memo(LineChart);
