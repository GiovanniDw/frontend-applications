import { useState, useEffect } from 'react';
import { csv, group } from 'd3';

const csvPenR =
	'https://gist.githubusercontent.com/GiovanniDw/9ebe42d142f40e58e333e546a82f9b0d/raw/1f4e17c5e2a072e12ed5b2dce628413294a13c5e/OpenParkingPenR.csv';

const row = (d) => {
	d.province = +d.province;
	d.latitude = +d.latitude;
	d.longitude = +d.longitude;
	d.capacity = +d.capacity;
	return d;
};

const cleanPenR = (d) => {
	d.province = d.province.replace('Fryslân', 'Friesland');
	// d.name = +d.name.replace()
	// d.capacity = +d.capacity;
	return d;
};

export const usePenR = () => {
	const [data, setData] = useState(null);
	useEffect(() => {
		csv(csvPenR, cleanPenR).then((data) => {
			const byProvince = group(data, (d) => d.province);
			const byCity = group(data, (d) => d.city);
			setData({
				byProvince: byProvince,
				byCity: byCity,
				allPenR: row(data),
			});
		});
	}, []);
	return data;
};
