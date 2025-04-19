import TextInput from "../atoms/TextInput";
import Label from "../atoms/Label";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const SignupPage = () => {
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

  return (
    <form
      onSubmit={handleSignup}
      className="flex items-center justify-center min-h-screen"
    >
      <div className="bg-white p-8 rounded-2xl shadow-md w-80 border-2 border-yellow-300">
        <h2 className="font-bold text-center mb-6 text-black">Sign Up</h2>

        <Label text="Name:" />
        <TextInput
          placeholder="John Doe"
          value={name}
          type="text"
          setValue={setName}
        />

        <Label text="Email:" />
        <TextInput
          placeholder="example@email.com"
          value={email}
          type="email"
          setValue={setEmail}
        />

        <Label text="Password:" />
        <TextInput
          placeholder="Create a password"
          value={password}
          type="password"
          setValue={setPassword}
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-200 mt-4"
        >
          Sign Up
        </button>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <div className="flex justify-center mt-4">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={() => navigate("/")}
            >
              Log in
            </span>
          </p>
        </div>
      </div>
    </form>
  );
};

export default SignupPage;
