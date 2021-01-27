/* eslint-disable indent */
/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useState, useRef, useEffect, useMemo, useReducer } from 'react';

import { GlobalStyle, colors, px2vw } from './GlobalStyles.jsx';
import { useNLD } from './data/useNLD';

import { useWrld } from './data/useWorld';
import { useDataApiD3 } from './hooks/useDataApi';

import { Loading } from './components/Loading';
import { Container } from './components/StyledComponents';
import DrawViz from './components/DrawViz/';

import { formatData } from './helpers/formatters';

import parkingReducer from './reducers/parkingReducer';

const initialState = {
	allLocations: [],
	activeLocations: [],
	nestedActiveLocations: [],
	activeUsage: null,
	activeCity: [],
	activeProvince: null,
	provinces: [],
	sizeScale: [],
	sizeLegendValues: [],
	colorRange: [colors.darkBlue, colors.darkGray, colors.yellow],
	reset: false,
};

export const App = () => {
	const [olddata, setData] = useState();

	const [parkingData, dispatch] = useReducer(parkingReducer, initialState);
	const [{ data, isLoading }] = useDataApiD3(
		'https://gist.githubusercontent.com/GiovanniDw/9ebe42d142f40e58e333e546a82f9b0d/raw/5f69fabb70e85ae64cf19633aadd38fcf26a75a4/parkeerData.csv',
		[]
	);

	const vizWrapperRef = useRef();

	const nld = useNLD();
	// const getData = useParkingData();
	const wrld = useWrld();

	useEffect(() => {
		if (data.length) {
			dispatch({
				type: 'INITIAL_API_CALL',
				payload: { data: formatData(data) },
			});
		}
	}, [data]);

	return (
		<>
			<div className='App'>
				<Container ref={vizWrapperRef}>
					{isLoading || !nld ? (
						<Loading />
					) : (
						<DrawViz
							data={data}
							nld={nld}
							{...parkingData}
							dispatch={dispatch}
						>
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
				</Container>
			</div>
			<GlobalStyle />
		</>
	);
};

export default App;
