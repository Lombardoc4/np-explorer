import { useContext, useMemo } from "react";
import { Outlet, useLoaderData } from "react-router-dom";

import { USMap } from "./components/USMap";
import { NavBar } from "./components/NavBar";
import ScrollToTop from "./components/ScrollToTop";

import ParkContext, { ParkProvider } from "./utils/hooks/ParkContext";

import "./styles/App.css";
import { Footer } from "./components/Footer";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./styles/globalStyles";
import theme from "./styles/theme";
import { SearchProvider } from "./utils/hooks/SearchContext";

function App({ children }: { children?: JSX.Element }) {
    return (
        <SearchProvider>
            <ThemeProvider theme={theme}>
                <GlobalStyles />

                {/* This scrolls to top of page when the path changes */}
                <ScrollToTop />

                <NavBar />

                <Outlet />
                {children}

                <Footer />
            </ThemeProvider>
        </SearchProvider>
    );
}

export default App;
