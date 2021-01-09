import React, { useRef, useState, useEffect, useMemo } from 'react';

import { SVGContainer } from '../SVGContainer';

import { useDimensions, useBbox } from '../../helpers/useResizeObservers';
import Legend from '../Legend';
import { Map } from './Map';
import { max, scaleSqrt } from 'd3';

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
				.domain([0, max(data, sizeValue)])
				.range([0, maxRadius]),
		[data, sizeValue, maxRadius]
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
					data={data}
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
					data={data}
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
