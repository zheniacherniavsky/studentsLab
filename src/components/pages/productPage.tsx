import IProduct from "@/api/product.d";
import { BoxRadioInput } from "@/elements/inputs/radioInput";
import SelectInput from "@/elements/inputs/selectInput";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CardsContainer from "@/components/cards/cardsContainer";
import "./productPage.scss";
import Loading from "@/elements/loading";
import SearchInput from "@/elements/searchInput";
import useTypedSelector from "@/helpers/hooks/useTypedSelector";
import useActions from "@/helpers/hooks/useActions";
import { EditCardModal, EditCardType } from "../modal/editCardModal";

type MenuProps = {
  header: string;
  criteria: string;
  setCriteria: React.Dispatch<React.SetStateAction<string>>;
  type: string;
  setType: React.Dispatch<React.SetStateAction<string>>;
  setGenre: React.Dispatch<React.SetStateAction<string>>;
  setAge: React.Dispatch<React.SetStateAction<string>>;
};

class Menu extends React.PureComponent<MenuProps> {
  render() {
    return (
      <div className="menu page_content_container">
        <h2>{this.props.header}</h2>
        <div className="options sort">
          <h3>Sort</h3>
          <SelectInput
            header="Criteria"
            name="sortName"
            value={this.props.criteria}
            handleChange={(e) => this.props.setCriteria(e.currentTarget.value)}
            options={["Name", "Rating", "Price"]}
          />
          <SelectInput
            header="Type"
            name="sortType"
            value={this.props.type}
            handleChange={(e) => this.props.setType(e.currentTarget.value)}
            options={["Ascending", "Descending"]}
          />
        </div>

        <div className="options">
          <h3>Genres</h3>
          <BoxRadioInput
            groupName="genre"
            handleChange={(e) => this.props.setGenre(e.currentTarget.id)}
            titles={["All genres", "Shooter", "Arcade", "Survive"]}
          />
        </div>

        <div className="options">
          <h3>Age</h3>
          <BoxRadioInput
            groupName="age"
            handleChange={(e) => {
              const { id } = e.currentTarget;
              if (id === "all ages") this.props.setAge("0");
              else if (id.includes("+")) this.props.setAge(id.substring(0, id.length - 1));
            }}
            titles={["All ages", "3+", "6+", "12+", "18+"]}
          />
        </div>
      </div>
    );
  }
}

type ProductsType = {
  platform: string;
  criteria: string;
  type: string;
  genre: string;
  age: string;
};

const ProductsMemo = React.memo((p: ProductsType) => {
  const [productsLoading, toggleProductsLoading] = useState(false);
  const [searchName, setSearchName] = useState("");

  const redux = useActions();
  const { products } = useTypedSelector((state) => state.products);

  const { isAdmin } = useTypedSelector((state) => state.user);
  const loadProducts = (search: string) => {
    window.scrollTo(0, 0);
    redux.loadProducts(search, p.platform, p.criteria, p.type, p.genre, p.age, toggleProductsLoading);
  };

  useEffect(() => {
    redux.loadProducts(searchName, p.platform, p.criteria, p.type, p.genre, p.age, toggleProductsLoading);
  }, [p.age, p.criteria, p.type, p.genre]);

  const CardsContainerMemo = React.memo(CardsContainer);

  const [addNewCardModal, toggleAddNewCardModal] = useState(false);
  const [editCardModal, toggleEditCardModal] = useState(false);
  const [editProduct, setEditProduct] = useState<IProduct | undefined>();

  const emptyProduct = {
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
  };

  return (
    <>
      {editCardModal ? (
        <EditCardModal
          closeCallback={() => {
            toggleEditCardModal(false);
          }}
          closeCallbackSuccess={() => {
            redux.loadProducts(searchName, p.platform, p.criteria, p.type, p.genre, p.age, toggleProductsLoading);
            toggleEditCardModal(false);
          }}
          product={editProduct || emptyProduct}
          type={EditCardType.UPDATE}
        />
      ) : null}
      {addNewCardModal ? (
        <EditCardModal
          closeCallback={() => toggleAddNewCardModal(false)}
          closeCallbackSuccess={() => {
            loadProducts(searchName);
            toggleAddNewCardModal(false);
          }}
          product={emptyProduct}
          type={EditCardType.ADD}
        />
      ) : null}
      <div className="product">
        <div className="search_buttons">
          <SearchInput value={searchName} handleChange={setSearchName} callback={loadProducts} showLoading={false} />
          {isAdmin ? (
            <button type="button" onClick={() => toggleAddNewCardModal(true)}>
              Create card
            </button>
          ) : null}
        </div>
        {!productsLoading ? (
          <CardsContainerMemo
            class=""
            title="Products"
            data={products}
            toggleEditCardModal={toggleEditCardModal}
            setEditProduct={setEditProduct}
          />
        ) : (
          <Loading hook className="loadingPage" />
        )}
      </div>
    </>
  );
});

export default function ProductPage() {
  // sort params
  const { platform } = useParams<{ platform: string }>(); // taking platform from url
  const [header, setHeader] = useState("");
  const [criteria, setCriteria] = useState("name");
  const [type, setType] = useState("ascending");
  const [genre, setGenre] = useState("all genres");
  const [age, setAge] = useState("0");

  useEffect(() => {
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
  }, [platform]); // dependencies

  return (
    <>
      <Menu
        header={header}
        criteria={criteria}
        setCriteria={setCriteria}
        type={type}
        setType={setType}
        setGenre={setGenre}
        setAge={setAge}
      />
      <ProductsMemo platform={platform} criteria={criteria} type={type} genre={genre} age={age} />
    </>
  );
}
