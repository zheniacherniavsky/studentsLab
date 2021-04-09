import { useState, useEffect, ChangeEvent, SetStateAction } from "react";
// import debounce from "debounce";
import debounce from "@/helpers/debounce";
import getData from "@/api/apiSearchData";
import getRecentlyAddedProducts from "@/api/apiGetTopProducts";
import Loading from "@/elements/loading";

// categories
import CardsContainer from "@/components/cards/cardsContainer";
// import Card from "@/Components/Cards/card";

import "@/components/pages/homePage/home.scss";
import "@/components/pages/homePage/categories.scss";

import Categories from "./categories";

const HomePage = () => {
  const [searchData, updateSearchData] = useState([]);
  const [searchDataVisibility, showSearchData] = useState(false);
  const [topProducts, loadTopProducts] = useState([]);
  const [loading, updateLoading] = useState(false);

  const topProductsCount = 4; // how much top product we want see on home page

  useEffect(() => {
    const preload = async () =>
      loadTopProducts((await getRecentlyAddedProducts(topProductsCount)) as SetStateAction<never[]>);

    preload();
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    showSearchData(false);
    if (event.target.value !== "") {
      updateLoading(true);
      debounce(async () => {
        updateSearchData(await getData());
        updateLoading(false);
        if (event.target.value !== "") showSearchData(true);
      }, 300)();
    }
  };

  return (
    <div className="homepage_container">
      <div className="homepage_container__search">
        <Loading hook={loading} className="" />
        <input onChange={handleChange} type="text" placeholder="Search" id="search_input" />
      </div>
      {searchDataVisibility ? <CardsContainer class="" title="Search results" data={searchData} /> : null}
      <Categories />
      <CardsContainer class="" title="Top products" data={topProducts} />
    </div>
  );
};

export default HomePage;
