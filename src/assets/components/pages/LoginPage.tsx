import TextInput from "../atoms/TextInput";
import Label from "../atoms/Label";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const rememberedUser = localStorage.getItem("user");
    if (rememberedUser) {
      navigate("/HomePage", { state: { user: JSON.parse(rememberedUser) } });
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
        if (rememberMe) {
          localStorage.setItem("user", JSON.stringify(data.user)); // Save token to local storage
        }
        navigate("/HomePage", { state: { user: data.user } }); // Pass user data to HomePage
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="flex items-center justify-center min-h-screen"
    >
      <div className="bg-white p-8 rounded-2xl shadow-md w-80 border-2 border-yellow-300">
        <h2 className="font-bold text-center mb-6 text-black">Login</h2>
        <Label text="Email:" />
        <TextInput
          placeholder="example@email.com"
          value={email}
          type="email"
          setValue={setEmail}
        />
        <div>
          <Label text="Password:" />
          <TextInput
            placeholder="Enter password"
            value={password}
            type="password"
            setValue={setPassword}
          />
        </div>

        <div className="flex items-center mb-4">
          <input
            id="remember"
            type="checkbox"
            className="mr-2 mb-0.5"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <Label text="Remember me" />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Login
        </button>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <div className="flex justify-center mt-4">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={() => navigate("/SignupPage")}
            >
              Sign up
            </span>
          </p>
        </div>
      </div>
    </form>
  );
};

export default LoginPage;
