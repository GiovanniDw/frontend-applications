import {
	select,
	zoom,
	geoPath,
	selection,
	selectAll,
	zoomIdentity,
	pointer,
	zoomTransform,
} from 'd3';
import React, { useState, useEffect } from 'react';
import { useSvg } from './SVGContainer';

export const ZoomContainer = (props) => {
	const { children, path, activeProvince, size } = props;
	const { width, height } = size;
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

	function zoomToProvince(event, d) {
		let x, y, k;
		let centroid = path.bounds(d);
		console.log(d);
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
			console.log(centered);
			setCentered(null);
		}

		if (centered) {
			console.log(centered);
			setTransform(centered);
		}
	}

	useEffect(() => {
		if (!svgElement) return;
		const svg = select(svgElement);
		const province = svg.select('g.provinces').selectAll('path');
		const zoomMap = zoom().scaleExtent([1, 8]).on('zoom', zoomed);
		console.log(province);

		const reset = () => {
			// provinces.transition().style('fill', null).attr('class', null);
			svg.transition()
				.duration(750)
				.call(
					zoomMap.transform,
					zoomIdentity,
					zoomTransform(svg.node()).invert([800 / 2, 600 / 2])
				);
		};

		function clicked(event, d) {
			const { transform } = event;

			const [[x0, y0], [x1, y1]] = path.bounds(d);
			event.stopPropagation();

			if (activeProvince === this) reset();

			// activeProvince.classed('active', false);

			svg.selectAll('path');
			svg.transition()
				.duration(750)
				.call(
					zoomMap.transform,
					zoomIdentity
						.translate(width / 2, height / 2)
						.scale(
							Math.min(
								8,
								0.9 /
									Math.max(
										(x1 - x0) / width,
										(y1 - y0) / height
									)
							)
						)
						.translate(-(x0 + x1) / 2, -(y0 + y1) / 2),
					pointer(event, svg.node())
				);
			setTransform(transform);
		}

		svg.on('click', reset);

		province.on('click', zoomToProvince);

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
