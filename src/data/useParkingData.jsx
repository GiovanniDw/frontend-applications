import { useState, useEffect } from 'react';
import {
	csv,
	group,
	dsv,
	map,
	rollups,
	rollup,
	autoType,
	nest,
	scaleOrdinal,
} from 'd3';
import { sum } from 'lodash';
import { GlobalStyle, colors, px2vw } from '../GlobalStyles';
const csvPenR =
	'https://gist.githubusercontent.com/GiovanniDw/9ebe42d142f40e58e333e546a82f9b0d/raw/1f4e17c5e2a072e12ed5b2dce628413294a13c5e/OpenParkingPenR.csv';

const csvParking =
	'https://gist.githubusercontent.com/GiovanniDw/9ebe42d142f40e58e333e546a82f9b0d/raw/55947d8316f6ab6cf5aa564229e5461d9414bf5b/openParking.csv';

const parkeerData =
	'https://gist.githubusercontent.com/GiovanniDw/9ebe42d142f40e58e333e546a82f9b0d/raw/5f69fabb70e85ae64cf19633aadd38fcf26a75a4/parkeerData.csv';

const ssv = '';

const row = (d) => {
	const toKeep = ['id', 'name'];

	const data = [];

	d.filter;

	return d;
};

// export const usePenR = () => {
// 	const [data, setData] = useState(null);
// 	useEffect(() => {
// 		csv(csvParking, cleanPenR).then((data) => {
// 			const byProvince = group(data, (d) => d.province);
// 			const byCity = group(data, (d) => d.city);
// 			setData({
// 				byProvince: byProvince,
// 				byCity: byCity,
// 				allPenR: data,
// 			});
// 		});
// 	}, []);
// 	return data;
// };

const cleanProvince = (d) => {
	if (!d.province) return;
	d.province = d.province.replace('Fryslân', 'Friesland');

	return d;
};

const cleanUsage = (d) => {
	d.usage = d.usage
		.replace('park and ride', 'P+R Parkeerplaats')
		.replace('garage', 'Parkeergarage')
		.replace('terrain', 'Parkeerterrein');

	return;
};

const byUsage = (data) => {
	if (!data || data === null) return;

	let allDatas = rollups(
		data,
		(v) => sum(v, (d) => d.capacity),
		(d) => d.province
	);

	const allData = rollup(
		data,
		(v) => sum(v, (d) => d.capacity),
		(d) => d.usage
	);

	// const byGroup = nest()
	// 	.key((d) => d['province'])
	// 	.rollup((v) => sum(v, (d) => d.capacity))
	// 	.entries(data)
	// 	.map(((d) => category: d.key), (count: d.value));

	return allDatas;
};

const nestData = (data) => {
	const nestedData = group(data, (d) => d).keys((d) => d.usage);

	// .rollups((d) => sum(d, (g) => g.capacity));

	return nestedData;
};
const colorRange = [colors.darkBlue, colors.darkGray, colors.yellow];

export const useParkingData = () => {
	const [data, setData] = useState(null);
	useEffect(() => {
		const cleanParkingData = (d) => {
			cleanProvince(d);
			cleanUsage(d);
			d.id = +d.id;
			d.minimumHeightInMeters = +d.minimumHeightInMeters;
			d.latitude = +d.latitude;
			d.longitude = +d.longitude;
			d.capacity = +d.capacity;
			// console.log(d);

			return d;
		};
		// csv(csvParking, cleanParkingData).then(setData);
		dsv(';', parkeerData, autoType, cleanParkingData).then((d) => {
			const allData = d;

			const nested = nestData(d);
			const usage = byUsage(d);
			return setData(d);
		});
	}, []);

	return data;
};
