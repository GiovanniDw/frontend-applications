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
		filteredUsage,
		filteredData,
		colorValue,
		sizeValue,
		hoveredUsage,
		fadeOpacity,
		children,
		activeProvinceFeature,
		setActiveProvinceFeature,
		setHoveredUsage,
		colorRange,
	} = props;
	const { gemeente, gemeenteBorder, province, provinceBorder } = nld;
	// const { allData } = data;
	const [activeCity, setActiveCity] = useState(null);
	const [maxRadius, setMaxradius] = useState(10);
	const containerRef = useRef();
	const dimensions = useDimensions(containerRef);

	const [resizeListener, sizes] = useResizeAware();

	const colorScale = useMemo(
		() => scaleOrdinal().domain(data.map(colorValue)).range(colorRange),
		[data, colorValue, colorRange]
	);

	const sizeScale = useMemo(
		() =>
			scaleSqrt()
				.domain([0, max(data, sizeValue)])
				.range([0, maxRadius]),
		[data, sizeValue, maxRadius]
	);

	const activateProvince = (d) => {
		const province = d.properties.statnaam;
		if (activeProvinceFeature === null && activeProvinceFeature !== d) {
			setActiveProvinceFeature(d);
			// setMaxradius(5);
			return;
		} else if (activeProvinceFeature === d) {
			setActiveProvinceFeature(null);
			// setMaxradius(10);
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
		console.log(dimensions);
		if (!sizes) return;
	}, [sizes]);

	return (
		<div className='viz-wrapper' ref={containerRef}>
			{resizeListener}
			<SVGContainer className='map' size={dimensions}>
				<Map
					{...props}
					nld={nld}
					data={data}
					colorScale={colorScale}
					colorValue={colorValue}
					activeProvinceFeature={activeProvinceFeature}
					activateProvince={activateProvince}
					hoveredUsage={hoveredUsage}
					filteredUsage={filteredUsage}
					fadeOpacity={fadeOpacity}
					sizeScale={sizeScale}
					sizeValue={sizeValue}
					dimensions={dimensions}
					setActiveProvinceFeature={setActiveProvinceFeature}
				/>

				<Legend
					className='legend'
					data={data}
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
					data={props.activeLocations}
					onHover={setHoveredUsage}
					hoveredUsage={hoveredUsage}
					filteredUsage={filteredUsage}
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
