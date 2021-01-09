import React, { useMemo, useState, useRef } from 'react';
import { useSpring, useTransition, animated, useTrail } from 'react-spring';
import styled from 'styled-components';
import { colors, px2vw } from '../../GlobalStyles';
import { geoMercator, geoPath, geoCentroid, geoBounds, geoDistance } from 'd3';
import { ZoomContainer } from '../ZoomContainer';

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
		fadeOpacity,
		dimensions,
	} = props;
	const { gemeente, gemeenteBorder, province, provinceBorder } = nld;
	const { width, height } = dimensions;

	const [currentCenter, setCurrentCenter] = useState(province);
	const center = geoCentroid(currentCenter);
	const bounds = geoBounds(currentCenter);
	const distance = geoDistance(bounds[1], bounds[0]);
	const scale = width / distance / Math.sqrt(2);

	const projection = geoMercator().scale(scale).center(center);

	const path = geoPath().projection(projection);

	projection.translate([width / 2, height / 2]);

	const renderNL = () => {};

	const Provinces = ({ active }) => {
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
										active={activeProvince ? d : undefined}
										className={
											active
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
				<Provinces />

				<Marks {...props} projection={projection} />
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

const Marks = ({
	data,
	projection,
	colorScale,
	colorValue,
	filteredUsage,
	activeProvince,
	hoveredUsage,
	fadeOpacity,
	sizeScale,
	sizeValue,
}) => {
	const springRef = useRef();

	return (
		<g className='parking-locations'>
			{data.map((d) => {
				const [x, y] = projection([d.longitude, d.latitude]);

				return (
					<StyledCircle
						key={d.id}
						cx={x}
						cy={y}
						r={sizeScale(sizeValue(d))}
						fill={colorScale(colorValue(d))}
						value={d.usage}
						// isShowing={filteredUsage.includes(d)}
						opacity={
							hoveredUsage && d.usage !== hoveredUsage
								? fadeOpacity
								: 0.8
						}
					>
						<title> {d.name}</title>
					</StyledCircle>
				);
			})}
		</g>
	);
};

// const Circle = (props) => {
// 	const style = useSpring({
// 		config: {
// 			duration: 200,
// 		},
// 		opacity: props.isShowing ? 0 : 1,
// 	});
// 	return <StyledCircle style={style} {...props}></StyledCircle>;
// };

const StyledCircle = styled(animated.circle)`
	transition-duration: 300ms;
	/* fill: ${(props) => (props.active ? colors.blue : colors.blue)}; */
	fill-opacity: 1;
	/* stroke: ${(props) => (props.active ? colors.red : colors.blue)}; */
	/* stroke-width: 0.5; */
	/* stroke-width: ${(props) => (props.active ? 1 : 3)}; */
	&:hover {
		stroke: ${colors.white};
	}
`;
