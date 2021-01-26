import { select, zoom, zoomIdentity, zoomTransform } from 'd3';
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { useSvg } from './SVGContainer';

export const ZoomContainer = (props) => {
	const {
		children,
		path,
		activeProvinceFeature,
		setActiveProvinceFeature,
	} = props;

	const svgElement = useSvg();

	const [{ x, y, k }, setTransform] = useState({ x: 0, y: 0, k: 1 });

	useEffect(() => {
		if (!svgElement) return;

		const svg = select(svgElement);
		const width = svgElement.clientWidth;
		const height = svgElement.clientHeight;

		const zoomed = (event) => {
			const { transform } = event;
			setTransform(transform);
		};
		const zoomMap = zoom().scaleExtent([1, 7]).on('zoom', zoomed);
		const reset = () => {
			// setActiveProvinceFeature(null);
			svg.transition()
				.duration(750)
				.call(
					zoomMap.transform,
					zoomIdentity,
					zoomTransform(svg).invert([width / 2, height / 2])
				);
		};
		const currentProvince = select(activeProvinceFeature).node();

		if (activeProvinceFeature) {
			const [[x0, y0], [x1, y1]] = path.bounds(currentProvince);

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
						.translate(-(x0 + x1) / 2, -(y0 + y1) / 2)
				);
		}
		if (!activeProvinceFeature) {
			reset();
		}
		svg.call(zoomMap);
		return;
	}, [svgElement, activeProvinceFeature]);

	return (
		<g transform={`translate(${x}, ${y}) scale(${k})`} strokeWidth={2 / k}>
			{children}
		</g>
	);
};
