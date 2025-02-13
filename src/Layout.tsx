import { Outlet } from 'react-router';

import { NavBar } from './components/NavBar';
import { Footer } from './components/Footer';

// import { SearchProvider } from "./utils/hooks/SearchContext";

const Layout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <>
      {/* This scrolls to top of page when the path changes */}
      {/* <ScrollToTop /> */}

      <NavBar />

      <Outlet />
      {children}

      <Footer />
    </>
  );
};

export default Layout;
