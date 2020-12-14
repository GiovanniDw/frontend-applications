import {
	select,
	zoom,
	geoPath,
	selection,
	selectAll,
	zoomIdentity,
	pointer,
} from 'd3';
import React, { useState, useEffect } from 'react';
import { useSvg } from './SVGContainer';

export const ZoomContainer = (props) => {
	const { children, path, activeProvince, provinces } = props;
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
			k = 3;
			console.log(x, y, k);
			setCentered(x, y, k);
			console.log(centered);
		} else {
			setCentered(null);
		}

		if (centered) {
			setTransform(centered);
		}
	};

	useEffect(() => {
		if (!svgElement) return;
		const svg = select(svgElement);
		// const province = select(provinces);
		const zoomMap = zoom().scaleExtent([1, 8]).on('zoom', zoomed);
		// console.log(province);
		// const clicked = (event, d) => {
		// 	const [[x0, y0], [x1, y1]] = path.bounds(d);
		// 	event.stopPropagation();

		// 	// if (active.node() === this) reset();

		// 	// active.classed('active', false);
		// 	// active = select(this).classed('active', true);

		// 	svg.selectAll('path');
		// 	svg.transition()
		// 		.duration(750)
		// 		.call(
		// 			zoomMap.transform,
		// 			zoomIdentity
		// 				.translate(1 / 2, 1 / 2)
		// 				.scale(
		// 					Math.min(
		// 						8,
		// 						0.9 / Math.max((x1 - x0) / 1, (y1 - y0) / 1)
		// 					)
		// 				)
		// 				.translate(-(x0 + x1) / 2, -(y0 + y1) / 2)
		// 		);
		// };

		// province.on('click', clicked);

		// zoomToProvince(activeProvince);

		svg.call(zoomMap);
		return () => {
			svg.on('.zoom', null);
		};
	}, [svgElement]);

	return <g transform={`translate(${x}, ${y}) scale(${k})`}>{children}</g>;
};
