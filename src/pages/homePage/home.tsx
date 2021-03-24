import { useState, useEffect } from "react";
// import debounce from "debounce";
import debounce from "@/api/debounse";
import getData from "@/api/apiSearchData";
import getRecentlyAddedProducts from "@/api/getTopProducts";
import loadingImage from "@/assets/images/loading.svg";

// categories
import CardsContainer from "@/components/cards/cardsContainer";
// import Card from "@/Components/Cards/card";

import "@/pages/homePage/home.scss";
import "@/pages/homePage/categories.scss";
import Categories from "./categories";

const Loading = ({ hook }: { hook: boolean }) => {
  if (hook) {
    return <img src={loadingImage} alt="loading" />;
  }
  return null;
};

const HomePage = () => {
  const [searchData, updateSearchData] = useState([]);
  const [topProducts, loadTopProducts] = useState([]);
  const [loading, updateLoading] = useState(false);

  const topProductsCount = 5; // how much top product we want see on home page

  useEffect(() => {
    const preload = async () => loadTopProducts((await getRecentlyAddedProducts(topProductsCount)) as never[]); // ?

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
