import { useState, useEffect } from 'react';
import { csv, group, dsv } from 'd3';

const csvPenR =
	'https://gist.githubusercontent.com/GiovanniDw/9ebe42d142f40e58e333e546a82f9b0d/raw/1f4e17c5e2a072e12ed5b2dce628413294a13c5e/OpenParkingPenR.csv';

const csvParking =
	'https://gist.githubusercontent.com/GiovanniDw/9ebe42d142f40e58e333e546a82f9b0d/raw/55947d8316f6ab6cf5aa564229e5461d9414bf5b/openParking.csv';

const parkeerData =
	'https://gist.githubusercontent.com/GiovanniDw/9ebe42d142f40e58e333e546a82f9b0d/raw/5f69fabb70e85ae64cf19633aadd38fcf26a75a4/parkeerData.csv';

const ssv = '';

const row = (d) => {
	d.latitude = +d.latitude;
	d.longitude = +d.longitude;
	d.capacity = +d.capacity;
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

export const usePenR = () => {
	const [data, setData] = useState(null);
	useEffect(() => {
		const cleanParkingData = (d) => {
			d.province = d.province.replace('Fryslân', 'Friesland');
			d.id = +d.id;
			d.usage = d.usage
				.replace('park and ride', 'P+R Parkeerplaats')
				.replace('garage', 'Parkeergarage')
				.replace('terrain', 'Parkeerterrein');
			d.minimumHeightInMeters = +d.minimumHeightInMeters;
			d.latitude = +d.latitude;
			d.longitude = +d.longitude;
			d.capacity = +d.capacity;
			// console.log(d);

			return d;
		};
		// csv(csvParking, cleanParkingData).then(setData);
		dsv(';', parkeerData, cleanParkingData).then(setData);
	}, []);
	console.log(data);
	return data;
};
