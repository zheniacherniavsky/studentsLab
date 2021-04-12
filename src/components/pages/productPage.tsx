import getProducts from "@/api/apiGetProducts";
import IProduct from "@/api/product.d";
import { BoxRadioInput } from "@/elements/inputs/radioInput";
import SelectInput from "@/elements/inputs/selectInput";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CardsContainer from "@/components/cards/cardsContainer";
import "./productPage.scss";
import Loading from "@/elements/loading";
import SearchInput from "@/elements/searchInput";
import useTypedSelector from "@/helpers/hooks/useTypedSelector";
import useActions from "@/helpers/hooks/useActions";
import { EditCardModal, EditCardType } from "../modal/editCardModal";

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
  const [productsLoading, toggleProductsLoading] = useState(false);

  const redux = useActions();
  const { isAdmin } = useTypedSelector((state) => state.user);
  const { willUpdate } = useTypedSelector((state) => state.products);

  const [editCardModal, toggleEditCardModal] = useState(false);

  const loadProducts = (search: string) => {
    toggleProductsLoading(true);
    getProducts(search, platform, criteria, type, genre, age).then((result: IProduct[]) => {
      updateProducts(result);
      toggleProductsLoading(false);
    });
  };

  useEffect(() => {
    updateProducts([]);
    loadProducts(searchName);
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
  }, [platform, criteria, type, genre, age, willUpdate]); // dependencies

  return (
    <>
      {editCardModal ? (
        <EditCardModal
          closeCallback={() => toggleEditCardModal(false)}
          closeCallbackSuccess={() => {
            redux.updateProducts(!willUpdate);
            toggleEditCardModal(false);
          }}
          product={{
            id: -1,
            name: "",
            shortdescription: "",
            category: "",
            date: "",
            image: "",
            age: 0,
            platform: [],
            price: 0,
            rating: 5, // Rating should be based on purchases. It will not be implemented in this lab.
          }}
          type={EditCardType.ADD}
        />
      ) : null}
      <div className="menu page_content_container">
        <h2>{header}</h2>
        <div className="options sort">
          <h3>Sort</h3>
          <SelectInput
            header="Criteria"
            name="sortName"
            value={criteria}
            handleChange={(e) => setCriteria(e.currentTarget.value)}
            options={["Name", "Rating", "Price"]}
          />
          <SelectInput
            header="Type"
            name="sortType"
            value={type}
            handleChange={(e) => setType(e.currentTarget.value)}
            options={["Ascending", "Descending"]}
          />
        </div>

        <div className="options">
          <h3>Genres</h3>
          <BoxRadioInput
            groupName="genre"
            handleChange={(e) => setGenre(e.currentTarget.id)}
            titles={["All genres", "Shooter", "Arcade", "Survive"]}
          />
        </div>

        <div className="options">
          <h3>Age</h3>
          <BoxRadioInput
            groupName="age"
            handleChange={(e) => {
              const { id } = e.currentTarget;
              if (id === "all ages") setAge("0");
              else if (id.includes("+")) setAge(id.substring(0, id.length - 1));
            }}
            titles={["All ages", "3+", "6+", "12+", "18+"]}
          />
        </div>
      </div>
      <div className="product">
        <div className="search_buttons">
          <SearchInput value={searchName} handleChange={setSearchName} callback={loadProducts} showLoading={false} />
          {isAdmin ? (
            <button type="button" onClick={() => toggleEditCardModal(true)}>
              Create card
            </button>
          ) : null}
        </div>
        {!productsLoading ? (
          <CardsContainer class="" title="Products" data={products} />
        ) : (
          <Loading hook className="loadingPage" />
        )}
      </div>
    </>
  );
}
