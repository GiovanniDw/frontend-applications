import { select, zoom, zoomIdentity, zoomTransform } from 'd3';
import React, { useState, useEffect, useRef } from 'react';
import { useSvg } from './SVGContainer';

export const ZoomContainer = (props) => {
	const { children, path, activeProvince, setActiveProvince } = props;

	const svgElement = useSvg();

	const [{ x, y, k }, setTransform] = useState({ x: 0, y: 0, k: 1 });
	const zoomed = (event) => {
		const { transform } = event;
		setTransform(transform);
	};
	const zoomMap = useRef(zoom().scaleExtent([1, 10]).on('zoom', zoomed));
	useEffect(() => {
		if (!svgElement) return;

		const svg = select(svgElement);
		const width = svgElement.clientWidth;
		const height = svgElement.clientHeight;

		const reset = () => {
			setActiveProvince(null);
			svg.transition()
				.duration(750)
				.call(
					zoomMap.current.transform,
					zoomIdentity,
					zoomTransform(svg).invert([width / 2, height / 2])
				);
		};
		const currentProvince = select(activeProvince).node();

		if (activeProvince) {
			const [[x0, y0], [x1, y1]] = path.bounds(currentProvince);

			svg.selectAll('path');
			svg.transition()
				.duration(750)
				.call(
					zoomMap.current.transform,
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
						.translate(-(x0 + x1) / 2, -(y0 + y1) / 2)
				);
		} else {
			reset();
		}

		svg.call(zoomMap.current);
		return;
	}, [svgElement, activeProvince]);

	return (
		<g transform={`translate(${x}, ${y}) scale(${k})`} strokeWidth={1 / k}>
			{children}
		</g>
	);
};
