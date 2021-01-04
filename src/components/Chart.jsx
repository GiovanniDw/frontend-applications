import React, { useState, useEffect, useRef } from 'react';
import { select, format, pie, arc, rollup, path } from 'd3';
import { useSvg } from './SVGContainer';
export const Chart = (props) => {
	const {
		data,
		dimensions,
		sizeScale,
		sizeValue,
		colorValue,
		colorScale,
	} = props;
	const { width, height } = dimensions;
	const svgElement = useSvg();
	const pieChartRef = useRef();
	useEffect(() => {
		if (!svgElement || !data || !dimensions) return;
		// console.log(sizeScale.range());

		const totalUsage = rollup(
			data,
			(v) => v.length,
			(d) => d.usage
		);
		const radius = 180;
		const pieVal = pie().value((d) => d);
		const path = arc()
			.outerRadius(Math.min(width, height) / 2 - 1)
			.innerRadius(0)
			.startAngle((d) => d)
			.endAngle((d) => d);

		const fakeData = { a: 9, b: 20, c: 30, d: 8, e: 12 };

		// const arc = arc()
		// 	.innerRadius(0)
		// 	.outerRadius(Math.min(width, height) / 2 - 1);
		const svg = select(svgElement);

		const selection = svg.select('.pie-chart');

		selection
			.selectAll('.arc')
			.data(totalUsage)
			.enter()
			.append('path')
			.attr('d', pieVal)
			.attr('fill', function (d) {
				return console.log(d);
			})
			.attr('stroke', 'white')
			.style('stroke-width', '2px')
			.style('opacity', 0.7);

		selection.append('path').attr('d', path).attr('fill', 'red');
		// .attr('stroke', 'white')
		// .selectAll('path')
		// .data(arcs)
		// .join('path')
		// .attr('fill', (d) => colorScale(d.usage))
		// .attr('d', arcc)
		// .append('title');

		// selection.append('text').text('hi');
	}, [svgElement, data, pieChartRef]);
	return (
		<>
			<g transform={`translate(${width - 4}, ${height - 500})`}>
				<g ref={pieChartRef} className='pie-chart'></g>
			</g>
		</>
	);
};

export default Chart;
