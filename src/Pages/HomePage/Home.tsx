import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import debounce from "debounce";
import debounce from "@/api/debounse";
import getData from "@/api/search/searchData";
import getRecentlyAddedProducts from "@/api/getTopProducts";
import loadingImage from "@/assets/images/loading.svg";

// categories
import pcImage from "@/assets/images/Categories/computer.svg";
import playstationImage from "@/assets/images/Categories/playstation.svg";
import xboxImage from "@/assets/images/Categories/xbox.svg";
import CardsContainer from "@/Components/Cards/cardsContainer";
// import Card from "@/Components/Cards/card";

import "@/Pages/HomePage/homePage.scss";
import "@/Pages/HomePage/categories.scss";

const Loading = ({ hook }) => {
  if (hook) {
    return <img src={loadingImage} alt="loading" />;
  }
  return <></>;
};

const Category = ({ name, image }) => (
  <>
    <div className="category">
      <img src={image} alt="" />
      <p>{name}</p>
    </div>
  </>
);

const Categories = () => (
  <>
    <div className="categories_container">
      <h1>Categories</h1>
      <div className="categories_container__tiles">
        <Link to="/pc">
          <Category name="PC" image={pcImage} />
        </Link>
        <Link to="/playstationfive">
          <Category name="Playstation 5" image={playstationImage} />
        </Link>
        <Link to="/xboxone">
          <Category name="XBox One" image={xboxImage} />
        </Link>
      </div>
    </div>
  </>
);

const HomePage = () => {
  const [searchData, updateSearchData] = useState([]);
  const [topProducts, loadTopProducts] = useState([]);
  const [loading, updateLoading] = useState(false);

  const topProductsCount = 5; // how much top product we want see on home page

  useEffect(() => {
    const preload = async () => loadTopProducts(await getRecentlyAddedProducts(topProductsCount));

    preload();
  }, []);

  return (
    <>
      <div className="homepage_container">
        <div className="homepage_container__search">
          <Loading hook={loading} />
          <input
            onChange={debounce(async () => {
              updateLoading(true);
              updateSearchData(await getData());
              updateLoading(false);
            }, 300)}
            type="text"
            placeholder="Search"
            id="search_input"
          />
        </div>
        <CardsContainer type="search" data={searchData} />
        <Categories />
        <CardsContainer type="top" data={topProducts} count={topProductsCount} />
      </div>
    </>
  );
};
export default HomePage;
