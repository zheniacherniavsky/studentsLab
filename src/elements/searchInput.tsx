import debounce from "@/helpers/debounce";
import Loading from "@/elements/loading";
import { FormEvent, useState } from "react";

import "./searchInput.scss";

type SearchInputPropsType = {
  value: string;
  handleChange: React.Dispatch<React.SetStateAction<string>>;
  callback: (search: string) => void;
  showLoading: boolean;
};

const SearchInput = ({ value, handleChange, callback, showLoading }: SearchInputPropsType) => {
  const [loading, toggleLoading] = useState(false);

  const handler = (e: FormEvent<HTMLInputElement>) => {
    toggleLoading(true);
    const { value } = e.currentTarget;
    handleChange(value);
    debounce(async () => {
      await callback(value);
      toggleLoading(false);
    }, 300);
  };

  return (
    <div className="search_input">
      {showLoading ? <Loading hook={loading} className="" /> : null}
      <input type="text" placeholder="Search" name="searchInput" value={value} onChange={handler} id="search_input" />
    </div>
  );
};

export default SearchInput;
