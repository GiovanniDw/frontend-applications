import React, { useEffect, useRef } from 'react';
import { select, format } from 'd3';
import { StyledCircle } from './StyledComponents';
export const Checkbox = (props) => <input type='checkbox' {...props} />;
import { useSvg } from './SVGContainer';
export const Legend = ({
	colorScale,
	tickSpacing = 25,
	tickSize = 8,
	tickTextOffset = -25,
	onHover,
	hoveredUsage,
	fadeOpacity,
	LegendLabel,
	className,
	dimensions,
	sizeScale,
}) => {
	const { width, height } = dimensions;
	const svgElement = useSvg();
	const sizeLegendRef = useRef();

	useEffect(() => {
		if (!svgElement) return;

		const svg = select(svgElement);
		let circleX = 0;

		const sizeValues = [100, 1000, 2500];
		const selection = select(sizeLegendRef.current);

		selection
			.append('text')
			.text('Capaciteit Parkeergarage')
			.attr('transform', `translate(${circleX},80)`)
			.attr('class', 'legend-label');

		const sizelegendG = selection
			.append('g')
			.attr('fill', '#444')
			.attr('transform', `translate(${circleX},140)`)
			.attr('text-anchor', 'end')
			.selectAll('g')
			.data(sizeValues)
			.join('g');
		sizelegendG
			.append('circle')
			.attr('fill', 'none')
			.attr('stroke', '#444')
			.attr('cy', (d) => -sizeScale(d))
			.attr('r', sizeScale);
		sizelegendG
			.append('text')
			.attr('y', (d) => -10 - 3 * sizeScale(d))
			.attr('x', tickTextOffset)
			.attr('dy', '1.3em')
			.text(format('.0f'))
			.attr('class', 'legend-text');
	}, [svgElement, sizeLegendRef]);

	return (
		<>
			<g transform={`translate(${width - 20}, ${100})`} textAnchor='end'>
				<g className='color-legend'>
					<text x={0} y={-25} className='legend-label'>
						{LegendLabel}
					</text>
					{colorScale.domain().map((domainValue, i) => (
						<g
							key={i}
							className='tick'
							transform={`translate(0,${i * tickSpacing})`}
							onMouseEnter={() => {
								onHover(domainValue);
							}}
							onMouseOut={() => {
								onHover(null);
							}}
						>
							<text x={tickTextOffset} dy='.32em'>
								{domainValue}
							</text>
							<StyledCircle
								fill={colorScale(domainValue)}
								r={tickSize}
								opacity={
									hoveredUsage && domainValue !== hoveredUsage
										? fadeOpacity
										: 1
								}
							/>
						</g>
					))}
				</g>
				<g ref={sizeLegendRef} className='size-legend'></g>
			</g>
		</>
	);
};

export default Legend;
