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
	  ${'' /* min-width:100vw; */}
	  ${'' /* min-height:100vh; */}
	  ${'' /* -webkit-overflow-scrolling: touch; */}
	  padding-top: min(16px, env(safe-area-inset-top));
	  padding-left: min(16px, env(safe-area-inset-left));
        padding-right: min(16px, env(safe-area-inset-right));
        padding-bottom: min(16px, env(safe-area-inset-bottom));
		
  }
  :root {
	--safe-area-inset-top   : 16px;
    --safe-area-inset-right : 16px;
    --safe-area-inset-bottom: 16px;
    --safe-area-inset-left  : 16px;  
	body {
		background-color: ${colors.white};
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
		'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
		'Helvetica Neue', sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	${'' /* min-width:100%;
	min-height:100%; */}
	min-width:100%;
		min-height:100%;
	
	}
	code {
	font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
		monospace;
}

      font-size: 14px;

      @media (min-width: 768px) {
        font-size: 16px;
      }

      @media (min-width: 1024px) {
        font-size: 18px;
      }
    }


.App {
  background-color: ${colors.white};
  width:100vw;
	height:100vh;
	max-height:100%;
	max-width:100%;
  ${'' /* margin: 0 auto; */}
}
.viz-wrapper {
	width:100%;
	height:100%;
	display:flex;
	position:relative;
	padding-bottom:50px;
	padding-bottom:calc(50px + env(safe-area-inset-bottom));
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

&:hover {opacity:0.9;}

}
.gemeente {
	fill-opacity: 1;
	
	/* stroke: white; */
}
.gemeente-borders{
	fill: none;
	stroke: ${colors.lightGreen};
	${'' /* stroke-width: 1; */}
	stroke-linejoin: round;
	${'' /* stroke-linecap: round; */}
	pointer-events: none;
}
.provinces {
	fill: ${colors.lightGreen};
	stroke: ${colors.white};
	${'' /* transition: 0.3s; */}
}

.provinces .active {
	opacity: .8;
	transition: visibility 0s, opacity 0.3s linear;
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

.legend-label {
	font-weight:bold;
}

    `;

export default GlobalStyle;
