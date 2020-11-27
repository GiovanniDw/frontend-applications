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


const GlobalStyle = createGlobalStyle`
    ${normalize};
.App {
  background-color: ${colors.white};
  width: 100%;
  height: 100%;
}
    `;

export default GlobalStyle;