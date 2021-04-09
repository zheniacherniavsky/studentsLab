import { useState, useEffect, SetStateAction } from "react";
// import debounce from "debounce";
import getData from "@/api/apiSearchData";
import getRecentlyAddedProducts from "@/api/apiGetTopProducts";
import Loading from "@/elements/loading";

// categories
import CardsContainer from "@/components/cards/cardsContainer";
// import Card from "@/Components/Cards/card";

import "@/components/pages/homePage/categories.scss";

import SearchInput from "@/elements/searchInput";
import Categories from "./categories";

const HomePage = () => {
  const [searchData, updateSearchData] = useState([]);
  const [searchDataVisibility, showSearchData] = useState(false);
  const [topProducts, loadTopProducts] = useState([]);

  const [searchValue, setSearchValue] = useState("");

  const [productsLoading, toggleProductsLoading] = useState(false);

  const topProductsCount = 3; // how much top product we want see on home page

  // FIXME: in useEffect i need cancel preload operation at unmounting

  useEffect(() => {
    const preload = async () => {
      toggleProductsLoading(true);
      loadTopProducts((await getRecentlyAddedProducts(topProductsCount)) as SetStateAction<never[]>);
      toggleProductsLoading(false);
    };

    preload();
  }, []);

  const loadProducts = async (search: string) => {
    updateSearchData(await getData(search));
    if (search !== "") showSearchData(true);
    else showSearchData(false);
  };

  return (
    <div className="homepage_container">
      <SearchInput value={searchValue} handleChange={setSearchValue} callback={loadProducts} showLoading />
      {searchDataVisibility ? <CardsContainer class="" title="Search results" data={searchData} /> : null}
      <Categories />
      {!productsLoading ? (
        <CardsContainer class="" title="Top products" data={topProducts} />
      ) : (
        <Loading hook className="loadingPage" />
      )}
    </div>
  );
};

export default HomePage;
