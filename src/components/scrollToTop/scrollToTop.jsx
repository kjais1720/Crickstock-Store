import { useEffect } from "react";
import { useLocation } from "react-router";
export function ScrollToTop({ children }) {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return children;
}
