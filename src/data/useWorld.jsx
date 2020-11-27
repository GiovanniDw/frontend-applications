import { useState, useEffect } from 'react';
import { json } from 'd3';
import { feature, mesh } from 'topojson-client';

const jsonWrld = 'https://unpkg.com/world-atlas@2.0.2/countries-10m.json';
        

export const useWrld = () => {
	const [data, setData] = useState(null);
	useEffect(() => {
		json(jsonWrld).then(topology => {
			const { countries, land } = topology.objects;
			setData({
				land: feature(topology, land),
				countries: mesh(topology, countries, (a, b) => a !== b)
			});
		});
	}, []);
	return data;
};