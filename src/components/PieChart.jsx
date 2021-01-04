import React, { useEffect, useRef } from 'react';
import { select, format } from 'd3';
import { useSvg } from './SVGContainer';
export const PieChart = (props) => {
	const { data, dimensions, sizeScale, sizeValue } = props;
	const { width, height } = dimensions;
	const svgElement = useSvg();
	const pieChartRef = useRef();
	useEffect(() => {
		if (!svgElement || !data) return;
		// console.log(sizeScale.range());
		const svg = select(svgElement);
		let circleX = 0;
		const selection = svg.select('.pie-chart');

		selection
			.append('text')
			.text('Capaciteit Parkeergarage')
			.attr('transform', `translate(${circleX},135)`)
			.attr('font-weight', 'bold')
			.attr('class', 'legend-text');

		const legendG = selection
			.append('g')
			.attr('fill', '#444')
			.attr('transform', `translate(${circleX - 40},185)`)
			.attr('text-anchor', 'right')
			.selectAll('g')
			.data(sizeScale.ticks(2).filter((d) => d))
			.join('g');
		legendG
			.append('circle')
			.attr('fill', 'none')
			.attr('stroke', '#444')
			.attr('cy', (d) => -sizeScale(d))
			.attr('r', sizeScale);
		legendG
			.append('text')
			.attr('y', (d) => -20 - 1 * sizeScale(d))
			.attr('x', 20)
			.attr('dy', '1.3em')
			.text(format('.0f'))
			.attr('class', 'legend-text');

		// selection.append('text').text('hi');
	}, [svgElement, data, pieChartRef]);
	return (
		<>
			<g transform={`translate(${width / 4}, ${height / 4})`}>
				{/* <g ref={pieChartRef} className='pie-chart'></g> */}
			</g>
		</>
	);
};

export default PieChart;
