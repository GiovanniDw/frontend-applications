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
		// console.log(sizeScale.range());
		const svg = select(svgElement);
		let circleX = 0;
		// old size value sizeScale.ticks(3).filter((d) => d)

		const sizeValues = [100, 1000, 2400];
		const selection = select(sizeLegendRef.current);

		selection
			.append('text')
			.text('Capaciteit Parkeergarage')
			.attr('transform', `translate(${circleX},80)`)
			.attr('class', 'legend-label');

		const sizelegendG = selection
			.append('g')
			.attr('fill', '#444')
			.attr('transform', `translate(${circleX},120)`)
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
			.attr('y', (d) => -10 - 2 * sizeScale(d))
			.attr('x', tickTextOffset)
			.attr('dy', '1.3em')
			.text(format('.0f'))
			.attr('class', 'legend-text');

		// selection.append('text').text('hi');
	}, [svgElement, sizeLegendRef]);

	return (
		<>
			{/* <div>
				{colorScale.domain().map((domainValue, i) => (
					<label key={i}>
						<Checkbox value={domainValue} checked />
						<span>{domainValue}</span>
					</label>
				))}
			</div> */}
			{/* <div> */}
			{/* <svg className={className}> */}
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
								// console.log(domainValue);
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

			{/* </svg> */}
			{/* </div> */}
		</>
	);
};

export default Legend;
