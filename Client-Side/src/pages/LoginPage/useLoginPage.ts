import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const useLoginPage = () => {
  const navigate = useNavigate();

  // States for form fields and error handling
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Auto-redirect if a user is remembered in localStorage
    const rememberedUser = localStorage.getItem("user");
    if (rememberedUser) {
      navigate("/Home", { state: { user: JSON.parse(rememberedUser) } });
    }
  }, [navigate]);

  // Handles form submission for login
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      // Send login request to backend
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json(); // Parse JSON response

      if (res.ok) {
        // Store user session data in sessionStorage
        sessionStorage.setItem("user", JSON.stringify(data.user));

        // If "Remember Me" is checked, store in localStorage as well
        if (rememberMe) {
          localStorage.setItem("user", JSON.stringify(data.user));
        }

        // Navigate to the Home page with user data
        navigate("/Home", { state: { user: data.user } });
      } else {
        setError(data.message); // Show server error message
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong."); // Fallback error message
    }
  };

  // Return all necessary state and handlers for the login form
  return { 
    navigate,
    email,
    setEmail,
    password,
    setPassword,
    rememberMe,
    setRememberMe,
    error,
    handleLogin,
  };
}

export default useLoginPage;
