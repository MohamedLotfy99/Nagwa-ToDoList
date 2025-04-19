import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Label from "../atoms/Label";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user =
    location.state?.user || JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = () => {
    localStorage.removeItem("user"); // Remove token from local storage
    navigate("/", { replace: true }); // Pass user data to HomePage
  };

  useEffect(() => {
    if (!user) {
      navigate("/", { replace: true });
    }
  }, [navigate, user]);

  if (!user) {
    return <p>Please Log in to access this page.</p>;
  }
  return (
    <div className="flex flex-col gap-2 items-center justify-center min-h-screen bg-gray-100">
      <Label text={`Welcome, ${user.name}`} />
      <button
        className="w-23 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
