import React, { useState, useRef, useEffect } from 'react';

import { GlobalStyle, colors } from './GlobalStyles.jsx';
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
import Legend from './components/Legend';

const App = () => {
	const nld = useNLD();
	const penr = usePenR();
	const wrld = useWrld();

	const [size, setSize] = useState({ width: 800, height: 600 });
	const [selectedUsage, setSelectedUsage] = useState(null);
	const [activeProvince, setActiveProvince] = useState(null);

	if (!nld || !penr) {
		return (
			<div className='App'>
				<Loading />
			</div>
		);
	}

	const colorValue = (d) => d.usage;
	const LegendLabel = 'Gebruik';
	const filteredUsage = penr.filter((d) => selectedUsage === colorValue(d));
	const colorScale = scaleOrdinal()
		.domain(penr.map(colorValue))
		.range([colors.darkBlue, colors.darkGray, colors.yellow]);

	return (
		<div className='App'>
			<Container>
				<DrawMap
					size={size}
					nld={nld}
					penr={penr}
					selectedUsage={selectedUsage}
					filteredUsage={filteredUsage}
					colorScale={colorScale}
					colorValue={colorValue}
					fadeOpacity={0.1}
					setActiveProvince={setActiveProvince}
					activeProvince={activeProvince}
				>
					<Legend
						className='legend'
						penr={penr}
						selectUsage={setSelectedUsage}
						selectedUsage={selectedUsage}
						colorScale={colorScale}
						colorValue={colorValue}
						tickSpacing={22}
						tickSize={10}
						tickTextOffset={12}
						fadeOpacity={0.1}
						LegendLabel={LegendLabel}
					/>
				</DrawMap>
				{/* <DrawNL nld={nld} penr={penr} size={size} /> */}

				{/* <MapNL/> */}
			</Container>
			<GlobalStyle />
		</div>
	);
};

export default App;
