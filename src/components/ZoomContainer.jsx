import { select, zoom, geoPath, selection } from 'd3';
import React, { useState, useEffect } from 'react';
import { useSvg } from './SVGContainer';

export const ZoomContainer = (props) => {
	const { children, path, activeProvince } = props;
	const svgElement = useSvg();

	const [{ x, y, k }, setTransform] = useState({ x: 0, y: 0, k: 1 });
	const [centered, setCentered] = useState(null);
	const zoomed = (event) => {
		const { transform } = event;
		setTransform(transform);
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
	// 	console.log(currentProvince.node());
	// }

	const zoomToProvince = (d) => {
		let x, y, k;

		if (!d) return;
		if (d && centered !== d) {
			let centroid = path.centroid(d);
			console.log(centroid);
			x = centroid[0];
			y = centroid[1];
			k = 4;

			setCentered(d);
			setTransform(centered);
		}
	};

	useEffect(() => {
		if (!svgElement) return;
		const selection = select(svgElement);
		const zoomMap = zoom().scaleExtent([1, 8]).on('zoom', zoomed);
		zoomToProvince(activeProvince);
		selection.call(zoomMap);
		return () => selection.on('zoom', null);
	}, [svgElement, activeProvince]);

	return <g transform={`translate(${x}, ${y}) scale(${k})`}>{children}</g>;
};
