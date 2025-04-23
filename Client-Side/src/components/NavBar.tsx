import { useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import nagwaLogo from "../assets/nagwaLogo.png";
import { UserCircle2, LogOut } from "lucide-react";

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Tracks whether the dropdown menu is open
  const [menuOpen, setMenuOpen] = useState(false);

  // Reference to the menu container for click outside detection
  const menuRef = useRef<HTMLDivElement>(null);

  // Retrieve user from navigation state or localStorage fallback
  const user =
    location.state?.user || JSON.parse(localStorage.getItem("user") || "null");

  // Handles logout logic: clears user data and redirects to login page
  const handleLogout = () => {
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
    navigate("/", { replace: true });
  };

  // Closes the dropdown if a click happens outside of the menu
  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setMenuOpen(false);
    }
  };

  // Set up and clean up the click listener for outside menu clicks
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="flex justify-between items-center px-6 min-w-[360px] py-4 bg-blue-600 text-white shadow-xl/30">
      {/* Logo and app title - clicking navigates to home */}
      <div
        className="flex items-center gap-2 font-bold text-lg cursor-pointer"
        onClick={() => navigate("/Home", { state: { user } })}
      >
        <img src={nagwaLogo} alt="logo" className="w-12 h-12" />
        Nagwa ToDo List
      </div>

      {/* If user is logged in, show profile icon and dropdown menu */}
      {user && user.name && (
        <div className="relative" ref={menuRef}>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold">Welcome, {user.name}</span>
            {/* Profile icon - toggles dropdown on click */}
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="flex items-center gap-2 focus:outline-none cursor-pointer"
            >
              <UserCircle2 className="w-8 h-8" />
            </button>
          </div>

          {/* Dropdown menu with logout option */}
          {menuOpen && (
            <div className="absolute right-1 mt-2 bg-white text-black rounded shadow-lg w-32 z-10">
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 flex items-center gap-2 text-blue-600 hover:bg-gray-200 hover:rounded cursor-pointer"
              >
                <LogOut className="w-4 h-4 text-blue-600" /> Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
