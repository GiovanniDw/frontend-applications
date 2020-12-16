import React, { useState, useRef, useEffect } from 'react';

import './App.css';
import GlobalStyle from './GlobalStyle';
import { useNLD } from './data/useNLD';
import { usePenR } from './data/usePenR';
import { useWrld } from './data/useWorld';

import useWindowSize from './helpers/useWindowSize';
import useResizeObserver from './helpers/useResizeObserver';

import { SVGContainer } from './components/SVGContainer';
import DrawMap from './components/DrawMap';
import DrawNL from './components/DrawNL';

import { geoMercator, geoPath, scaleLinear, max, scaleOrdinal } from 'd3';
import Legend from './components/Legend';

const App = () => {
	const nld = useNLD();
	const penr = usePenR();
	const wrld = useWrld();
	const size = useWindowSize();
	const [selectedUsage, setSelectedUsage] = useState(null);
	if (!nld || !penr || !size) {
		return <pre>Loading...</pre>;
	}

	const colorValue = (d) => d.usage;
	const LegendLabel = 'Gebruik';
	const filteredUsage = penr.filter((d) => selectedUsage === colorValue(d));
	const colorScale = scaleOrdinal()
		.domain(penr.map(colorValue))
		.range(['#E6842A', '#137B80', '#8E6C8A']);
	// const wrapperRef = useRef(null);

	// useEffect(() => {
	// 	// size = wrapperRef.current.getBoundingClientRect();
	// }, []);

	// const [activeProvince, setActiveProvince] = useState(null);
	return (
		<div className='App'>
			<div>
				<SVGContainer size={size}>
					<DrawMap
						size={size}
						nld={nld}
						penr={penr}
						filteredUsage={filteredUsage}
						colorScale={colorScale}
						colorValue={colorValue}
					/>
					{/* <DrawNL nld={nld} penr={penr} size={size} /> */}
					<Legend
						penr={penr}
						selectUsage={setSelectedUsage}
						selectedUsage={selectedUsage}
						colorScale={colorScale}
						colorValue={colorValue}
						tickSpacing={22}
						tickSize={10}
						tickTextOffset={12}
						fadeOpacity={3}
						LegendLabel={LegendLabel}
					/>
				</SVGContainer>
				{/* <MapNL/> */}
				<GlobalStyle />
			</div>
		</div>
	);
};

export default App;
