import React, { useRef, useState, useEffect, forwardRef, useMemo } from 'react';
import styled from 'styled-components';
import { ZoomContainer } from '../ZoomContainer';
import { SVGContainer } from '../SVGContainer';
import { colors, addAlpha } from '../../GlobalStyles';
import { useDimensions, useBbox } from '../../helpers/useResizeObservers';
import Legend from '../Legend';
import { Map } from './Map';
import {
	geoMercator,
	geoPath,
	scaleLinear,
	max,
	min,
	scaleSqrt,
	geoCentroid,
	geoBounds,
	geoDistance,
} from 'd3';
import PieChart from '../PieChart';
import Chart from '../Chart';

export const DrawViz = (props) => {
	const {
		nld,
		data,
		filteredUsage,
		filteredData,
		colorScale,
		colorValue,
		sizeValue,
		hoveredUsage,
		fadeOpacity,
		children,
		activeProvince,
		setActiveProvince,
		setHoveredUsage,
	} = props;
	const { gemeente, gemeenteBorder, province, provinceBorder } = nld;
	const { allData } = data;
	const [activeCity, setActiveCity] = useState(null);
	const [maxRadius, setMaxradius] = useState(10);
	const containerRef = useRef();
	const dimensions = useDimensions(containerRef);

	const sizeScale = useMemo(
		() =>
			scaleSqrt()
				.domain([0, max(allData, sizeValue)])
				.range([0, maxRadius]),
		[nld, data, sizeValue, maxRadius]
	);

	const LegendLabel = 'Soort Parkeermogelijkheid';

	const activateProvince = (d) => {
		if (activeProvince === null || activeProvince !== d) {
			setActiveProvince(d);
			setMaxradius(5);
			return;
		} else if (activeProvince === d) {
			setActiveProvince(null);
			setMaxradius(10);
			console.log(filteredData);
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
					nld={nld}
					data={filteredData}
					colorScale={colorScale}
					colorValue={colorValue}
					activeProvince={activeProvince}
					activateProvince={activateProvince}
					hoveredUsage={hoveredUsage}
					filteredUsage={filteredUsage}
					fadeOpacity={fadeOpacity}
					sizeScale={sizeScale}
					sizeValue={sizeValue}
					dimensions={dimensions}
					setActiveProvince={setActiveProvince}
				/>

				<Legend
					className='legend'
					data={allData}
					onHover={setHoveredUsage}
					hoveredUsage={hoveredUsage}
					colorScale={colorScale}
					colorValue={colorValue}
					tickSpacing={22}
					tickSize={8}
					tickTextOffset={-18}
					fadeOpacity={0.2}
					LegendLabel={LegendLabel}
					dimensions={dimensions}
					sizeScale={sizeScale}
				/>

				<Chart
					data={filteredData}
					onHover={setHoveredUsage}
					hoveredUsage={hoveredUsage}
					filteredUsage={filteredUsage}
					colorScale={colorScale}
					colorValue={colorValue}
					sizeValue={sizeValue}
					fadeOpacity={0.2}
					setActiveProvince={setActiveProvince}
					activeProvince={activeProvince}
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
