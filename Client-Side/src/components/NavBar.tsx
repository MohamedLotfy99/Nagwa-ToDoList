import { useLocation, useNavigate } from "react-router-dom";
import nagwaLogo from "../assets/nagwaLogo.png";
import WhiteButton from "../components/atoms/WhiteButton";

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user =
    location.state?.user || JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = () => {
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
    navigate("/", { replace: true });
  };

  return (
    <nav className="flex justify-between items-center px-6 min-w-[360px] py-4 bg-blue-600 text-white shadow-xl/30 ">
      <div
        className=" flex items-center gap-2 font-bold text-lg cursor-pointer "
        onClick={() => navigate("/Home", { state: { user } })}
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
  );
};

export default NavBar;
