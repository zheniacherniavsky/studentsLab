import { BoxRadioInput } from "@/elements/inputs/radioInput";
import SelectInput from "@/elements/inputs/selectInput";
import { FormEvent, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import "./productPage.scss";

export default function ProductPage() {
  const { platform } = useParams<{ platform: string }>(); // taking platform from url

  // setting header by platform
  let header;
  switch (platform) {
    case "playstationfive":
      header = "PlayStation 5";
      break;
    case "pc":
      header = "PC";
      break;
    case "xboxone":
      header = "XBox One";
      break;
    default:
      console.warn("You dont have this url param on product url. Configure switch case in ProductPage.tsx");
      useHistory().push("/products/pc");
      break;
  }

  // sort params
  const [criteria, setCriteria] = useState("name");
  const [type, setType] = useState("ascending");
  const [genre, setGenre] = useState("all");
  const [age, setAge] = useState("all");

  const handleChange = (event: FormEvent<HTMLSelectElement> | FormEvent<HTMLInputElement>) => {
    const { name, value, id } = event.currentTarget;

    switch (name) {
      case "sortName":
        setCriteria(value);
        break;
      case "sortType":
        setType(value);
        break;
      case "genre":
        setGenre(id); // id cause it's radio button
        break;
      case "age":
        setAge(id);
        break;
      default:
        console.warn("productPage.tsx defaul case!");
        break;
    }
  };

  return (
    <>
      <div className="products page_content_container">
        <div className="homepage_container__search">
          <input type="text" placeholder="Search" id="search_input" />
        </div>
      </div>
      <div className="menu page_content_container">
        <h2>{header}</h2>
        <div className="options sort">
          <h3>Sort</h3>
          <SelectInput
            header="Criteria"
            name="sortName"
            value={criteria}
            handleChange={handleChange}
            options={["Name", "Rating", "Price"]}
          />
          <SelectInput
            header="Type"
            name="sortType"
            value={type}
            handleChange={handleChange}
            options={["Ascending", "Descending"]}
          />
        </div>

        <div className="options">
          <h3>Genres</h3>
          <BoxRadioInput
            groupName="genre"
            handleChange={handleChange}
            titles={["All", "Shooter", "Arcade", "Survive"]}
          />
        </div>

        <div className="options">
          <h3>Age</h3>
          <BoxRadioInput groupName="age" handleChange={handleChange} titles={["All", "3+", "6+", "12+", "18+"]} />
        </div>
      </div>
    </>
  );
}
