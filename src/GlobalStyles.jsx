import React from 'react';
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

export const px2vw = (size, width = 1440) => `${(size / width) * 100}vw`;

export const GlobalStyle = createGlobalStyle`
    ${normalize};

	* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  html {
	
	  box-sizing: border-box;
        overflow-y: scroll;
		
  }
  #root {
	  min-width:100vw;
	  min-height:100vh;
  }
  :root {

	body {
		background-color: ${colors.white};
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
		'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
		'Helvetica Neue', sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	${'' /* min-width:100%;
	min-height:100%; */}
	min-width:100vw;
		min-height:100vh;
	
	}
	code {
	font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
		monospace;
}

      font-size: ${px2vw(24)};

      @media (min-width: 768px) {
        font-size: ${px2vw(24)};
      }

      @media (min-width: 1024px) {
        font-size: ${px2vw(24)};
      }
    }


.App {
  background-color: ${colors.white};
  max-width:100vw;
	max-height:100vh;
  ${'' /* margin: 0 auto; */}
}
.viz-wrapper {
	width:100%;
	height:100%;
	display:flex;
	position:relative;

	.title {
		position: absolute;
		padding-left:1em;
	}
}

.province {
	stroke-opacity: 0.5;
	stroke-width: 1px;
	/* stroke: none; */
	stroke-linejoin: round;
	stroke-linecap: round;
}
.gemeente {
	fill-opacity: 1;
	
	/* stroke: white; */
}
.gemeente-borders{
	fill: none;
	stroke: ${colors.lightGreen};
	stroke-width: 1;
	stroke-linejoin: round;
	${'' /* stroke-linecap: round; */}
	pointer-events: none;
}
.provinces {
	fill: ${colors.lightGreen};
	stroke: ${colors.white};
	transition: 0.3s;
}

.provinces .active {
	opacity: .8;
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
