import React, { FormEvent } from "react";

interface TextInputProps {
  label: string;
  id: string;
  value: string;
  maxLength: number;
  handleChange: React.Dispatch<React.SetStateAction<string>>;
  errorDispatch: React.Dispatch<React.SetStateAction<string>>;
}

const TextInput = (props: TextInputProps) => {
  const validate = (event: FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    if (value.length > props.maxLength) {
      props.errorDispatch(`Max length of ${props.label} is ${props.maxLength} symbols!`);
      return;
    }
    props.errorDispatch("");
    props.handleChange(value);
  };

  return (
    <label htmlFor={props.id}>
      <span>{props.label}</span>
      <input
        id={props.id}
        type="text"
        className={props.value.length === props.maxLength ? "falseValidation" : ""}
        onChange={validate}
        value={props.value}
      />
    </label>
  );
};

export default TextInput;
