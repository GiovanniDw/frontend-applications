import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {colors} from '../GlobalStyle'

import { geoMercator, geoPath, zoom, zoomIdentity, zoomTransform } from 'd3';

const projection = geoMercator().scale(6000).center([5.55, 52.2]);
const path = geoPath(projection);

export const DrawMap = ({ nld, penr }) => {
	const { gemeente, province, provinceBorder } = nld;
	const { byProvince, byCity, allPenR } = penr;



	return (
		<g className='nld'>
			<g id='gemeentes'>
				{gemeente.features.map((d) => (
					<path key={d.id} className='gemeente-grens' d={path(d)} />
				))}
			</g>
			<g id='provinces'>
				{province.features.map((d) => (
					<path key={d.id} className='province' d={path(d)} />
				))}
			</g>

			<path id='province-borders' d={path(provinceBorder)} />
			{allPenR.map((d) => {
				const [x, y] = projection([d.longitude, d.latitude]);
				return <Circle key={d.id} cx={x} cy={y} r={d.capacity / 400} />;
			})}
		</g>
	);
};

const Circle = styled.circle`
	fill: ${colors.midGray};
	fill-opacity: 0.5;

	&:hover {
		fill-opacity: 1;
	}
`;
