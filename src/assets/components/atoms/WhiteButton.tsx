interface WhiteButtonProps {
  onClick: () => void;
  value: string;
}

const WhiteButton = ({ onClick, value }: WhiteButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="bg-white text-blue-600 px-3 py-1 rounded-md hover:bg-gray-100 transition cursor-pointer"
    >
      {value}
    </button>
  );
};

export default WhiteButton;
