import { FormEvent } from "react";

interface TextInputProps {
  label: string;
  type: string;
  id: string;
  value: string;
  handleChange: React.Dispatch<React.SetStateAction<string>>;
  errorDispatch: React.Dispatch<React.SetStateAction<string>>;
}

const PasswordInput = (props: TextInputProps) => {
  const validate = (event: FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    props.handleChange(value);
    if (value.length < 6) {
      props.errorDispatch("Min length of password is 6 symbols!");
    } else {
      props.errorDispatch("");
    }
  };

  return (
    <label htmlFor={props.id}>
      <span>{props.label}</span>
      <input
        type={props.type}
        id={props.id}
        name="password"
        className={props.value.length < 6 ? "" : "trueValidation"}
        onChange={validate}
        value={props.value}
      />
    </label>
  );
};

export default PasswordInput;
