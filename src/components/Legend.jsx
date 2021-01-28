import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
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
import { size } from 'lodash';
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
	activeUsage,
	allLocations,
}) => {
	const { width, height } = dimensions;
	const svgElement = useSvg();
	const sizeLegendRef = useRef(null);
	const [hoveredUsage, setHoveredUsage] = useState(null);
	const sizeValues = [100, 1000, 2500];
	useEffect(() => {
		if (!sizeLegendRef || !sizeScale || !dimensions || !svgElement) return;

		let circleX = 0;
		const selection = select(sizeLegendRef.current);
		const drawSizeLegend = () => {
			selection
				.selectAll('text')
				.enter()
				.append('text')
				.text('Capaciteit Parkeergarage')
				.attr('transform', `translate(${circleX},80)`)
				.attr('class', 'legend-label');

			selection.selectAll('text').enter().exit().remove();

			const sizelegendG = selection
				.selectAll('g')
				.data(sizeValues)
				.enter()
				.append('g')
				.attr('fill', '#444')
				.attr('transform', `translate(${circleX},130)`)
				.attr('text-anchor', 'end')
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

			sizelegendG.selectAll('g').exit().remove();
		};

		return drawSizeLegend();
	}, [sizeValues, sizeScale, dimensions]);

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
								dispatch({ type: 'RESET_PARKING_USAGE' });
							}}
						>
							<text x={tickTextOffset} dy='.32em'>
								{domainValue}
							</text>
							<circle
								fill={colorScale(domainValue)}
								r={tickSize}
								stroke={colorScale(domainValue)}
								strokeWidth='3'
								fillOpacity={
									activeUsage && domainValue !== activeUsage
										? fadeOpacity
										: 1
								}
							/>
						</g>
					))}
				</g>
				{allLocations.length && (
					<g ref={sizeLegendRef} className='size-legend'>
						<text
							className='legend-label'
							transform='translate(0, 80)'
						>
							Capaciteit Parkeergarage
						</text>
					</g>
				)}
			</g>
		</>
	);
};

export default Legend;
