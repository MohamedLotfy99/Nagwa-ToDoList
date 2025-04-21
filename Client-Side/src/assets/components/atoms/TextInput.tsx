import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputProps {
  placeholder: string;
  value: string;
  type?: string;
  setValue: (val: string) => void;
}

const TextInput = ({ placeholder, value, type, setValue }: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="relative mb-4">
      <input
        type={isPassword ? (showPassword ? "password" : "text") : type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required
        className={`w-full px-3 py-2 border text-gray-500 border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          isPassword ? "pr-10" : ""
        }`}
      />
      {isPassword && (
        <div
          className="absolute bottom-6.5 right-3 flex items-center cursor-pointer text-gray-500"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </div>
      )}
    </div>
  );
};

export default TextInput;
