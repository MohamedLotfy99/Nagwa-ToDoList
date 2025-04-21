import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import nagwaLogo from "../assets/nagwaLogo.png";
import WhiteButton from "../components/atoms/WhiteButton";

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user =
    location.state?.user || JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    if (!user) {
      try {
        console.log(`${user.name}`);
      } catch (err) {
        console.error("Error parsing stored user", err);
      }
    }
  }, [navigate, user]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/", { replace: true });
  };

  return (
    console.log(user),
    (
      <nav className="flex justify-between items-center px-6 py-4 bg-blue-600 text-white shadow-md">
        <div
          className=" flex items-center gap-2 font-bold text-lg "
          onClick={() => navigate("/HomePage", { state: { user } })}
        >
          <img src={nagwaLogo} alt="logo" className="w-12 h-12"></img>
          Nagwa ToDo List
        </div>

        {user && user.name && (
          <div className="flex items-center gap-4">
            <span>Welcome, {user.name}</span>
            <WhiteButton onClick={handleLogout} value="Logout" />
          </div>
        )}
      </nav>
    )
  );
};

export default NavBar;
