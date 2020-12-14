import React, { useRef, useState, useEffect, forwardRef } from 'react';
import styled from 'styled-components';
import { ZoomContainer } from './ZoomContainer';
import { colors, addAlpha } from '../GlobalStyle';

import { geoMercator, geoPath, scaleLinear, max } from 'd3';

const projection = geoMercator().scale(6000).center([5.55, 52.2]);
const path = geoPath(projection);

export const DrawMap = (props) => {
	const { gemeente, province, provinceBorder } = props.nld;
	const { allPenR } = props.penr;

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

	const activateCity = (d) => {};

	// useEffect(() => props.svg(activeProvince), []);
	// useEffect(() => setProvinces(provinceRef.current), []);

	return (
		<ZoomContainer activeProvince={activeProvince} path={path}>
			<g className='nld'>
				<g id='gemeentes'>
					{gemeente.features.map((d) => (
						<path
							key={d.id}
							className='gemeente-grens'
							d={path(d)}
						/>
					))}
				</g>
				<g id='provinces'>
					{province.features.map((d) => (
						<Province
							data={d}
							key={d.id}
							d={path(d)}
							title={d.properties.statnaam}
							isActive={activeProvince === d}
							onClick={() => activateProvince(d)}
						/>
					))}
				</g>

				<path id='province-borders' d={path(provinceBorder)} />
				{allPenR.map((d) => {
					const [x, y] = projection([d.longitude, d.latitude]);
					return (
						<Circle
							key={d.id}
							cx={x}
							cy={y}
							r={1}
							fill={capacityColors(d.capacity)}
							data={d}
							province={d.province}
							activeProvince={activeProvince}
							activeCity={activeCity === d.city}
							onMouseEnter={() => setActiveCity(d.city)}
							onMouseLeave={() => setActiveCity(null)}
						/>
					);
				})}
			</g>
		</ZoomContainer>
	);
};

const Province = ({ d, isActive, onClick }) => {
	return (
		<StyledProvincePath
			className={isActive ? 'province active' : 'province'}
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

const Circle = ({
	cx,
	cy,
	r,
	data,
	activeProvince,
	onMouseEnter,
	activeCity,
	fill,
}) => {
	const { province, city, capacity } = data;

	if (activeProvince && activeProvince.properties.statnaam == province) {
		r = r * 1.5;
	}

	return (
		<StyledCircle
			cx={cx}
			cy={cy}
			r={r}
			onMouseEnter={onMouseEnter}
			active={activeCity}
			fill={fill}
		/>
	);
};

const StyledCircle = styled.circle`
	transition-duration: 700ms;
	/* fill: ${(props) => (props.active ? colors.blue : colors.blue)}; */
	fill-opacity: 1;
	stroke: ${(props) => (props.active ? colors.red : colors.blue)};
	stroke-width: 0.5;
	&:hover {
		fill: ${colors.darkBlue};
	}
`;

export default DrawMap;
