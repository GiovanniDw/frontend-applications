import React from 'react';

const Legend = ({
	colorScale,
	tickSpacing = 20,
	tickSize = 10,
	tickTextOffset = 20,
	selectUsage,
	selectedUsage,
	fadeOpacity,
	LegendLabel,
}) => {
	return (
		<g transform={`translate(${50 + 60}, 60)`}>
			<text x={35} y={-25} className='axis-label' textAnchor='middle'>
				{LegendLabel}
			</text>
			{colorScale.domain().map((domainValue, i) => (
				<g
					key={i}
					className='tick'
					transform={`translate(10,${i * tickSpacing})`}
					onMouseEnter={() => {
						console.log(domainValue);
						selectUsage(domainValue);
					}}
					onMouseOut={() => {
						selectUsage(null);
					}}
					opacity={
						selectedUsage && domainValue !== selectedUsage
							? fadeOpacity
							: 1
					}
				>
					<circle fill={colorScale(domainValue)} r={tickSize} />
					<text x={tickTextOffset} dy='.32em'>
						{domainValue}
					</text>
				</g>
			))}
		</g>
	);
};

export default Legend;
