import React, { useState, useEffect, useRef } from 'react';
import { select, pie, arc, rollups, interpolate } from 'd3';
import { animated, useSpring } from 'react-spring';
import { useSvg } from './SVGContainer';

import { useDimensions } from '../helpers/useResizeObservers';

const animationDuration = 250;
const animationConfig = {
	to: async (next, cancel) => {
		await next({ t: 1 });
	},
	from: { t: 0 },
	config: { duration: animationDuration },
	reset: true,
};

export const Chart = (props) => {
	const {
		data,
		dimensions,
		colorScale,
		onHover,
		nestedActiveLocations,
		activeProvince,
		dispatch,
		activeUsage,
	} = props;
	const { width, height } = dimensions;

	const svgElement = useSvg();
	const [hoveredUsage, setHoveredUsage] = useState(1);
	const pieChartRef = useRef(null);

	const pieSize = useDimensions(pieChartRef);
	const cache = useRef(nestedActiveLocations);

	const onMouseEnter = (d) => {
		console.log(this);
		const usage = d.target.__data__.data[0];
		// select().attr('opacity', 0.5);
		dispatch({ type: 'FILTER_PARKING_USAGE', payload: { usage } });

		setHoveredUsage(d);
	};
	const onMouseLeave = () => {
		dispatch({ type: 'FILTER_PARKING_USAGE', payload: {} });
	};

	useEffect(() => {
		if (!dimensions || !pieChartRef || !pieSize) return;

		// const dataByUsage = rollups(
		// 	data,
		// 	(v) => v.length,
		// 	(d) => d.usage
		// );
		// cache.current = dataByUsage;

		const drawChart = (dataByUsage, activeUsage) => {
			const outerRadius = Math.min(width, height) / 10 - 1;

			const createPie = pie()
				.padAngle(0)
				.value((d) => d[1])
				.sort(null);
			const arcGenerator = arc().innerRadius(20).outerRadius(outerRadius);

			const pieData = createPie(dataByUsage);
			const prevPieData = createPie(cache.current);

			const selection = select(pieChartRef.current);
			const selectionWithData = selection
				.selectAll('g.arc')
				.data(pieData);
			selectionWithData.exit().remove();

			const selectionWidthUpdate = selectionWithData
				.enter()
				.append('g')
				.attr('class', 'arc')
				.on('mouseenter', onMouseEnter)
				.on('mouseleave', onMouseLeave)
				.attr('opacity', hoveredUsage);

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
				.attr('value', (i) => i.data[0])
				.style('fill', (i) => colorScale(i.data[0]))
				.attr('classed', (i) =>
					activeUsage == i.data[0] ? 'true' : 'false'
				)
				.style('stroke', '#ffffff')
				.style('stroke-width', 2);
		};
		drawChart(nestedActiveLocations, activeUsage);
		cache.current = nestedActiveLocations;
		return;
	}, [svgElement, nestedActiveLocations, dimensions]);

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
