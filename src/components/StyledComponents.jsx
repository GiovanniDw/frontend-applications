import React from 'react';

import styled from 'styled-components';
import { px2vw, colors } from '../GlobalStyles';
export const Container = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-items: stretch;
	justify-content: center;
	padding-top: ${px2vw(32)};
	padding-left: ${px2vw(32)};
	padding-right: ${px2vw(32)};
	padding-bottom: ${px2vw(32)};
	max-width: 100%;
	height: 100%;

	.map {
		color: red;
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
	/* stroke: ${(props) => (props.active ? props.fill : colors.blue)}; */
	stroke-width: 1;
	/* stroke-width: ${(props) => (props.active ? 1 : 3)}; */
	/* stroke: ${(props) => props.fill}; */
	&:hover {
		/* stroke: ${(props) => colors.red}; */
	}
`;
