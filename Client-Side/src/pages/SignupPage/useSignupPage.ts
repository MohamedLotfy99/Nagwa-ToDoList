import { useNavigate } from "react-router-dom";
import { useState } from "react";


const useSignupPage = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        const res = await fetch("http://localhost:5000/api/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });

        const data = await res.json();

        if (res.ok) {
          // Optional: navigate directly to login page after successful signup
          navigate("/");
        } else {
          setError(data.message);
        }
      } catch (err) {
        console.error(err);
        setError("Something went wrong.");
      }
    };
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
