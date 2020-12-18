import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { ZoomContainer } from './ZoomContainer';
import { colors, addAlpha } from '../GlobalStyles';
import { useSvg } from './SVGContainer';
import { geoMercator, geoPath, scaleLinear, max, min, select } from 'd3';

export const DrawNL = (props) => {
	const gemeentesRef = useRef(null);
	const provincesRef = useRef(null);
	const parkingRef = useRef(null);
	const { size, nld, penr } = props;
	const { gemeente, province, provinceBorder } = nld;
	const { allPenR } = penr;

	// const provinces = province.features;

	const svgElement = useSvg();

	const capacityColors = scaleLinear()
		.domain([1, 1000])
		.range(['white', 'black']);
	const [activeProvince, setActiveProvince] = useState(null);
	const [activeCity, setActiveCity] = useState(null);
	const [provincesEl, setProvincesEl] = useState(null);
	// useEffect(() => props.svg(activeProvince), []);
	const activateProvince = (event, d) => {
		if (activeProvince === null || activeProvince !== d) {
			return setActiveProvince(d);
		}
		if (activeProvince === d) {
			return setActiveProvince(null);
		}
	};
	const projection = geoMercator().scale(6000).center([5.55, 52.2]);
	const path = geoPath().projection(projection);
	useEffect(() => {
		if (!svgElement) return;

		const svg = select(svgElement);

		const gemeentes = svg.select('.gemeentes').selectAll('path');
		const provinces = svg.select('.provinces').selectAll('path');
		const parking = svg.select('.parking-locations').selectAll('circle');

		setProvincesEl(provinces);

		// const minCap = min(allPenR.capacity);
		// const maxCap = max(allPenR.capacity);
		const capacityColors = scaleLinear()
			.domain([0, 1000])
			.range(['white', 'black']);

		// const setPoints = (d) => {
		// 	const [x, y] = projection([d.longitude, d.latitude]);
		// };

		gemeentes
			.data(gemeente.features)
			.enter()
			.append('path')
			.attr('d', path)
			.attr('class', 'gemeente-grens');

		provinces
			.data(province.features)
			.enter()
			.append('path')
			.attr('d', path)
			.attr('class', 'province')
			.on('click', activateProvince);

		parking
			.data(allPenR)
			.enter()
			.append('circle')
			.attr('r', '1')
			.attr('cx', (d) => projection([d.longitude, d.latitude])[0])
			.attr('cy', (d) => projection([d.longitude, d.latitude])[1]);

		// parking.transition().duration(500).attr('r', '2');
	}, [svgElement]);

	return (
		<ZoomContainer
			size={size}
			setActiveProvince={setActiveProvince}
			activeProvince={activeProvince}
			provinces={provincesEl}
			path={path}
		>
			<g className='gemeentes' />
			<g className='provinces' />
			<g className='parking-locations' />
		</ZoomContainer>
	);
};

const StyledG = styled.g``;

// const Province = ({ d, isActive, onClick }) => {
// 	return (
// 		<StyledProvincePath
// 			className={isActive ? 'province active' : 'province'}
// 			d={d}
// 			onClick={onClick}
// 			title={d.properties}
// 		/>
// 	);
// };

// const StyledProvincePath = styled.path`
// 	/* transition-duration: 700ms; */

// 	:hover {
// 		opacity: 0.5;
// 	}
// `;

// const Circle = ({
// 	cx,
// 	cy,
// 	r,
// 	data,
// 	activeProvince,
// 	onMouseEnter,
// 	activeCity,
// 	fill,
// }) => {
// 	const { province, city, capacity } = data;

// 	if (activeProvince && activeProvince.properties.statnaam == province) {
// 		r = r * 1.5;
// 	}

// 	return (
// 		<StyledCircle
// 			cx={cx}
// 			cy={cy}
// 			r={r}
// 			onClick={onMouseEnter}
// 			active={activeCity}
// 			fill={fill}
// 		/>
// 	);
// };

// const StyledCircle = styled.circle`
// 	transition-duration: 700ms;
// 	/* fill: ${(props) => (props.active ? colors.blue : colors.blue)}; */
// 	fill-opacity: 1;
// 	stroke: ${(props) => (props.active ? colors.red : colors.blue)};
// 	stroke-width: 0.5;
// 	&:hover {
// 		fill: ${colors.darkBlue};
// 	}
// `;

export default DrawNL;
