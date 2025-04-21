import { Outlet, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar";

const Layout = () => {
  const location = useLocation();
  const hideNavRoutes = ["/", "/SignupPage"];
  const isLoggedIn = !!localStorage.getItem("user");
  const shouldShowNav =
    !isLoggedIn && !hideNavRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowNav && <NavBar />}

      <Outlet />
    </>
  );
};

export default Layout;
