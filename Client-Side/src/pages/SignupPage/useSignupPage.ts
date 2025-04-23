import { useNavigate } from "react-router-dom";
import { useState } from "react";

const useSignupPage = () => {
  const navigate = useNavigate();

  // States for signup form fields and error handling
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Handles the form submission for user registration
  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      // Send a POST request to the backend to create a new user
      const res = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }), // Send user data as JSON
      });

      const data = await res.json(); // Parse the response data

      if (res.ok) {
        // If signup is successful, navigate to the login page
        navigate("/"); 
      } else {
        // Show any error message returned from the server
        setError(data.message);
      }
    } catch (err) {
      console.error(err);
      // Handle any unexpected errors
      setError("Something went wrong.");
    }
  };

  // Return all necessary state and handlers for the signup form
  return { 
    navigate,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    error,
    handleSignup,
  };   
}

export default useSignupPage;
