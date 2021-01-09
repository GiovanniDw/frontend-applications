import React, { useState, useRef, useEffect } from 'react';
import useDimensions from 'react-cool-dimensions';
import { GlobalStyle, colors, px2vw } from './GlobalStyles.jsx';
import { useNLD } from './data/useNLD';
import { useParkingData } from './data/useParkingData';
import { useWrld } from './data/useWorld';

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

export const App = () => {
	const nld = useNLD();
	const data = useParkingData();
	const wrld = useWrld();

	const [hoveredUsage, setHoveredUsage] = useState(null);
	const [activeProvince, setActiveProvince] = useState(null);
	const [parkingData, setParkingData] = useState({
		allData: [],
		activeUsage: [],
	});
	const vizWrapperRef = useRef();

	if (!nld || !data) {
		return (
			<div className='App'>
				<Loading />
			</div>
		);
	}

	// const [container, setContainer] = useState(null);

	const colorValue = (d) => d.usage;
	const provinceValue = (d) => d.province;

	const colorRange = [colors.darkBlue, colors.darkGray, colors.yellow];

	const sizeValue = (d) => d.capacity;

	const sizeRange = [];

	const filteredUsage = data.filter((d) => hoveredUsage === colorValue(d));

	const filterData = () => {
		try {
			return data.filter(
				(d) => activeProvince.properties.statnaam === provinceValue(d)
			);
		} catch (error) {
			return data;
		}
	};
	const filteredData = filterData();
	const colorScale = scaleOrdinal()
		.domain(data.map(colorValue))
		.range(colorRange);

	// useEffect(() => {
	// 	if (data.length) {
	// 		const formattedData = formatData(data);
	// 		setParkingData((prevState) => ({
	// 			...prevState,
	// 			allData: formattedData,
	// 			activeUsage: formattedData,
	// 		}));
	// 	}
	// }, [data]);

	return (
		<>
			<div className='App'>
				<Container ref={vizWrapperRef}>
					<DrawViz
						nld={nld}
						data={data}
						hoveredUsage={hoveredUsage}
						filteredUsage={filteredUsage}
						filteredData={filteredData}
						colorScale={colorScale}
						colorValue={colorValue}
						sizeValue={sizeValue}
						fadeOpacity={0.2}
						setActiveProvince={setActiveProvince}
						activeProvince={activeProvince}
						setHoveredUsage={setHoveredUsage}
					>
						<h1 className='title'>
							Parkeer plaatsen van Nederland{' '}
							<span
								className='current-province'
								onClick={() => setActiveProvince(null)}
							>
								{activeProvince
									? `in ${activeProvince.properties.statnaam}`
									: ''}
							</span>
						</h1>
					</DrawViz>

					{/* <DrawNL nld={nld} penr={penr} size={size} /> */}

					{/* <MapNL/> */}
				</Container>
			</div>
			<GlobalStyle />
		</>
	);
};

export default App;
