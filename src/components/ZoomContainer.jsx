import { select, zoom, geoPath } from 'd3';
import React, { useState, useEffect } from 'react';
import { useSvg } from './SVGContainer';

export const ZoomContainer = (props) => {
	const { children, activeProvince } = props;

	const svgElement = useSvg();
	const [{ x, y, k }, setTransform] = useState({ x: 0, y: 0, k: 1 });

	const zoomed = (event) => {
		setTransform(event.transform);
	};
	// const clicked = (event, d) => {
	// 	const [[x0, y0], [x1, y1]] = geoPath.bounds(d);
	// };
	// const zoomToContainer = (event) => {
	// 	// const [[x0, y0], [x1, y1]] = path.bounds(d);
	// 	event.stopPropagation();
	// };

	// const reset = () => {

	// }

	// if (activeProvince) {
	// 	const currentProvince = select(activeProvince);
	// 	// console.log(currentProvince.node());
	// }

	useEffect(() => {
		if (!svgElement) return;
		const selection = select(svgElement);
		const zoomMap = zoom().scaleExtent([1, 8]).on('zoom', zoomed);

		selection.call(zoomMap);
		return () => selection.on('.zoom', null);
	}, [svgElement]);

	return <g transform={`translate(${x}, ${y}) scale(${k})`}>{children}</g>;
};
