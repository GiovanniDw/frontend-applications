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
	const { children, path, activeProvince, size, setActiveProvince } = props;
	const { width, height } = size;
	const svgElement = useSvg();

	const [{ x, y, k }, setTransform] = useState({ x: 0, y: 0, k: 1 });
	const zoomed = (event) => {
		const { transform } = event;
		setTransform(transform);
	};

	useEffect(() => {
		if (!svgElement) return;
		const svg = select(svgElement);
		const zoomMap = zoom().scaleExtent([1, 8]).on('zoom', zoomed);

		const reset = () => {
			// provinces.transition().style('fill', null).attr('class', null);
			svg.transition()
				.duration(750)
				.call(
					zoomMap.transform,
					zoomIdentity,
					zoomTransform(svg.node()).invert([width / 2, height / 2])
				);
			setActiveProvince(null);
		};
		if (activeProvince) {
			const currentProvince = select(activeProvince).node();
			const [[x0, y0], [x1, y1]] = path.bounds(currentProvince);
			svg.transition()
				.duration(750)
				.call(
					zoomMap.transform,
					zoomIdentity
						.translate(width / 4, height / 4)
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
						.translate(-(x0 + x1) / 2, -(y0 + y1) / 2)
				);
		} else {
			reset();
		}

		svg.call(zoomMap);
		return () => {
			svg.on('.zoom', null);
		};
	}, [svgElement, activeProvince]);

	return <g transform={`translate(${x}, ${y}) scale(${k})`}>{children}</g>;
};
