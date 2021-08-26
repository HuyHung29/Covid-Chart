import React from "react";
import {
	FormControl,
	InputLabel,
	FormHelperText,
	NativeSelect,
} from "@material-ui/core";

export default function CountrySelector({ value, handleChange, countries }) {
	return (
		<FormControl style={{ marginTop: 20, marginBottom: 20 }}>
			<InputLabel htmlFor="country-selector" shrink>
				Quốc Gia
			</InputLabel>
			<NativeSelect
				value={value}
				onChange={handleChange}
				inputProps={{
					name: "country",
					id: "country-selector",
				}}
			>
				{countries.map((country, index) => {
					return (
						<option key={index} value={country.ISO2.toLowerCase()}>
							{country.Country}
						</option>
					);
				})}
			</NativeSelect>
			<FormHelperText>Lựa chọn quốc gia</FormHelperText>
		</FormControl>
	);
}
