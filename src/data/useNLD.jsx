import { useState, useEffect } from 'react';
import { json } from 'd3';
import { feature, mesh } from 'topojson-client';

const jsonNLD =
	'https://gist.githubusercontent.com/GiovanniDw/9ebe42d142f40e58e333e546a82f9b0d/raw/1f4e17c5e2a072e12ed5b2dce628413294a13c5e/nl_2020.json';

export const useNLD = () => {
	const [data, setData] = useState(null);
	useEffect(() => {
		json(jsonNLD).then((topology) => {
			const { gemeente_2020, provincie_2020 } = topology.objects;
			setData({
				gemeente: feature(topology, gemeente_2020),
				province: feature(topology, provincie_2020),
				provinceBorder: mesh(
					topology,
					provincie_2020,
					(a, b) => a !== b
				),
			});
		});
	}, []);
	return data;
};
