interface LabelProps {
  text: string;
}

const Label = ({ text }: LabelProps) => {
  return (
    <label className="block text-sm font-medium mb-1 text-black">{text} </label>
  );
};

export default Label;
