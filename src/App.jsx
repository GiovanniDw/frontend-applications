import React, { useState, useRef, useEffect } from 'react';
import useDimensions from 'react-cool-dimensions';
import { GlobalStyle, colors, px2vw } from './GlobalStyles.jsx';
import { useNLD } from './data/useNLD';
import { usePenR } from './data/usePenR';
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
import DrawMap from './components/DrawMap';
import DrawNL from './components/DrawNL';

import { geoMercator, geoPath, scaleLinear, max, scaleOrdinal } from 'd3';

const App = () => {
	const nld = useNLD();
	const penr = usePenR();
	const wrld = useWrld();

	const [selectedUsage, setSelectedUsage] = useState(null);
	const [activeProvince, setActiveProvince] = useState(null);
	if (!nld || !penr) {
		return (
			<div className='App'>
				<Loading />
			</div>
		);
	}

	// const [container, setContainer] = useState(null);

	const colorValue = (d) => d.usage;

	const filteredUsage = penr.filter((d) => selectedUsage === colorValue(d));
	const colorScale = scaleOrdinal()
		.domain(penr.map(colorValue))
		.range([colors.darkBlue, colors.darkGray, colors.yellow]);

	// useEffect(() => {
	// 	// setSelectedUsage(penr.map(d) => d.usage)
	// 	// if (containerRef.current) {
	// 	// 	console.log(containerRef);
	// 	// }
	// 	// setContainer(containerRef.current);
	// 	// const { containerRef } = useDimensions({
	// 	// 	onResize: ({ width, height }) => {
	// 	// 		// Triggered whenever the size of the target is changed
	// 	// 		setSize({ width: width, height: height });
	// 	// 	},
	// 	// });
	// }, []);

	return (
		<>
			<Container>
				<DrawMap
					nld={nld}
					penr={penr}
					selectedUsage={selectedUsage}
					filteredUsage={filteredUsage}
					colorScale={colorScale}
					colorValue={colorValue}
					fadeOpacity={0.2}
					setActiveProvince={setActiveProvince}
					activeProvince={activeProvince}
					setSelectedUsage={setSelectedUsage}
				>
					<h1 className='title'>
						Parkeer plaatsen van Nederland{' '}
						{activeProvince
							? `in ${activeProvince.properties.statnaam}`
							: ''}
					</h1>
				</DrawMap>
				{/* <DrawNL nld={nld} penr={penr} size={size} /> */}

				{/* <MapNL/> */}
			</Container>
			<GlobalStyle />
		</>
	);
};

export default App;
