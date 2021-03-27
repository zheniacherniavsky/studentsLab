import { FormEvent } from "react";

const Input = ({
  label,
  type,
  id,
  minLength,
  handleChange,
  value,
}: {
  label: string;
  type: string;
  id: string;
  minLength: number;
  handleChange: (event: FormEvent<HTMLInputElement>) => void;
  value: string;
}) => (
  <label htmlFor={id}>
    {label}
    <input
      type={type}
      id={id}
      className="modal_input"
      required
      minLength={minLength}
      onChange={handleChange}
      value={value}
    />
  </label>
);

export default Input;
