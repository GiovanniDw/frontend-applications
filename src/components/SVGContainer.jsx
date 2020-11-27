import React, {useEffect, useRef, useState, createContext, useContext} from 'react';

const Context = createContext(null);

export const SVGContainer = ({ children, width, height }) => {
	const svgRef = useRef(null);
	const [svg, setSvg] = useState(null);
	useEffect(() => setSvg(svgRef.current), []);
	return (
		<svg
			ref={svgRef}
			width={width}
			height={height}
		>
			<Context.Provider value={svg}>{children}</Context.Provider>
		</svg>
	);};

export function useSvg() {
	return useContext(Context);
}
