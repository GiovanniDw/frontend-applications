import {
	select,
	pie,
	arc,
	rollups,
	interpolate,
	scaleOrdinal,
	scaleSqrt,
	max,
} from 'd3';
import { GlobalStyle, colors, px2vw } from '../GlobalStyles';

const colorRange = [colors.darkBlue, colors.darkGray, colors.yellow];
const colorValue = (d) => d.usage;
const sizeValue = (d) => d.capacity;
export const formatData = (data) => {
	return data.map((d) => {
		return {
			name: d.name,
			province: d.province,
			usage: d.usage,
			city: d.city,
			latitude: d.latitude,
			longitude: d.longitude,
			capacity: d.capacity,
			minHeign: d.minimumHeightInMeters,
		};
	});
};

const nestedData = (data) => {
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
