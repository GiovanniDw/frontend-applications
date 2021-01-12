import React, { useState, useEffect, useRef } from 'react';
import { select, pie, arc, rollups, interpolate } from 'd3';
import { useSvg } from './SVGContainer';

import { useDimensions } from '../helpers/useResizeObservers';

export const Chart = (props) => {
	const { data, dimensions, colorScale, onHover } = props;
	const { width, height } = dimensions;
	const dataByUsage = rollups(
		data,
		(v) => v.length,
		(d) => d.usage
	);

	const svgElement = useSvg();

	const pieChartRef = useRef();
	const cache = useRef(dataByUsage);
	const pieSize = useDimensions(pieChartRef);

	useEffect(() => {
		if (!data || !dimensions || !pieChartRef || !pieSize) return;

		const drawChart = (dataByUsage) => {
			const outerRadius = Math.min(width, height) / 10 - 1;

			const pieGenerator = pie()
				.padAngle(0)
				.value((d) => d[1])
				.sort(null);
			const arcGenerator = arc().innerRadius(20).outerRadius(outerRadius);

			const pieData = pieGenerator(dataByUsage);
			const prevPieData = pieGenerator(cache.current);

			const selection = select(pieChartRef.current);
			const selectionWithData = selection
				.selectAll('g.arc')
				.data(pieData);
			selectionWithData.exit().remove();

			const selectionWidthUpdate = selectionWithData
				.enter()
				.append('g')
				.attr('class', 'arc');

			const path = selectionWidthUpdate
				.append('path')
				.merge(selectionWithData.select('path.arc'));

			const arcTween = (d, i) => {
				const interpolator = interpolate(prevPieData[i], d);

				return (t) => arcGenerator(interpolator(t));
			};

			path.attr('class', 'arc')
				.transition()
				.attrTween('d', arcTween)
				// .on('click', (d, i) => onHover(d.data[0]))
				.style('fill', (i) => colorScale(i.data[0]))
				.style('stroke', '#ffffff')
				.style('stroke-width', 2);
		};
		drawChart(dataByUsage);
		cache.current = dataByUsage;
	}, [svgElement, data, pieChartRef, dimensions]);

	return (
		<>
			<g
				transform={`translate(${width - 10 - pieSize.width / 2}, ${
					height - 10 - pieSize.width / 2
				})`}
			>
				<g ref={pieChartRef} className='arc'></g>
			</g>
		</>
	);
};

export default Chart;
