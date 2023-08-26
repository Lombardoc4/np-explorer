import { Outlet } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { NavBar } from "./components/NavBar";
import ScrollToTop from "./components/ScrollToTop";
import { Footer } from "./components/Footer";

import { SearchProvider } from "./utils/hooks/SearchContext";

import GlobalStyles from "./styles/globalStyles";
import theme from "./styles/theme";

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
