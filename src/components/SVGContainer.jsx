import React, {
	useEffect,
	useRef,
	useState,
	createContext,
	useContext,
} from 'react';

const Context = createContext(null);

export const SVGContainer = (props) => {
	const { size, children, className } = props;
	if (!size) return;
	const { width, height } = size;

	const svgRef = useRef(null);
	const [svg, setSvg] = useState(null);
	useEffect(() => setSvg(svgRef.current), [size]);
	return (
		<svg
			className={className}
			ref={svgRef}
			viewBox={`0 0 ${width} ${height}`}
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
