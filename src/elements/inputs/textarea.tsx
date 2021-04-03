import React, { FormEvent } from "react";

interface TextareaProps {
  label: string;
  id: string;
  value: string;
  maxLength: number;
  handleChange: React.Dispatch<React.SetStateAction<string>>;
  errorDispatch: React.Dispatch<React.SetStateAction<string>>;
}

const Textarea = (props: TextareaProps) => {
  const validate = (event: FormEvent<HTMLTextAreaElement>) => {
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
      <textarea
        id={props.id}
        className={props.value.length === props.maxLength ? "falseValidation" : ""}
        onChange={validate}
        value={props.value}
      />
    </label>
  );
};

export default Textarea;
