import React, { FormEvent, useEffect, useRef } from "react";

interface TextInputProps {
  autofocus: boolean;
  label: string;
  type: string;
  id: string;
  value: string;
  handleChange: React.Dispatch<React.SetStateAction<string>>;
  errorDispatch: React.Dispatch<React.SetStateAction<string>>;
}

const LoginInput = (props: TextInputProps) => {
  const validate = (event: FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    props.handleChange(value);
    if (value.length < 6) {
      props.errorDispatch("Min length of login is 6 symbols!");
    } else {
      props.errorDispatch("");
    }
  };

  const inputElement = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputElement.current && props.autofocus) {
      inputElement.current.focus();
    }
  }, []);

  return (
    <label htmlFor={props.id}>
      <span>{props.label}</span>
      <input
        ref={inputElement}
        name="login"
        type={props.type}
        id={props.id}
        className={props.value.length < 6 ? "" : "trueValidation"}
        onChange={validate}
        value={props.value}
      />
    </label>
  );
};

export default LoginInput;
