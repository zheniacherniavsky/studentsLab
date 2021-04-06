import getProducts from "@/api/apiGetProducts";
import IProduct from "@/api/product";
import { BoxRadioInput } from "@/elements/inputs/radioInput";
import SelectInput from "@/elements/inputs/selectInput";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import CardsContainer from "@/components/cards/cardsContainer";
import "./productPage.scss";
import { Loading } from "@/components/pages/homePage/home";
import debounce from "@/helpers/debounce";

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

  const [products, updateProducts] = useState<IProduct[]>([]);
  const [loading, toggleLoading] = useState(false);

  // sort params
  const [searchName, setSearchName] = useState("");
  const [criteria, setCriteria] = useState("name");
  const [type, setType] = useState("ascending");
  const [genre, setGenre] = useState("all genres");
  const [age, setAge] = useState("0");

  const loadProducts = (search: string) => {
    getProducts(search, criteria, type, genre, age).then((result: IProduct[]) => {
      updateProducts(result);
    });
  };

  useEffect(() => {
    loadProducts(searchName);
  }, []);

  const handleChange = (event: FormEvent<HTMLSelectElement> | FormEvent<HTMLInputElement>) => {
    const { name, value, id } = event.currentTarget;

    switch (name) {
      case "searchInput":
        setSearchName(value);
        break;
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
        if (id === "all ages") setAge("0");
        else if (id.includes("+")) setAge(id.substring(0, id.length - 1));
        break;
      default:
        console.warn("productPage.tsx default case!");
        break;
    }
  };

  const handleSearch = async (event: ChangeEvent<HTMLInputElement>) => {
    setSearchName(event.target.value);
    toggleLoading(true);
    debounce(() => {
      loadProducts(event.target.value);
      toggleLoading(false);
    }, 300)();
  };

  return (
    <>
      <div className="product">
        <div className="homepage_container__search">
          <Loading hook={loading} />
          <input
            type="text"
            placeholder="Search"
            name="searchInput"
            value={searchName}
            onChange={handleSearch}
            id="search_input"
          />
        </div>
        <CardsContainer class="" title="Products" data={products} />
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
            titles={["All genres", "Shooter", "Arcade", "Survive"]}
          />
        </div>

        <div className="options">
          <h3>Age</h3>
          <BoxRadioInput groupName="age" handleChange={handleChange} titles={["All ages", "3+", "6+", "12+", "18+"]} />
        </div>
        <div className="searchButton">
          <button type="button" onClick={() => loadProducts(searchName)}>
            Search
          </button>
        </div>
      </div>
    </>
  );
}
