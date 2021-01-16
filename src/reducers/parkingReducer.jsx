/* eslint-disable indent */
import { filter } from 'lodash';
import React from 'react';

import {
	filterParkingByUsage,
	filterParkingByProvince,
	filterParkingByCity,
	resetParkingFilter,
} from '../helpers/formatters';

const parkingReducer = (state, action) => {
	let activeLocations;
	let activeUsage;
	let activeCity;
	let province;

	switch (action.type) {
		case 'INITIAL_API_CALL':
			// activeLocations = action.payload.data.filter((d) => filterParkingByUsage)
			return {
				...state,
				allLocations: action.payload.data,
				activeLocations: action.payload.data,
				activeUsage: action.payload.data,
				activeProvince: action.payload.province,
			};
		case 'FILTER_PARKING_USAGE':
			activeUsage = state.allLocations.filter((d) =>
				filterParkingByUsage(d, action.payload.usage)
			);

			if (state.activeProvince !== null) {
				activeLocations = activeLocations.filter((usage) =>
					filterParkingByUsage(usage, state.activeProvince)
				);
			}
			return {
				...state,
				activeLocations,
				activeUsage: action.payload.usage,
			};
		case 'FILTER_ACTIVE_PROVINCE':
			province = action.payload.province;
			if (province !== null) {
				activeLocations = state.allLocations
					.filter((d) => filterParkingByProvince(d, province))
					.filter((d) => filterParkingByUsage(d, state.activeUsage));
			} else if (province === state.activeProvince) {
				province = null;
			} else {
				activeLocations = state.allLocations.filter((d) =>
					filterParkingByUsage(d, state.activeUsage)
				);
			}
			return {
				...state,
				activeLocations,
				activeProvince: province,
			};
		case 'RESET':
			return {
				...state,
				activeLocations,
				activeProvince: null,
				activeUsage: state.activeUsage,
				reset: false,
			};

		default:
			return state;
	}
};

export default parkingReducer;
