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

import { geoMercator, geoPath, scaleLinear, max } from 'd3';

const App = () => {
	const nld = useNLD();
	const penr = usePenR();
	const wrld = useWrld();
	const size = useWindowSize();
	if (!nld || !penr || !size) {
		return <pre>Loading...</pre>;
	}
	// const wrapperRef = useRef(null);

	// useEffect(() => {
	// 	// size = wrapperRef.current.getBoundingClientRect();
	// }, []);

	// const [activeProvince, setActiveProvince] = useState(null);
	return (
		<div className='App'>
			<div>
				<SVGContainer size={size}>
					<DrawMap size={size} nld={nld} penr={penr} />
					{/* <DrawNL nld={nld} penr={penr} wrld={wrld} /> */}
				</SVGContainer>
				{/* <MapNL/> */}
				<GlobalStyle />
			</div>
		</div>
	);
};

export default App;
