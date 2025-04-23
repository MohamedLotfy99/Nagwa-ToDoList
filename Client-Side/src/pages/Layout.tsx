import { Outlet, useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useState, useEffect } from "react";

const Layout = () => {
  const location = useLocation();

  const [showNav, setShowNav] = useState(false);

  const checkNav = () => {
    const hideNavRoutes = ["/", "/Signup"];
    const isLoggedInLocal = !!localStorage.getItem("user");
    const isLoggedInSession = !!sessionStorage.getItem("user");

    if (
      !isLoggedInSession &&
      !isLoggedInLocal &&
      !hideNavRoutes.includes(location.pathname)
    ) {
      setShowNav(false);
    } else {
      setShowNav(true);
    }
  };

  useEffect(() => {
    checkNav();
  }, [location]);

  return (
    <>
      {showNav && <NavBar />}
      <Outlet />
    </>
  );
};

export default Layout;
