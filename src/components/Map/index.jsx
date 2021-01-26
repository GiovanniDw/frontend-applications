import React, { useMemo, useState, useRef, useEffect } from 'react';
import {
	useSpring,
	useTransition,
	animated,
	useTrail,
	useSprings,
	interpolate,
	Spring,
} from 'react-spring';
import { Controls, PlayState, Tween } from 'react-gsap';
import { Transition } from 'react-spring/renderprops';
import styled from 'styled-components';
import { colors, px2vw } from '../../GlobalStyles';
import { geoMercator, geoPath, geoCentroid, geoBounds, geoDistance } from 'd3';
import Marks from './Marks';
import { ZoomContainer } from '../ZoomContainer';
import { useSvg } from '../SVGContainer';
export const Map = (props) => {
	const {
		nld,
		activeProvinceFeature,
		activateProvince,
		setActiveProvinceFeature,
		dimensions,
	} = props;
	const { gemeente, gemeenteBorder, province, provinceBorder } = nld;
	const { width, height } = dimensions;
	const svgElement = useSvg();
	const pathRef = useRef();
	const [currentCenter, setCurrentCenter] = useState(province);
	const center = geoCentroid(currentCenter);
	const bounds = geoBounds(currentCenter);
	const distance = geoDistance(bounds[1], bounds[0]);
	const scale = height + width / distance / Math.sqrt(2);

	const projection = geoMercator()
		.scale(scale)
		.center(center)
		.translate([width / 2, height / 2]);

	const path = geoPath().projection(projection);

	const renderNL = () => {
		return (
			<>
				<g className='gemeentes'>
					<path
						className='gemeente-borders'
						d={path(gemeenteBorder)}
					/>
				</g>

				<g className='provinces'>
					{province.features.map((d) => (
						<path
							key={d.id}
							className={
								activeProvinceFeature === d
									? 'province active'
									: 'province'
							}
							d={path(d)}
							onClick={() => activateProvince(d)}
							title={d.properties.statnaam}
						/>
					))}

					<path
						className='province-borders'
						d={path(provinceBorder)}
					/>
				</g>
			</>
		);
	};

	return (
		<>
			<ZoomContainer
				{...nld}
				setActiveProvinceFeature={setActiveProvinceFeature}
				activeProvinceFeature={activeProvinceFeature}
				path={path}
				size={dimensions}
				width={width}
				height={height}
			>
				{props.nld && renderNL()}
				<Marks {...props} projection={projection} />
			</ZoomContainer>
		</>
	);
};

const StyledProvincePath = styled.path`
	transition-duration: 700ms;

	:hover {
		opacity: 0.7;
	}
`;
