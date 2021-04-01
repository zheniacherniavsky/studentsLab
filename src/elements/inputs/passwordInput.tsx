import { FormEvent } from "react";

interface TextInputProps {
  label: string;
  type: string;
  id: string;
  handleChange: (event: FormEvent<HTMLInputElement>) => void;
  value: string;
}

const PasswordInput = (props: TextInputProps) => (
  <label htmlFor={props.id}>
    <span>{props.label}</span>
    <input type={props.type} id={props.id} className="modal_input" onChange={props.handleChange} value={props.value} />
  </label>
);

export default PasswordInput;
