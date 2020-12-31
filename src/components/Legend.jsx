import React from 'react';
import { StyledCircle } from './StyledComponents';
export const Checkbox = (props) => <input type='checkbox' {...props} />;
export const Legend = ({
	colorScale,
	tickSpacing = 25,
	tickSize = 6,
	tickTextOffset = 25,
	onHover,
	hoveredUsage,
	fadeOpacity,
	LegendLabel,
	className,
	dimensions,
}) => {
	const { width, height } = dimensions;
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
			<g transform={`translate(${30}, ${height - 80})`}>
				<text x={15} y={-25} className='axis-label' textAnchor='middle'>
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
						<StyledCircle
							fill={colorScale(domainValue)}
							r={tickSize}
							opacity={
								hoveredUsage && domainValue !== hoveredUsage
									? fadeOpacity
									: 1
							}
						/>
						<text x={tickTextOffset} dy='.32em'>
							{domainValue}
						</text>
					</g>
				))}
			</g>

			{/* </svg> */}
			{/* </div> */}
		</>
	);
};

export default Legend;
