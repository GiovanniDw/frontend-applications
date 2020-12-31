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
import DrawViz from './components/DrawViz/';
import DrawNL from './components/DrawNL';
import PieChart from './components/PieChart';
import { geoMercator, geoPath, scaleLinear, max, scaleOrdinal } from 'd3';

export const App = () => {
	const nld = useNLD();
	const penr = usePenR();
	const wrld = useWrld();

	const [hoveredUsage, setHoveredUsage] = useState(null);
	const [activeProvince, setActiveProvince] = useState(null);

	const vizWrapperRef = useRef();

	if (!nld || !penr) {
		return (
			<div className='App'>
				<Loading />
			</div>
		);
	}

	// const [container, setContainer] = useState(null);

	const colorValue = (d) => d.usage;
	const colorRange = [colors.darkBlue, colors.darkGray, colors.yellow];

	const sizeValue = (d) => d.capacity;

	const filteredUsage = penr.filter((d) => hoveredUsage === colorValue(d));

	const colorScale = scaleOrdinal()
		.domain(penr.map(colorValue))
		.range(colorRange);

	// useEffect(() => {
	// 	// setHoveredUsage(penr.map(d) => d.usage)
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
	// useEffect(() => {
	// 	if (!dimensions) return;

	// 	console.log(width);
	// }, [dimensions]);
	return (
		<>
			<Container ref={vizWrapperRef}>
				<DrawViz
					nld={nld}
					penr={penr}
					hoveredUsage={hoveredUsage}
					filteredUsage={filteredUsage}
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
			<GlobalStyle />
		</>
	);
};

export default App;
