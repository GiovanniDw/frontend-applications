import React, {useRef} from 'react';

import './App.css';
import GlobalStyle from './GlobalStyle';
import { useNLD } from './data/useNLD'
import { usePenR } from './data/usePenR';

import {SVGContainer} from './components/SVGContainer';
import { DrawMap } from './components/DrawMap'
// import { MapNL } from './components/MapNL';
import {ZoomContainer} from './components/ZoomContainer'



const App = () => {
  const nld = useNLD();
  const penr = usePenR();

  if (!nld || !penr) {
  return <pre>Loading...</pre>
}
  return (
		<div className='App'>
			<SVGContainer width='100%' height='100%'>
				<ZoomContainer>
					<DrawMap nld={nld} penr={penr} />
				</ZoomContainer>
			</SVGContainer>
		  {/* <MapNL/> */}
		  <GlobalStyle />
		</div>
  );
}

export default App;

