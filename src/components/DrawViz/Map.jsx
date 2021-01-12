import React, { useMemo, useState, useRef, useEffect } from 'react';
import {
	useSpring,
	useTransition,
	animated,
	useTrail,
	useSprings,
} from 'react-spring';
import styled from 'styled-components';
import { colors, px2vw } from '../../GlobalStyles';
import { geoMercator, geoPath, geoCentroid, geoBounds, geoDistance } from 'd3';
import { ZoomContainer } from '../ZoomContainer';
import { useSvg } from '../SVGContainer';
export const Map = (props) => {
	const {
		nld,
		data,
		colorScale,
		colorValue,
		sizeScale,
		sizeValue,
		activeProvince,
		activateProvince,
		setActiveProvince,
		filteredUsage,
		hoveredUsage,
		filteredData,
		fadeOpacity,
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
											activeProvince === d
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
				setActiveProvince={setActiveProvince}
				activeProvince={activeProvince}
				path={path}
				size={dimensions}
				width={width}
				height={height}
			>
				{data.length && Provinces()}
				{data && <Marks {...props} projection={projection} />}
			</ZoomContainer>
		</>
	);
};

const StyledProvincePath = styled.path`
	/* transition-duration: 700ms; */

	:hover {
		opacity: 0.7;
	}
`;

const Marks = (props) => {
	const {
		data,
		hoveredUsage,
		projection,
		sizeScale,
		colorScale,
		sizeValue,
		colorValue,
		fadeOpacity,
		filteredData,
	} = props;
	const springRef = useRef();
	// const style = useSpring({ opacity: 1, from: { opacity: 0 } });
	const [visibleLocations, setVisibleLocations] = useState(data);

	useEffect(() => {
		if (!data) return;
		setVisibleLocations(filteredData);
	}, [data]);

	return (
		<g className='parking-locations'>
			{data.map((d) => {
				const proj = projection([d.longitude, d.latitude]);
				const r = sizeScale(sizeValue(d));
				const fill = colorScale(colorValue(d));
				return (
					<Circle
						key={d.id}
						proj={proj}
						// cx={x}
						// cy={y}
						r={r}
						fill={fill}
						value={d.usage}
						active={
							hoveredUsage && d.usage !== hoveredUsage
								? true
								: false
						}

						// opacity={
						// 	hoveredUsage && d.usage !== hoveredUsage
						// 		? fadeOpacity
						// 		: 0.8
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
	const { value, r, fill, transform, active, proj, isShowing } = props;

	// const wasActive = useRef(false);

	// const style = useSprings({
	// 	config: {
	// 		duration: 300,
	// 	},
	// 	opacity: active ? 0.1 : 1,
	// 	r: active ? 1 : r,
	// });

	return (
		<animated.circle fill={fill} r={r} transform={`translate(${proj})`} />
	);
};

const StyledCircle = styled(animated.circle)`
	/* transition-duration: 500ms; */
	/* fill: ${(props) => (props.active ? colors.blue : colors.blue)}; */
	/* fill-opacity: 1; */
	/* stroke: ${(props) => (props.active ? colors.red : colors.blue)}; */
	/* stroke-width: 0.5; */
	/* stroke-width: ${(props) => (props.active ? 1 : 3)}; */
	&:hover {
		stroke: ${colors.white};
	}
`;
