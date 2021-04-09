import { FormEvent } from "react";

type RadioInputProps = {
  title: string;
  groupName: string;
  handleChange: (event: FormEvent<HTMLInputElement>) => void;
};

export const RadioInput = (p: RadioInputProps) => {
  const id = p.title.toLowerCase();
  return (
    <label htmlFor={id}>
      <input name={p.groupName} onChange={p.handleChange} type="radio" id={id} />
      <span>{p.title}</span>
    </label>
  );
};

type BoxRadioInputProps = {
  titles: Array<string>;
  groupName: string;
  handleChange: (event: FormEvent<HTMLInputElement>) => void;
};

export const BoxRadioInput = (p: BoxRadioInputProps) => {
  const buttons = p.titles.map((value) => {
    const id = value.toLowerCase();
    return (
      <label key={id} htmlFor={id}>
        <input name={p.groupName} onChange={p.handleChange} type="radio" id={id} />
        <span>{value}</span>
      </label>
    );
  });

  return <>{buttons}</>;
};
