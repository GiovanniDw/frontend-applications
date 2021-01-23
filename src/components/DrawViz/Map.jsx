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
import { Transition } from 'react-spring/renderprops';
import styled from 'styled-components';
import { colors, px2vw } from '../../GlobalStyles';
import { geoMercator, geoPath, geoCentroid, geoBounds, geoDistance } from 'd3';
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

	const renderNL = () => {};

	const Provinces = () => {
		return (
			<>
				{useMemo(
					() => (
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
					),
					[path, province, provinceBorder, gemeenteBorder]
				)}
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
				{props.nld && <Provinces />}
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

const Marks = (props) => {
	const {
		projection,
		sizeScale,
		colorScale,
		sizeValue,
		colorValue,
		allLocations,
		activeLocations,
	} = props;
	const springRef = useRef();
	// const style = useSpring({ opacity: 1, from: { opacity: 0 } });
	const [visibleLocations, setVisibleLocations] = useState(true);

	// useEffect(() => {
	// 	if (!filteredUsage || !data) return;
	// 	// setVisibleLocations(filteredData);
	// 	// hoveredUsage
	// 	// 	? setVisibleLocations(filteredUsage)
	// 	// 	: setVisibleLocations(data);

	// 	hoveredUsage ? setVisibleLocations(false) : setVisibleLocations(true);
	// }, [filteredUsage]);

	return (
		<g className='parking-locations'>
			{allLocations.map((d) => {
				const proj = projection([d.longitude, d.latitude]);
				const r = sizeScale(sizeValue(d));
				const fill = colorScale(colorValue(d));

				return (
					<Circle
						{...d}
						key={d.id}
						proj={proj}
						// cx={x}
						// cy={y}
						r={d.capacitySizeScale}
						fill={d.color}
						value={d.usage}
						active={activeLocations && activeLocations.includes(d)}
						// active={
						// 	hoveredUsage && d.usage !== hoveredUsage
						// 		? true
						// 		: false
						// }
						// opacity={
						// 	hoveredUsage && d.usage !== hoveredUsage ? 0.1 : 0.8
						// }
					>
						<title> {d.name}</title>
					</Circle>
				);
			})}
		</g>
	);
};

const Circle = (props) => {
	const {
		value,
		r,
		fill,
		transform,
		active,
		proj,
		isShowing,
		opacity,
	} = props;

	// const wasActive = useRef(false);

	// const setState = useSpring({ opacity: 1, from: { opacity: 0 } });

	const style = useSpring({
		config: {
			duration: 100,
		},
		opacity: active ? 1 : 0.1,
		r: active ? r : r / 2,
	});

	const newStyle = useSpring({
		opacity: active ? 1 : 0.1,
		to: [
			{ opacity: 1, color: '#ffaaee', r: r },
			{ opacity: 0, color: 'rgb(14,26,19)', r: 1 },
		],
		from: { opacity: 0, color: 'red', r: r },
	});

	return (
		<StyledCircle
			fill={fill}
			r={props.active && props.active ? r : r / 2}
			opacity={props.active && props.active ? 1 : 0.3}
			transform={`translate(${proj})`}
		/>
	);
};

const StyledCircle = styled(animated.circle)`
	transition-duration: 500ms;
	/* fill: ${(props) => (props.active ? colors.blue : colors.blue)}; */
	/* fill-opacity: 1; */
	/* stroke: ${(props) => (props.active ? colors.red : colors.blue)}; */
	/* stroke-width: 0.5; */
	/* stroke-width: ${(props) => (props.active ? 1 : 3)}; */
	&:hover {
		stroke: ${colors.white};
	}
`;
