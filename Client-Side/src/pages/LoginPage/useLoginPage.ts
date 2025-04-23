import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const useLoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const rememberedUser = localStorage.getItem("user");
    if (rememberedUser) {
      navigate("/Home", { state: { user: JSON.parse(rememberedUser) } });
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      
      if (res.ok) {
        sessionStorage.setItem("user", JSON.stringify(data.user));
        if (rememberMe) {
          localStorage.setItem("user", JSON.stringify(data.user));
        }
        navigate("/Home", { state: { user: data.user } }); // Pass user data to HomePage
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
