import { createGlobalStyle } from "styled-components";


const GlobalStyles = createGlobalStyle`
    /* Import fonts here */
  /* @import url("https://use.typekit.net/lhn3rih.css"); */

    :root {
    font-family: "futura-pt", sans-serif;
    /* line-height: 1.5; */
    /* font-weight: 400; */
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
    }

    *, *:before, *:after{
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }
    
    body {
        font-size: 16px;
    }
    
    h1, h2, h3, h4, h5, h6 {
        font-family: "futura-pt", sans-serif;
        font-weight: 700;
        font-style: normal;
    }
    h1 { font-weight: 800; }
`;

export default GlobalStyles;