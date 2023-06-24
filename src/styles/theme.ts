import { DefaultTheme } from "styled-components";

const theme = {
    colors: {
      primary: 'hsl(95, 48%, 26%)',
      secondary: 'hsl(40, 44%, 63%)',
      accent: 'hsl(93, 43%, 43%)',
      black: '#000000',
      white: '#fff',
      gray: '#f1f1f1',
    },
    zIndex: {
      dropdown: 1000,
      overlay: 5000,
      navbar: 10000,
    }
  };
  
export default theme as DefaultTheme;