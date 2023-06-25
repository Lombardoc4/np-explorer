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
    
    .no-scroll {
        overflow: hidden;
    }

    *, *:before, *:after{
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }
    
    h1, h2, h3, h4, h5, h6 {
        font-family: "futura-pt", sans-serif;
        font-weight: 700;
        font-style: normal;
    }
    
    h1 { font-weight: 800; }
       
    h2 {
        font-size: 2.2em;
    }
    
    a {
        font-weight: 600;
        color:  inherit;
        /* text-decoration: inherit; */
    }
    
    button {
        border-radius: 8px;
        border: 1px solid transparent;
        padding: 0.6em 1.2em;
        font-size: 1em;
        font-weight: 500;
        font-family: inherit;
        background-color: #1a1a1a;
        color: #ffffff;
        cursor: pointer;
        transition: border-color 0.25s;
    }
    button:hover {
        border-color: ${({theme})=> theme.colors.primary};
        box-shadow: rgba(255, 255, 255, 0.26) 0 2px 8px;
    }
    button:focus,
    button:focus-visible {
        outline: 4px auto -webkit-focus-ring-color;
    }
    
    .mt-auto { margin-top: auto; }
    .mx-auto { margin-left: auto; margin-right: auto; }
    
    .overlay{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: ${({theme})=> theme.zIndex.overlay};
        background: rgba(0,0,0,0.3);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    .leaflet-container {
        height: 300px;
        width: 100%;
    }
    
    .directions .leaflet-container {
        height: 400px;
    }
    
    @media (min-width: 768px) {
        .leaflet-container {
            height: 400px;
        }
    }
`;

export default GlobalStyles;