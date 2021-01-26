import {
	select,
	pie,
	arc,
	rollups,
	rollup,
	interpolate,
	scaleOrdinal,
	scaleSqrt,
	max,
} from 'd3';

import { useMemo } from 'react';

import { GlobalStyle, colors, px2vw } from '../GlobalStyles';

// const [maxRadius, setMaxradius] = useState(10);

const colorRange = [colors.darkBlue, colors.darkGray, colors.yellow];
const colorValue = (d) => d.usage;
const sizeValue = (d) => d.capacity;
const provinceValue = (d) => d.province;
const maxRadius = 10;

// export const colorScale = () =>
// 	scaleOrdinal().domain(data.map(colorValue)).range(colorRange);

// export const sizeScale = () =>
// 	scaleSqrt()
// 		.domain([0, max(data, sizeValue)])
// 		.range([0, maxRadius]);

export const formatData = (data) => {
	const maxSizeVal = max(data, sizeValue);

	const colorScale = scaleOrdinal()
		.domain(data.map(colorValue))
		.range(colorRange);

	const capacitySizeScale = scaleSqrt()
		.domain([0, maxSizeVal])
		.range([0, maxRadius]);

	return data.map((d) => {
		// const sizeScaleValue = (d) => sizeScale(sizeValue(d));
		// const colorScaleValue = (d) => colorScale(colorValue(d));
		// console.log(colorScaleValue);

		return {
			id: d.id,
			name: d.name,
			province: d.province,
			usage: d.usage,
			city: d.city,
			latitude: d.latitude,
			longitude: d.longitude,
			capacity: d.capacity,
			minHeign: d.minimumHeightInMeters,
			active: false,
			color: colorScale(colorValue(d)),
			capacitySizeScale: capacitySizeScale(sizeValue(d)),
			// sizeScale: sizeScaleValue,
			// colorScale: colorScaleValue,
		};
	});
};

export const nestedData = (data) => {
	const nested = rollups(
		data,
		(v) => v.length,
		(d) => d.usage
	);

	return nested;
};

export const filterParkingByUsage = (d, filter) => d.usage === filter;
export const filterParkingByProvince = (d, filter) => d.province === filter;
export const filterParkingByCity = (d, filter) => d.city === filter;
export const resetParkingFilter = (d) => {
	d.active = false;
	return d;
};

// export const colorScale (d) => scaleOrdinal()
