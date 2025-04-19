import { useLocation, useNavigate } from "react-router-dom";
import Label from "../atoms/Label";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state?.user; // Get user data from location state

  const handleLogout = () => {
    localStorage.removeItem("user"); // Remove token from local storage
    navigate("/"); // Pass user data to HomePage
  };
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
        {" "}
        Logout
      </button>
    </div>
  );
};

export default Home;
