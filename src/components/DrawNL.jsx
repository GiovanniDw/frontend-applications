import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { ZoomContainer } from './ZoomContainer';
import { colors, addAlpha } from '../GlobalStyle';
import { useSvg } from './SVGContainer';
import { geoMercator, geoPath, scaleLinear, max, min, select } from 'd3';

export const DrawNL = (props) => {
	const gRef = useRef();
	const { gemeente, province, provinceBorder } = props.nld;
	const { allPenR } = props.penr;

	// const provinces = province.features;

	const svgElement = useSvg();

	const capacityColors = scaleLinear()
		.domain([1, 1000])
		.range(['white', 'black']);
	const [activeProvince, setActiveProvince] = useState(null);
	const [activeCity, setActiveCity] = useState(null);
	// useEffect(() => props.svg(activeProvince), []);

	useEffect(() => {
		if (!svgElement) return;

		const svg = select(svgElement);
		const g = select(gRef.current).attr('class', 'nld');

		// const minCap = min(allPenR.capacity);
		// const maxCap = max(allPenR.capacity);
		const capacityColors = scaleLinear()
			.domain([0, 1000])
			.range(['white', 'black']);

		const projection = geoMercator().scale(6000).center([5.55, 52.2]);
		const path = geoPath(projection);

		g.append('g')
			.attr('id', 'gemeentes')
			.selectAll('path')
			.data(gemeente.features)
			.enter()
			.append('path')
			.attr('d', path)
			.attr('class', 'gemeente-grens');

		g.append('g')
			.attr('id', 'provinces')
			.selectAll('path')
			.data(province.features)
			.enter()
			.append('path')
			.attr('d', path)
			.attr('class', 'province')
			.on('click', (d) => console.log(d));

		g.append('g')
			.selectAll('circle')
			.data(allPenR)
			.enter()
			.append('circle')
			.attr('r', '1')
			.attr('cx', (d) => projection([d.longitude, d.latitude])[0])
			.attr('cy', (d) => projection([d.longitude, d.latitude])[1]);
	}, [allPenR, activeCity, activeProvince, svgElement, gRef]);

	return (
		<ZoomContainer ref={svgElement}>
			<StyledG ref={gRef}></StyledG>
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
