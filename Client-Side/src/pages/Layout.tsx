import { Outlet, useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useState, useEffect } from "react";

const Layout = () => {
  const location = useLocation(); // Access the current route path

  const [showNav, setShowNav] = useState(false); // State to toggle NavBar visibility

  // Determines if the NavBar should be displayed based on route and login status
  const checkNav = () => {
    const hideNavRoutes = ["/", "/Signup"]; // Routes where NavBar is hidden
    const isLoggedInLocal = !!localStorage.getItem("user"); // Check for login in localStorage
    const isLoggedInSession = !!sessionStorage.getItem("user"); // Check for login in sessionStorage

    // Hide NavBar if not logged in and not on allowed routes
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

  // Run checkNav whenever the route changes
  useEffect(() => {
    checkNav();
  }, [location]);

  return (
    <>
      {/* Conditionally render NavBar */}
      {showNav && <NavBar />}
      {/* Render child routes */}
      <Outlet />
    </>
  );
};

export default Layout;
