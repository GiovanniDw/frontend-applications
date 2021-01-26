/* eslint-disable indent */
import { filter } from 'lodash';
import React from 'react';
import { max, scaleSqrt, scaleOrdinal, ascending } from 'd3';
import {
	filterParkingByUsage,
	filterParkingByProvince,
	filterParkingByCity,
	resetParkingFilter,
	nestedData,
} from '../helpers/formatters';

const parkingReducer = (state, action) => {
	let activeLocations;
	let nestedActiveLocations;
	let activeUsage;
	let activeCity;
	let province;
	let usage;
	let sortedLocations;

	switch (action.type) {
		case 'INITIAL_API_CALL':
			// activeLocations = action.payload.data.filter((d) => filterParkingByUsage)
			sortedLocations = action.payload.data.sort((a, b) =>
				ascending(a.usage, b.usage)
			);
			return {
				...state,
				allLocations: action.payload.data,
				activeLocations: action.payload.data,
				nestedActiveLocations: nestedData(sortedLocations),
			};
		case 'FILTER_PARKING_USAGE':
			usage = action.payload.usage;
			activeLocations = state.allLocations.filter((d) =>
				filterParkingByUsage(d, usage)
			);

			if (state.activeProvince !== null) {
				activeLocations = activeLocations.filter((d) =>
					filterParkingByProvince(d, state.activeProvince)
				);
			}
			return {
				...state,
				activeLocations,
				activeUsage: usage,
			};
		case 'FILTER_ACTIVE_PROVINCE':
			province = action.payload.province;
			if (province !== null) {
				activeLocations = state.allLocations.filter((d) =>
					filterParkingByProvince(d, province)
				);
				// .filter((d) => filterParkingByUsage(d, state.activeUsage));
				// } else if (province === state.activeProvince) {
				// 	province = null;
			} else {
				activeLocations = state.allLocations.filter((d) =>
					filterParkingByProvince(d, province)
				);
			}
			sortedLocations = activeLocations.sort((a, b) =>
				ascending(a.usage, b.usage)
			);

			nestedActiveLocations = nestedData(activeLocations);
			return {
				...state,
				activeLocations,
				nestedActiveLocations,
				activeProvince: province,
			};
		case 'RESET':
			return {
				...state,
				activeLocations: state.allLocations,
				nestedActiveLocations: nestedData(state.allLocations),
				activeProvince: null,
				activeUsage: null,
				reset: false,
			};

		default:
			return state;
	}
};

export default parkingReducer;
