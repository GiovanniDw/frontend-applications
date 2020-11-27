import React, { useState } from 'react';
import styled from 'styled-components';
import { ZoomContainer } from './ZoomContainer';
import { colors } from '../GlobalStyle';

import { geoMercator, geoPath } from 'd3';

const projection = geoMercator().scale(6000).center([5.55, 52.2]);
const path = geoPath(projection);

export const DrawMap = (props) => {
	const { gemeente, province, provinceBorder } = props.nld;
	const { allPenR } = props.penr;

	const provinces = province.features;

	// const provinceEl = useRef(null);

	const [activeProvince, setActiveProvince] = useState(null);
	const [activeCity, setActiveCity] = useState(null);
	// useEffect(() => props.svg(activeProvince), []);

	return (
		<ZoomContainer activeProvince={activeProvince}>
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
					{provinces.map((d) => (
						<Province
							data={d}
							key={d.id}
							d={path(d)}
							title={d.properties.statnaam}
							isActive={activeProvince === d}
							onClick={() => setActiveProvince(d)}
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
							data={d}
							province={d.province}
							activeProvince={activeProvince}
							activeCity={activeCity === d.city}
							onMouseEnter={() => setActiveCity(d.city)}
							onMouseLeave={() => setActiveCity(false)}
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
	transition-duration: 700ms;
`;

const Circle = ({ cx, cy, r, data, activeProvince }) => {
	const { province, city, capacity } = data;

	if (activeProvince && activeProvince.properties.statnaam == province) {
		r = r * 2;
	}

	return <StyledCircle cx={cx} cy={cy} r={r} />;
};

const StyledCircle = styled.circle`
	transition-duration: 700ms;
	fill: ${colors.blue};
	fill-opacity: 1;

	&:hover {
		fill: ${colors.darkBlue};
	}

	${({ active }) =>
		active &&
		`
    fill: red;
  `}
`;

export default DrawMap;
