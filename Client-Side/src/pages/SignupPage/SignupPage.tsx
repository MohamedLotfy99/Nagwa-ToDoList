import TextInput from "../../components/atoms/TextInput";
import Label from "../../components/atoms/Label";

import useSignupPage from "./useSignupPage";

const SignupPage = () => {
  const {
    navigate,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    error,
    handleSignup,
  } = useSignupPage();

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
