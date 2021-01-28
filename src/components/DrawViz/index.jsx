import React, { useRef, useState, useEffect, useMemo } from 'react';

import { SVGContainer } from '../SVGContainer';

import { useDimensions, useBbox } from '../../helpers/useResizeObservers';
import useMeasure from '../../hooks/useMeasure';
import Legend from '../Legend';
import { Map } from '../Map';
import { max, scaleSqrt, scaleOrdinal, scaleLinear } from 'd3';

import Chart from '../Chart';

export const DrawViz = (props) => {
	const {
		nld,
		data,
		filteredData,
		hoveredUsage,
		fadeOpacity,
		children,
		setHoveredUsage,
		colorRange,
		allLocations,
		dispatch,
	} = props;
	const { gemeente, gemeenteBorder, province, provinceBorder } = nld;
	// const { allData } = data;
	const [activeCity, setActiveCity] = useState(null);
	const [maxRadius, setMaxradius] = useState(10);
	const containerRef = useRef();
	const dimensions = useDimensions(containerRef);
	const [activeProvinceFeature, setActiveProvinceFeature] = useState(null);

	const sizeValue = (d) => d.capacity;
	const colorValue = (d) => d.usage;

	const colorScale = scaleOrdinal()
		.domain(allLocations.map(colorValue))
		.range(colorRange);

	const sizeScale = useMemo(
		() =>
			scaleSqrt()
				.domain([0, max(allLocations, sizeValue)])
				.range([0, maxRadius]),
		[allLocations, sizeValue, maxRadius]
	);

	const activateProvince = (d) => {
		const province = d.properties.statnaam;
		if (activeProvinceFeature === null || activeProvinceFeature !== d) {
			setActiveProvinceFeature(d);
			// setMaxradius(5);
			props.dispatch({
				type: 'FILTER_ACTIVE_PROVINCE',
				payload: { province },
			});
		} else if (activeProvinceFeature === d) {
			setActiveProvinceFeature(null);
			// setMaxradius(10);
			props.dispatch({ type: 'RESET' });
		}
	};

	const activateCity = (d) => {
		if (activeCity === null || activeCity !== d.city) {
			return setActiveCity(d.city);
		}
		if (activeCity === d.city) {
			return setActiveCity(null);
		}
	};

	useEffect(() => {
		if (!dimensions) return;
	}, [dimensions]);

	return (
		<div className='viz-wrapper' ref={containerRef}>
			<SVGContainer className='map' size={dimensions}>
				<Map
					{...props}
					nld={nld}
					colorScale={colorScale}
					colorValue={colorValue}
					activeProvinceFeature={activeProvinceFeature}
					activateProvince={activateProvince}
					fadeOpacity={0.2}
					sizeScale={sizeScale}
					sizeValue={sizeValue}
					dimensions={dimensions}
					setActiveProvinceFeature={setActiveProvinceFeature}
				/>
				{sizeScale && (
					<Legend
						{...props}
						className='legend'
						colorScale={colorScale}
						colorValue={colorValue}
						tickSpacing={22}
						tickSize={8}
						tickTextOffset={-18}
						fadeOpacity={0.2}
						dimensions={dimensions}
						sizeScale={sizeScale}
					/>
				)}

				<Chart
					{...props}
					colorScale={colorScale}
					colorValue={colorValue}
					sizeValue={sizeValue}
					fadeOpacity={0.2}
					setActiveProvinceFeature={setActiveProvinceFeature}
					activeProvinceFeature={activeProvinceFeature}
					setHoveredUsage={setHoveredUsage}
					dimensions={dimensions}
					sizeScale={sizeScale}
				/>
			</SVGContainer>
			{children}
		</div>
	);
};

export default DrawViz;
