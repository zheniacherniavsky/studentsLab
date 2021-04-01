import { useState, useEffect, ChangeEvent, SetStateAction } from "react";
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
import "@/pages/pages.scss";

import Categories from "./categories";

const Loading = ({ hook }: { hook: boolean }) => {
  if (hook) {
    return <img src={loadingImage} alt="loading" />;
  }
  return null;
};

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

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value !== "")
      debounce(async () => {
        updateLoading(true);
        setTimeout(async () => {
          updateSearchData(await getData());
          updateLoading(false);
          showSearchData(true);
        }, 299);
      }, 300)();
    else showSearchData(false);
  };

  return (
    <div className="homepage_container">
      <div className="homepage_container__search">
        <Loading hook={loading} />
        <input onChange={handleChange} type="text" placeholder="Search" id="search_input" />
      </div>
      {searchDataVisibility ? <CardsContainer title="Search results" data={searchData} /> : null}
      <Categories />
      <CardsContainer title="Top products" data={topProducts} />
    </div>
  );
};
export default HomePage;
