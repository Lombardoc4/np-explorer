import { Outlet } from 'react-router';

import { NavBar } from '../components/NavBar';

const Layout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <>
      <NavBar />

      <Outlet />
      {children}
    </>
  );
};

export default Layout;
