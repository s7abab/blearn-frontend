interface InputProps {
  type: string;
  name: string;
  value: string;
  placeholder?: string;
  inputStyle:string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomInput: React.FC<InputProps> = ({
  type,
  name,
  value,
  placeholder,
  onChange,
  inputStyle
}) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      className={inputStyle}
    />
  );
};

export default CustomInput;
