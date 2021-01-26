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
			{sizeScale &&
				allLocations.map((d) => {
					const proj = projection([d.longitude, d.latitude]);
					const [x, y] = projection([d.longitude, d.latitude]);
					const r = sizeScale(sizeValue(d));
					const fill = colorScale(colorValue(d));

					return (
						<Circle
							{...d}
							key={d.id}
							proj={proj}
							cx={x}
							cy={y}
							r={r}
							fill={d.color}
							value={d.usage}
							active={activeLocations.includes(d)}
							// active={
							// 	hoveredUsage && d.usage !== hoveredUsage
							// 		? true
							// 		: false
							// }
							// opacity={
							// 	hoveredUsage && d.usage !== hoveredUsage
							// 		? 0.1
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
	const {
		value,
		r,
		fill,
		transform,
		active,
		proj,
		isShowing,
		opacity,
		cx,
		cy,
	} = props;

	// const wasActive = useRef(false);

	// const setState = useSpring({ opacity: 1, from: { opacity: 0 } });

	// const style = useSpring({
	// 	config: {
	// 		duration: 100,
	// 	},
	// 	opacity: active ? 0.8 : 0.1,
	// 	r: active ? r : r / 2,
	// });

	// const newStyle = useSpring({
	// 	opacity: active ? 1 : 0.1,
	// 	to: [
	// 		{ opacity: 1, color: '#ffaaee', r: r },
	// 		{ opacity: 0, color: 'rgb(14,26,19)', r: 1 },
	// 	],
	// 	from: { opacity: 0, color: 'red', r: r },
	// });

	return (
		<StyledCircle
			fill={fill}
			cx={cx}
			cy={cy}
			r={props.active && props.active ? r : r / 2}
			opacity={props.active && props.active ? 0.8 : 0.1}
			// transform={`translate(${proj})`}
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

export default Marks;
