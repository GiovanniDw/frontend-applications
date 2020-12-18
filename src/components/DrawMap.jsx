import React, { useRef, useState, useEffect, forwardRef, useMemo } from 'react';
import styled from 'styled-components';
import { ZoomContainer } from './ZoomContainer';
import { SVGContainer } from './SVGContainer';
import { colors, addAlpha } from '../GlobalStyles';

import { geoMercator, geoPath, scaleLinear, max, scaleSqrt } from 'd3';

const sizeValue = (d) => d.capacity;
const maxRadius = 15;
export const DrawMap = (props) => {
	const {
		nld,
		penr,
		size,
		filteredUsage,
		colorScale,
		colorValue,
		selectedUsage,
		fadeOpacity,
		children,
		activeProvince,
		setActiveProvince,
	} = props;
	const { gemeente, province, provinceBorder } = nld;
	if (!size) return;
	const projection = geoMercator().scale(6000).center([5.4, 52.2]);
	const path = geoPath().projection(projection);
	// const provinceEl = useRef(null);

	// const provinceRef = useRef(null);
	// const [provinces, setProvinces] = useState(null);

	const capacityColors = (d) => {
		scaleLinear().domain([1, 1000]).range(['white', 'black']);
	};

	const sizeScale = useMemo(
		() =>
			scaleSqrt()
				.domain([0, max(penr, sizeValue)])
				.range([0, maxRadius]),
		[nld, penr, sizeValue, maxRadius]
	);

	const [activeCity, setActiveCity] = useState(null);

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

	// useEffect(() => props.svg(activeProvince), []);
	// useEffect(() => setProvinces(provinceRef.current), []);

	useEffect(() => {}, []);

	return (
		<SVGContainer className='map' size={size}>
			<ZoomContainer
				setActiveProvince={setActiveProvince}
				activeProvince={activeProvince}
				path={path}
			>
				<g className='gemeentes'>
					{gemeente.features.map((d) => (
						<path
							key={d.id}
							className='gemeente-grens'
							d={path(d)}
						/>
					))}
				</g>
				<g className='provinces'>
					{province.features.map((d) => (
						<Province
							data={d}
							key={d.id}
							d={path(d)}
							title={d.properties.statnaam}
							active={activeProvince === d}
						/>
					))}
				</g>

				<path className='province-borders' d={path(provinceBorder)} />

				<Marks
					filteredUsage={filteredUsage}
					data={penr}
					projection={projection}
					colorScale={colorScale}
					colorValue={colorValue}
					activeProvince={activeProvince}
					selectedUsage={selectedUsage}
					fadeOpacity={fadeOpacity}
					sizeScale={sizeScale}
					sizeValue={sizeValue}
				/>
				{/* <Marks
				filteredUsage={filteredUsage}
				data={filteredUsage}
				projection={projection}
				colorScale={colorScale}
				colorValue={colorValue}
			/> */}
			</ZoomContainer>
			{children}
		</SVGContainer>
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
	selectedUsage,
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
						return 1.2;
					} else if (activeProvince) {
						return 1;
					} else {
						return sizeScale(sizeValue(d));
					}
				};
				{
					/* console.log(selectedUsage); */
				}
				return (
					<StyledCircle
						key={d.id}
						cx={x}
						cy={y}
						r={reduceSizeOnScale(d)}
						fill={colorScale(colorValue(d))}
						selectedUsage={selectedUsage}
						usage={d.usage}
						opacity={
							selectedUsage && d.usage !== selectedUsage
								? fadeOpacity
								: 0.8
						}
					/>
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
	stroke-width: ${(props) => (props.active ? 1 : 3)};
	&:hover {
		fill: ${colors.darkBlue};
	}
`;

export default DrawMap;
