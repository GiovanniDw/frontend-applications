import React, { useMemo } from 'react';
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
	const projection = geoMercator().translate([width / 2, height / 2]);

	const path = geoPath().projection(projection);
	const center = geoCentroid(province);
	const bounds = geoBounds(province);
	const distance = geoDistance(bounds[1], bounds[0]);
	const scale = width / distance / Math.sqrt(2);

	projection.scale(scale).center(center);

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
				{useMemo(
					() => (
						<>
							<g className='gemeentes'>
								{/* {gemeente.features.map((d) => (
								<path
									key={d.id}
									className='gemeente-grens'
									d={path(d)}
								/>
							))} */}
								<path
									className='gemeente-borders'
									d={path(gemeenteBorder)}
								/>
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
								<path
									className='province-borders'
									d={path(provinceBorder)}
								/>
							</g>
						</>
					),
					[path, province, provinceBorder, gemeenteBorder]
				)}
				<Marks
					filteredUsage={filteredUsage}
					data={data}
					projection={projection}
					colorScale={colorScale}
					colorValue={colorValue}
					activeProvince={activeProvince}
					hoveredUsage={hoveredUsage}
					fadeOpacity={fadeOpacity}
					sizeScale={sizeScale}
					sizeValue={sizeValue}
				/>
				<Marks
					filteredUsage={filteredUsage}
					data={filteredUsage}
					projection={projection}
					colorScale={colorScale}
					colorValue={colorValue}
					sizeValue={sizeValue}
					sizeScale={sizeScale}
				/>
			</ZoomContainer>
		</>
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
	return (
		<g className='parking-locations'>
			{data.map((d) => {
				const [x, y] = projection([d.longitude, d.latitude]);

				const reduceSizeOnScale = (d) => {
					if (
						activeProvince &&
						activeProvince.properties.statnaam === d.province
					) {
						return 1;
					} else if (activeProvince) {
						return 1;
					} else {
						return sizeScale(sizeValue(d));
					}
				};
				{
					/* console.log(hoveredUsage); */
				}
				return (
					<StyledCircle
						key={d.id}
						cx={x}
						cy={y}
						r={sizeScale(sizeValue(d))}
						fill={colorScale(colorValue(d))}
						hoveredUsage={hoveredUsage}
						usage={d.usage}
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

const StyledCircle = styled.circle`
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
