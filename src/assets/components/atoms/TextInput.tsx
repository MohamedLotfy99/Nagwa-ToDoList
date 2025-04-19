interface InputProps {
  placeholder: string;
  value: string;
  type?: string;
  setValue: (val: string) => void;
}
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const TextInput = ({ placeholder, value, type, setValue }: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  return (
    <div className="relative">
      <input
        type={isPassword ? (showPassword ? "text" : "password") : type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required
        className="w-full"
      />
      {isPassword && (
        <div
          className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </div>
      )}
    </div>
  );
};

export default TextInput;
