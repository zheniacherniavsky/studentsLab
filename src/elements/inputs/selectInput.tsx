import { FormEvent } from "react";

interface SelectInputProps {
  header: string;
  name: string;
  value: string;
  handleChange: (event: FormEvent<HTMLSelectElement>) => void;
  options: Array<string>;
}

export default function SelectInput(p: SelectInputProps) {
  const optionsList = p.options.map((value) => (
    <option key={value} value={value.toLowerCase()}>
      {value}
    </option>
  ));

  return (
    <label htmlFor={p.name}>
      <span>{p.header}</span>
      <select name={p.name} value={p.value} onChange={p.handleChange} id={p.name}>
        {optionsList}
      </select>
    </label>
  );
}
