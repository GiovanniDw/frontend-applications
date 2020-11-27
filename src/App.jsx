import React from 'react';

import './App.css';
import GlobalStyle from './GlobalStyle';
import { useNLD } from './data/useNLD';
import { usePenR } from './data/usePenR';
import { useWrld } from './data/useWorld';

import { SVGContainer } from './components/SVGContainer';
import DrawMap from './components/DrawMap';

const App = () => {
	const nld = useNLD();
	const penr = usePenR();
	const wrld = useWrld();

	if (!nld || !penr || !wrld) {
		return <pre>Loading...</pre>;
	}
	return (
		<div className='App'>
			<SVGContainer width='100%' height='100%'>
				<DrawMap nld={nld} penr={penr} wrld={wrld} />
			</SVGContainer>
			{/* <MapNL/> */}
			<GlobalStyle />
		</div>
	);
};

export default App;
