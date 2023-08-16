import { DefaultTheme } from "styled-components";

const theme = {
    colors: {
      primary: 'hsl(95, 18%, 66%)',
      secondary: 'hsl(25 30% 75%)',
      accent: 'hsl(93, 43%, 43%)',
      black: '#000000',
      white: '#fff',
      gray: '#f1f1f1',
    },
    zIndex: {
      overlay: 5000,
      dropdown: 7500,
      navbar: 8000,
      modal: 10000
    },
    boxShadow: {
      sm: '0 0 0.5em rgba(0, 0, 0, 0.25)',
      md: '0 0 1em rgba(0, 0, 0, 0.25)',
      lg: '0 0 2em rgba(0, 0, 0, 0.25)',
      far: '0 0 3em -1.5em rgba(0, 0, 0, 0.25)',
    },
    radius : {
      sm: '0.25em',
      md: '0.5em',
      lg : '1em'
    }
  };

export default theme as DefaultTheme;