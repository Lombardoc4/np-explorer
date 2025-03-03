import { useEffect } from 'react';
import { useLocation } from 'react-router';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // "document.documentElement" is the magic for React Router Dom v6
    document.documentElement.scrollIntoView(true);
  }, [pathname]);

  return null;
}
