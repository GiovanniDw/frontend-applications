import React, { useEffect, useRef, useState } from 'react';
import { select, format } from 'd3';
import { StyledCircle } from './StyledComponents';
export const Checkbox = (props) => <input type='checkbox' {...props} />;
import {
	useSpring,
	useTransition,
	animated,
	useTrail,
	useSprings,
} from 'react-spring';
import { useSvg } from './SVGContainer';
export const Legend = ({
	colorScale,
	tickSpacing = 25,
	tickSize = 8,
	tickTextOffset = -25,
	onHover,
	fadeOpacity,
	LegendLabel,
	className,
	dimensions,
	sizeScale,
	dispatch,
}) => {
	const { width, height } = dimensions;
	const svgElement = useSvg();
	const sizeLegendRef = useRef();
	const [hoveredUsage, setHoveredUsage] = useState(null);
	useEffect(() => {
		if (!svgElement || !sizeScale) return;

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
	}, [svgElement, sizeLegendRef, sizeScale]);

	return (
		<>
			<g transform={`translate(${width - 20}, ${100})`} textAnchor='end'>
				<g className='color-legend'>
					<text x={0} y={-25} className='legend-label'>
						Soort Parkeermogelijkheid
					</text>
					{colorScale.domain().map((domainValue, i) => (
						<g
							key={i}
							className='tick'
							transform={`translate(0,${i * tickSpacing})`}
							onMouseEnter={() => {
								const usage = domainValue;
								setHoveredUsage(domainValue);

								dispatch({
									type: 'FILTER_PARKING_USAGE',
									payload: { usage },
								});
							}}
							onMouseOut={() => {
								setHoveredUsage(null);
								dispatch({ type: 'RESET' });
							}}
						>
							<text x={tickTextOffset} dy='.32em'>
								{domainValue}
							</text>
							<circle
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
				{sizeScale && (
					<g ref={sizeLegendRef} className='size-legend'></g>
				)}
			</g>
		</>
	);
};

export default Legend;
