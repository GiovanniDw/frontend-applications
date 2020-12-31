import React, { useState, useEffect, useRef } from 'react';
import { select, format } from 'd3';
import { useSvg } from './SVGContainer';
export const PieChart = (props) => {
	const { penr, dimensions, sizeScale, sizeValue } = props;
	const { width, height } = dimensions;
	const svgElement = useSvg();
	const pieChartRef = useRef();
	useEffect(() => {
		if (!svgElement || !penr) return;
		console.log(sizeScale.range());
		const svg = select(svgElement);
		let circleX = 0;
		const selection = svg.select('.pie-chart');

		const legendG = selection
			.append('g')
			.attr('fill', '#444')
			.attr('transform', `translate(${circleX - 40},185)`)
			.attr('text-anchor', 'right')
			.selectAll('g')
			.data(sizeScale.ticks(3).filter((d) => d))
			.join('g');
		legendG
			.append('circle')
			.attr('fill', 'none')
			.attr('stroke', '#444')
			.attr('cy', (d) => -sizeScale(d))
			.attr('r', sizeScale);
		legendG
			.append('text')
			.attr('y', (d) => -10 - 2 * sizeScale(d))
			.attr('x', 45)
			.attr('dy', '1.3em')
			.text(format('.0f'))
			.attr('class', 'legend-text');

		selection.append('text').text('hi');
	}, [svgElement]);
	return (
		<>
			<g transform={`translate(${width / 4}, ${height / 4})`}>
				<g ref={pieChartRef} className='pie-chart'></g>
			</g>
		</>
	);
};

export default PieChart;
