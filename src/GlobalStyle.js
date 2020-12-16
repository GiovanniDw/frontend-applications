import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

export const colors = {
	darkBlue: '#2F80ED',
	blue: '#2D9CDB',
	lightBlue: '#B3E5FC',
	dark: '#333333',
	darkGray: '#4F4F4F',
	midGray: '#828282',
	lightGray: '#BDBDBD',
	light: '#E0E0E0',
	white: '#F2F2F2',
	darkGreen: '#219653',
	green: '#27AE60',
	lightGreen: '#6FCF97',
	orange: '#F2994A',
	darkPurple: '#9B51E0',
	purple: '#BB6BD9',
	red: '#EB5757',
	yellow: '#F2C94C',
};

/**
 * Converts a CSS hex color value to RGBA.
 * @param {string} hex - Expanded hexadecimal CSS color value.
 * @param {number} alpha - Alpha as a decimal.
 * @returns {string} RGBA CSS color value.
 */
export const addAlpha = (hex, alpha) => {
	const r = parseInt(hex.substring(1, 3), 16);
	const g = parseInt(hex.substring(3, 5), 16);
	const b = parseInt(hex.substring(5, 7), 16);
	return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const GlobalStyle = createGlobalStyle`
    ${normalize};
.App {
  background-color: ${colors.white};
  width: 100%;
  height: 100%;
}


.provinces {
	fill: ${colors.lightGreen};
	stroke: ${colors.white};
}

.provinces .active {
	opacity: .5;
	transition: visibility 0s, opacity 0.5s linear;
}

.province-borders {
	fill: none;
	stroke: var(--white);
	stroke-width: 1;
	stroke-linejoin: round;
	stroke-linecap: round;
	pointer-events: none;
}

.gemeente-grens {
	stroke-linejoin: round;
	stroke-linecap: round;
	stroke: ${colors.green};
	stroke-opacity: 1;
	/* stroke-width: 0.1em; */
	/* transition-duration: 0.5s; */
	fill: ${colors.lightGreen};
}

    `;

export default GlobalStyle;
