import React, {
	useEffect,
	useRef,
	useState,
	createContext,
	useContext,
} from 'react';

const Context = createContext(null);

export const SVGContainer = (props) => {
	const { size, children } = props;
	const { width, height } = size;
	const svgRef = useRef(null);
	const [svg, setSvg] = useState(null);
	useEffect(() => setSvg(svgRef.current), []);
	return (
		<svg
			ref={svgRef}
			viewBox={`0 0 ${'800'} ${'800'}`}
			width={width}
			height={height}
		>
			<Context.Provider value={svg}>{children}</Context.Provider>
		</svg>
	);
};

export function useSvg() {
	return useContext(Context);
}
