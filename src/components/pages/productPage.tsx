import getProducts from "@/api/apiGetProducts";
import IProduct from "@/api/product";
import { BoxRadioInput } from "@/elements/inputs/radioInput";
import SelectInput from "@/elements/inputs/selectInput";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CardsContainer from "@/components/cards/cardsContainer";
import "./productPage.scss";
import Loading from "@/elements/loading";
import debounce from "@/helpers/debounce";

export default function ProductPage() {
  // sort params
  const { platform } = useParams<{ platform: string }>(); // taking platform from url
  const [header, setHeader] = useState("");
  const [searchName, setSearchName] = useState("");
  const [criteria, setCriteria] = useState("name");
  const [type, setType] = useState("ascending");
  const [genre, setGenre] = useState("all genres");
  const [age, setAge] = useState("0");

  const [products, updateProducts] = useState<IProduct[]>([]);

  const loadProducts = (search: string, platform: string) => {
    console.log("UPDATED PRODUCTS");
    getProducts(search, platform, criteria, type, genre, age).then((result: IProduct[]) => {
      updateProducts(result);
    });
  };

  const [loading, toggleLoading] = useState(false);

  useEffect(() => {
    loadProducts(searchName, platform);
    switch (platform) {
      case "pc":
        setHeader("PC");
        break;
      case "playstationfive":
        setHeader("Playstation 5");
        break;
      case "xboxone":
        setHeader("XBox One");
        break;
      default:
        console.error(`${platform} url param is not exist.`);
        break;
    }
  }, [platform, criteria, type, genre, age]); // dependencies

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchName(event.target.value);
    toggleLoading(true);
    debounce(() => {
      loadProducts(event.target.value, platform);
      toggleLoading(false);
    }, 300)();
  };

  return (
    <>
      <div className="menu page_content_container">
        <h2>{header}</h2>
        <div className="options sort">
          <h3>Sort</h3>
          <SelectInput
            header="Criteria"
            name="sortName"
            value={criteria}
            handleChange={(e: FormEvent<HTMLSelectElement>) => setCriteria(e.currentTarget.value)}
            options={["Name", "Rating", "Price"]}
          />
          <SelectInput
            header="Type"
            name="sortType"
            value={type}
            handleChange={(e: FormEvent<HTMLSelectElement>) => setType(e.currentTarget.value)}
            options={["Ascending", "Descending"]}
          />
        </div>

        <div className="options">
          <h3>Genres</h3>
          <BoxRadioInput
            groupName="genre"
            handleChange={(e: FormEvent<HTMLInputElement>) => setGenre(e.currentTarget.id)}
            titles={["All genres", "Shooter", "Arcade", "Survive"]}
          />
        </div>

        <div className="options">
          <h3>Age</h3>
          <BoxRadioInput
            groupName="age"
            handleChange={(e: FormEvent<HTMLInputElement>) => {
              const { id } = e.currentTarget;
              if (id === "all ages") setAge("0");
              else if (id.includes("+")) setAge(id.substring(0, id.length - 1));
            }}
            titles={["All ages", "3+", "6+", "12+", "18+"]}
          />
        </div>
      </div>
      <div className="product">
        <div className="homepage_container__search">
          <Loading hook={loading} className="" />
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
    </>
  );
}
