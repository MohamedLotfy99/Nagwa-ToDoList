import TextInput from "../../components/atoms/TextInput";
import Label from "../../components/atoms/Label";
import useLoginPage from "./useLoginPage";

const LoginPage = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    rememberMe,
    setRememberMe,
    error,
    handleLogin,
    navigate,
  } = useLoginPage(); // Assuming you have a custom hook for login logic

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
