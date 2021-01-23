/* eslint-disable indent */
/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useState, useRef, useEffect, useMemo, useReducer } from 'react';
import useDimensions from 'react-cool-dimensions';
import { useSpring, animated } from 'react-spring';
import { GlobalStyle, colors, px2vw } from './GlobalStyles.jsx';
import { useNLD } from './data/useNLD';
import { useParkingData } from './data/useParkingData';
import { useWrld } from './data/useWorld';
import useDataApi from './hooks/useDataApi';
import useWindowSize from './helpers/useWindowSize';
import {
	useResizeObserver,
	useObserver,
	useRect,
	useBbox,
} from './helpers/useResizeObservers.js';

import { SVGContainer } from './components/SVGContainer';
import { Loading } from './components/Loading';
import { Container } from './components/StyledComponents';
import DrawViz from './components/DrawViz/';
import DrawNL from './components/DrawNL';
import PieChart from './components/PieChart';

import { formatData } from './helpers/formatters';

import { geoMercator, geoPath, scaleLinear, max, scaleOrdinal } from 'd3';
const parkeerData =
	'https://gist.githubusercontent.com/GiovanniDw/9ebe42d142f40e58e333e546a82f9b0d/raw/5f69fabb70e85ae64cf19633aadd38fcf26a75a4/parkeerData.csv';

import parkingReducer from './reducers/parkingReducer';

const initialState = {
	allLocations: [],
	activeLocations: [],
	nestedActiveLocations: [],
	activeUsage: 'all',
	activeCity: [],
	activeProvince: 'all',
	provinces: [],
	sizeScale: [],
	colorRange: [colors.darkBlue, colors.darkGray, colors.yellow],
	reset: false,
};

export const App = () => {
	const [olddata, setData] = useState();
	const [hoveredUsage, setHoveredUsage] = useState(null);

	const [parkingData, dispatch] = useReducer(parkingReducer, initialState);
	const [{ data, isLoading }] = useDataApi(
		'https://gist.githubusercontent.com/GiovanniDw/9ebe42d142f40e58e333e546a82f9b0d/raw/5f69fabb70e85ae64cf19633aadd38fcf26a75a4/parkeerData.csv',
		[]
	);

	const vizWrapperRef = useRef();

	const nld = useNLD();
	// const getData = useParkingData();
	const wrld = useWrld();

	// const [container, setContainer] = useState(null);

	useEffect(() => {
		if (data.length) {
			dispatch({
				type: 'INITIAL_API_CALL',
				payload: { data: formatData(data) },
			});
		}
		// console.log(isLoading);
	}, [data]);

	// useEffect(() => {
	// 	if (!getData) return;
	// 	setData(getData);
	// 	return;
	// }, [getData]);

	if (!nld || !parkingData) {
		return (
			<div className='App'>
				<Loading />
			</div>
		);
	}

	// const filteredUsage = hoveredUsage
	// 	? olddata.filter((d) => colorValue(d))
	// 	: olddata;

	// const filteredData = activeProvinceFeature
	// 	? data.filter(
	// 			(d) =>
	// 				activeProvinceFeature.properties.statnaam ===
	// 				provinceValue(d)
	// 	  )
	// 	: data;

	// const filterData = () => {
	// 	try {
	// 		return data.filter(
	// 			(d) => activeProvince.properties.statnaam === provinceValue(d)
	// 		);
	// 	} catch (error) {
	// 		return data;
	// 	}
	// };

	return (
		<>
			<div className='App'>
				<Container ref={vizWrapperRef}>
					{isLoading ? (
						<Loading />
					) : (
						<DrawViz nld={nld} {...parkingData} dispatch={dispatch}>
							<h1 className='title'>
								Parkeer plaatsen van Nederland{' '}
								{/* <span
									className='current-province'
									onClick={() =>
										setActiveProvinceFeature(null)
									}
								>
									{parkingData.activeProvince
										? `in ${parkingData.activeProvince}`
										: ''}
								</span> */}
							</h1>
						</DrawViz>
					)}

					{/* <DrawNL nld={nld} penr={penr} size={size} /> */}

					{/* <MapNL/> */}
				</Container>
			</div>
			<GlobalStyle />
		</>
	);
};

export default App;
