import React, { useRef, useState, useEffect, useMemo } from 'react';
import useResizeAware from 'react-resize-aware';
import { SVGContainer } from '../SVGContainer';

import { useDimensions, useBbox } from '../../helpers/useResizeObservers';
import Legend from '../Legend';
import { Map } from './Map';
import { max, scaleSqrt, scaleOrdinal } from 'd3';

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
	const [resizeListener, sizes] = useResizeAware();
	const sizeValue = (d) => d.capacity;
	const colorValue = (d) => d.usage;
	const colorScale = useMemo(
		() =>
			scaleOrdinal()
				.domain(allLocations.map(colorValue))
				.range(colorRange),
		[allLocations, colorValue, colorRange]
	);

	const sizeScale = useMemo(
		() =>
			scaleSqrt()
				.domain([0, max(allLocations, sizeValue)])
				.range([0, maxRadius]),
		[allLocations, sizeValue, maxRadius]
	);

	const activateProvince = (d) => {
		const province = d.properties.statnaam;
		if (activeProvinceFeature === null && activeProvinceFeature !== d) {
			setActiveProvinceFeature(d);
			// setMaxradius(5);
			props.dispatch({
				type: 'FILTER_ACTIVE_PROVINCE',
				payload: { province },
			});

			return;
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
		if (!sizes) return;
	}, [sizes]);

	return (
		<div className='viz-wrapper' ref={containerRef}>
			{resizeListener}
			<SVGContainer className='map' size={dimensions}>
				<Map
					{...props}
					nld={nld}
					colorScale={colorScale}
					colorValue={colorValue}
					activeProvinceFeature={activeProvinceFeature}
					activateProvince={activateProvince}
					hoveredUsage={hoveredUsage}
					fadeOpacity={0.2}
					sizeScale={sizeScale}
					sizeValue={sizeValue}
					dimensions={dimensions}
					setActiveProvinceFeature={setActiveProvinceFeature}
				/>

				<Legend
					{...props}
					className='legend'
					onHover={setHoveredUsage}
					hoveredUsage={hoveredUsage}
					colorScale={colorScale}
					colorValue={colorValue}
					tickSpacing={22}
					tickSize={8}
					tickTextOffset={-18}
					fadeOpacity={0.2}
					dimensions={dimensions}
					sizeScale={sizeScale}
				/>

				<Chart
					{...props}
					data={props.activeLocations}
					onHover={setHoveredUsage}
					hoveredUsage={hoveredUsage}
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
