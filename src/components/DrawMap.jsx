import React, { useRef, useState, useEffect, forwardRef } from 'react';
import styled from 'styled-components';
import { ZoomContainer } from './ZoomContainer';
import { colors, addAlpha } from '../GlobalStyle';

import { geoMercator, geoPath, scaleLinear, max } from 'd3';

export const DrawMap = (props) => {
	const { nld, penr, size, filteredUsage, colorScale, colorValue } = props;
	const { gemeente, province, provinceBorder } = nld;

	const projection = geoMercator().scale(6000).center([5.6, 52.2]);
	const path = geoPath().projection(projection);
	// const provinceEl = useRef(null);

	// const provinceRef = useRef(null);
	// const [provinces, setProvinces] = useState(null);
	const maxCap = (d) => max(d);

	const capacityColors = (d) => {
		scaleLinear().domain([1, 1000]).range(['white', 'black']);
	};
	const [activeProvince, setActiveProvince] = useState(null);
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
			console.log(d);
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
		<ZoomContainer
			setActiveProvince={setActiveProvince}
			activeProvince={activeProvince}
			path={path}
			size={size}
		>
			<g className='gemeentes'>
				{gemeente.features.map((d) => (
					<path key={d.id} className='gemeente-grens' d={path(d)} />
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
						onClick={() => activateProvince(d)}
					/>
				))}
			</g>

			<path className='province-borders' d={path(provinceBorder)} />
			{penr.map((d) => {
				const [x, y] = projection([d.longitude, d.latitude]);
				return (
					<Circle
						key={d.id}
						cx={x}
						cy={y}
						r={1}
						fill={colorScale(colorValue(d))}
						data={d}
						activeProvince={activeProvince}
						active={activeCity === d.city}
						onClick={() => activateCity(d)}
					/>
				);
			})}
		</ZoomContainer>
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

const Circle = ({ cx, cy, r, data, activeProvince, onClick, active, fill }) => {
	const { province, city, capacity } = data;

	if (activeProvince && activeProvince.properties.statnaam == province) {
		r = r / 1;
	}

	return (
		<StyledCircle
			cx={cx}
			cy={cy}
			r={r}
			onClick={onClick}
			active={active}
			fill={fill}
		/>
	);
};

const StyledCircle = styled.circle`
	transition-duration: 700ms;
	/* fill: ${(props) => (props.active ? colors.blue : colors.blue)}; */
	fill-opacity: 0.7;
	/* stroke: ${(props) => (props.active ? colors.red : colors.blue)}; */
	/* stroke-width: 0.5; */
	&:hover {
		fill: ${colors.darkBlue};
	}
`;

export default DrawMap;
