import React from 'react';

import styled from 'styled-components';
import { px2vw, colors } from '../GlobalStyles';
export const Container = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	margin: ${px2vw(32)};
	max-width: 100%;

	.map {
		border: 1px solid red;
	}
	.legend {
		position: absolute;

		bottom: 0;
		left: 10px;
	}
`;

export const StyledCircle = styled.circle`
	transition-duration: 100ms;
	/* fill: ${(props) => (props.active ? colors.blue : colors.blue)}; */
	fill-opacity: 1;
	/* stroke: ${(props) => (props.active ? colors.red : colors.blue)}; */
	/* stroke-width: 0.5; */
	stroke-width: ${(props) => (props.active ? 1 : 3)};
	&:hover {
		fill: ${colors.darkBlue};
	}
`;
