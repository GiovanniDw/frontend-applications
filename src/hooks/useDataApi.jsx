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
// https://www.robinwieruch.de/react-hooks-fetch-data/

const cleanProvince = (d) => {
	if (!d.province) return;
	d.province = d.province.replace('Fryslân', 'Friesland');
	return d;
};

const cleanUsage = (d) => {
	try {
		d.usage = d.usage
			.replace('park and ride', 'P+R Parkeerplaats')
			.replace('garage', 'Parkeergarage')
			.replace('terrain', 'Parkeerterrein');

		return d;
	} catch (error) {
		console.log(error);
	}

	return d;
};
// const cleanParkingData = (d) => {
// 	cleanProvince(d);
// 	cleanUsage(d);
// 	d.id = +d.id;
// 	d.minimumHeightInMeters = +d.minimumHeightInMeters;
// 	d.latitude = +d.latitude;
// 	d.longitude = +d.longitude;
// 	d.capacity = +d.capacity;
// 	// console.log(d);

// 	return d;
// };

export const useDataApiD3 = (initialUrl, initialData) => {
	const [data, setData] = useState(initialData);
	const [url, setUrl] = useState(initialUrl);
	const [isLoading, setIsLoading] = useState(false);

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
		const makeAPICall = () => {
			const ls = localStorage.getItem(initialUrl);
			if (ls) {
				dsv(';', ls, autoType, cleanParkingData).then(setData);
				console.log(data);
			} else {
				setIsLoading(true);
				try {
					dsv(';', url, autoType, cleanParkingData).then(setData);
					console.log(data);
					localStorage.setItem(initialUrl, url);
				} catch (err) {
					console.log('err', err);
				}
			}
			setIsLoading(false);
		};
		makeAPICall();
	}, [url]);

	return [{ data, isLoading }, setUrl];
};

export default useDataApiD3;
