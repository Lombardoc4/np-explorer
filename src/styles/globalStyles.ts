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

        --def-input-height: 3em;
        --def-input-border-radius: calc(0.5 * var(--def-input-height));
    }

    *, *:before, *:after{
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    .no-scroll { overflow: hidden; }
    .mx-auto { margin-left: auto; margin-right: auto; }
    .bold { font-weight: 700 }
    a { color:  inherit; font-weight: inherit }
    h1, h2, h3, h4, h5, h6 { font-weight: 800 }
    a.btn {
        border-radius: ${({ theme }) => theme.radius.sm};
        padding: 0.25em 0.5em;

        img, svg{
            margin-right: 0.5em;
        }

        &:hover {
            background-color: ${({ theme }) => theme.colors.gray};
        }
    }

    header {
        margin: 2em auto 1em;
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
        border-color: ${({ theme }) => theme.colors.primary};
        box-shadow: rgba(255, 255, 255, 0.26) 0 2px 8px;
    }
    button:focus,
    button:focus-visible {
        outline: 4px auto -webkit-focus-ring-color;
    }

    .container{
        width: clamp(300px, 90%, 1200px);
        margin-left:  auto;
        margin-right: auto;
    }

    .img-container{
        width: 100%;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;

        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .credits{
            position: absolute;
            bottom: 0;
            left: 0;
            padding: 0.5em;
            background-color: rgba(0,0,0,0.5);
            color: #fff;
            font-size: 0.8em;
        }
    }

    .overlay, .overlay-gradient{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: ${({ theme }) => theme.zIndex.overlay};
        background: rgba(0,0,0,0.3);
        display: flex;
        justify-content: center;
        align-items: center;
    }


    .overlay-gradient {
        background: linear-gradient( rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 100%);
        align-items: flex-end;
        justify-content: flex-start;
        padding: 1em;
    }


    .content {
        font-size: 1.2em;

        .section:not(:first-child) {
            padding: 1em 0;
            border-bottom: 1px solid;
            scroll-margin: 100px;

            li {margin-left: 1em;}

            p {margin-bottom: 0.25em;}
        }

    }


        /* Move to Dropdown styles */
        /* vvvvvvvvvvv */
        input:focus {
        border-color: #8bc944;
        }


        input[type="search"]{
        border: none;
        overflow: hidden;
        color: #000000;
        font-family: inherit;
        font-size: inherit;
        height: var(--def-input-height);
        outline: 0;
        padding-right: 44px;
        padding-left: 52px;
        width: 100%;
        }

        input[type="search"]::-webkit-search-decoration,
        input[type="search"]::-webkit-search-cancel-button,
        input[type="search"]::-webkit-search-results-button,
        input[type="search"]::-webkit-search-results-decoration {
        -webkit-appearance: none;
        display: none;
        }


        .search-icon{
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: calc(var(--def-input-height) / 2)
        }
        .close-icon, .enter-icon{
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: calc(var(--def-input-height) / 2)
        }

        /* ^^^^^^^^^^^ */
        /* Move to Dropdown */



    /* TODO Move to Leaflet file */
    .leaflet-container {
        height: 300px;
        width: 100%;
    }

    @media (min-width: 768px) {
        .leaflet-container {
            height: 500px;
        }
    }
`;

export default GlobalStyles;
