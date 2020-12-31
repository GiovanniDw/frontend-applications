import React, { useRef, useState, useEffect, forwardRef, useMemo } from 'react';
import styled from 'styled-components';
import useDimensions from 'react-cool-dimensions';
import { ZoomContainer } from '../ZoomContainer';
import { SVGContainer } from '../SVGContainer';
import { colors, addAlpha } from '../../GlobalStyles';
import { useRect, useBbox } from '../../helpers/useResizeObservers';
import Legend from '../Legend';
import {
	geoMercator,
	geoPath,
	scaleLinear,
	max,
	scaleSqrt,
	geoCentroid,
} from 'd3';
import PieChart from '../PieChart';

const maxRadius = 10;
export const DrawViz = (props) => {
	const {
		nld,
		penr,
		size,
		setSize,
		filteredUsage,
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
	const [activeCity, setActiveCity] = useState(null);
	const containerRef = useRef();
	const dimensions = useRect(containerRef);
	const { width, height } = dimensions;

	const center = geoCentroid(provinceBorder);
	const projection = geoMercator()
		.translate([width / 2, height / 2])
		.scale(6000)
		.center(center);
	const path = geoPath().projection(projection);
	const LegendLabel = 'Gebruik';

	const sizeScale = useMemo(
		() =>
			scaleSqrt()
				.domain([0, max(penr, sizeValue)])
				.range([0, maxRadius]),
		[nld, penr, sizeValue, maxRadius]
	);

	const activateProvince = (d) => {
		if (activeProvince === null || activeProvince !== d)
			return setActiveProvince(d);
		if (activeProvince === d) {
			return setActiveProvince(null);
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
				<ZoomContainer
					setActiveProvince={setActiveProvince}
					activeProvince={activeProvince}
					path={path}
					size={dimensions}
				>
					{useMemo(
						() => (
							<>
								{/* <g className='gemeentes'>
					{gemeente.features.map((d) => (
						<path
							key={d.id}
							className='gemeente-grens'
							d={path(d)}
						/>
					))}
				</g> */}
								<path
									className='gemeente-borders'
									d={path(gemeenteBorder)}
								/>
								<g className='provinces'>
									{province.features.map((d) => (
										<Province
											data={d}
											key={d.id}
											d={path(d)}
											title={d.properties.statnaam}
											active={activeProvince === d}
											onClick={() => activateProvince(d)}
										/>
									))}
								</g>

								<path
									className='province-borders'
									d={path(provinceBorder)}
								/>
							</>
						),
						[path, province, provinceBorder, gemeenteBorder]
					)}
					<Marks
						filteredUsage={filteredUsage}
						data={penr}
						projection={projection}
						colorScale={colorScale}
						colorValue={colorValue}
						activeProvince={activeProvince}
						hoveredUsage={hoveredUsage}
						fadeOpacity={fadeOpacity}
						sizeScale={sizeScale}
						sizeValue={sizeValue}
					/>
					<Marks
						filteredUsage={filteredUsage}
						data={filteredUsage}
						projection={projection}
						colorScale={colorScale}
						colorValue={colorValue}
						sizeValue={sizeValue}
						sizeScale={sizeScale}
					/>
				</ZoomContainer>
				<Legend
					className='legend'
					penr={penr}
					onHover={setHoveredUsage}
					hoveredUsage={hoveredUsage}
					colorScale={colorScale}
					colorValue={colorValue}
					tickSpacing={22}
					tickSize={10}
					tickTextOffset={12}
					fadeOpacity={0.2}
					LegendLabel={LegendLabel}
					dimensions={dimensions}
				/>
				<PieChart
					penr={penr}
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

const Province = ({ d, active, onClick }) => {
	return (
		<StyledProvincePath
			className={active ? 'province active' : 'province'}
			d={d}
			onClick={onClick}
			title={d.properties}
		/>
	);
};

const StyledProvincePath = styled.path`
	/* transition-duration: 700ms; */

	:hover {
		opacity: 0.7;
	}
`;

const Marks = ({
	data,
	projection,
	colorScale,
	colorValue,
	filteredUsage,
	activeProvince,
	hoveredUsage,
	fadeOpacity,
	sizeScale,
	sizeValue,
}) => {
	return (
		<g className='parking-locations'>
			{data.map((d) => {
				const [x, y] = projection([d.longitude, d.latitude]);

				const reduceSizeOnScale = (d) => {
					if (
						activeProvince &&
						activeProvince.properties.statnaam === d.province
					) {
						return 1;
					} else if (activeProvince) {
						return 1;
					} else {
						return sizeScale(sizeValue(d));
					}
				};
				{
					/* console.log(hoveredUsage); */
				}
				return (
					<StyledCircle
						key={d.id}
						cx={x}
						cy={y}
						r={reduceSizeOnScale(d)}
						fill={colorScale(colorValue(d))}
						hoveredUsage={hoveredUsage}
						usage={d.usage}
						opacity={
							hoveredUsage && d.usage !== hoveredUsage
								? fadeOpacity
								: 0.8
						}
					>
						<title> {d.name}</title>
					</StyledCircle>
				);
			})}
		</g>
	);
};

const StyledCircle = styled.circle`
	transition-duration: 300ms;
	/* fill: ${(props) => (props.active ? colors.blue : colors.blue)}; */
	fill-opacity: 1;
	/* stroke: ${(props) => (props.active ? colors.red : colors.blue)}; */
	/* stroke-width: 0.5; */
	/* stroke-width: ${(props) => (props.active ? 1 : 3)}; */
	&:hover {
		stroke: ${colors.white};
	}
`;

export default DrawViz;
