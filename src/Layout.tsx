import { Outlet } from "react-router";

import { NavBar } from "./components/NavBar";
import ScrollToTop from "./components/ScrollToTop";
import { Footer } from "./components/Footer";

// import { SearchProvider } from "./utils/hooks/SearchContext";

function App({ children }: { children?: React.ReactNode }) {
    return (
        <>
            {/* This scrolls to top of page when the path changes */}
            <ScrollToTop />

            {/* <SearchProvider> */}
                <NavBar />
            {/* </SearchProvider> */}

            <Outlet />
            {children}

            <Footer />
        </>
    );
}

export default App;
