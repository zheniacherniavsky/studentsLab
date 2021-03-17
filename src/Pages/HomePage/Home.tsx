import { useState } from "react";
// import debounce from "debounce";
import debounce from "@/api/debounse";
import getData from "@/api/search/searchData";
import loadingImage from "@/assets/images/loading.svg";

// categories
import pcImage from "@/assets/images/Categories/computer.svg";
import playstationImage from "@/assets/images/Categories/playstation.svg";
import xboxImage from "@/assets/images/Categories/xbox.svg";
import Card from "./card";

import "@/Pages/HomePage/homePage.scss";
import "@/Pages/HomePage/categories.scss";

const Loading = ({ hook }) => {
  if (hook) {
    return <img src={loadingImage} alt="loading" />;
  }
  return <></>;
};

const SearchResults = ({ data }) => {
  if (data.length !== 0)
    return (
      <div className="homepage_container__search_results">
        <h1 className="homepage_container__search_results__title">Search results</h1>
        <div className="homepage_container__search_results__content">
          {data.map((item) => (
            <Card product={item} />
          ))}
        </div>
      </div>
    );
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
        <Category name="PC" image={pcImage} />
        <Category name="Playstation 5" image={playstationImage} />
        <Category name="XBox One" image={xboxImage} />
      </div>
    </div>
  </>
);

const HomePage = () => {
  const [searchData, updateSearchData] = useState([]);
  const [loading, updateLoading] = useState(false);

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
        <SearchResults data={searchData} />
        <Categories />
      </div>
    </>
  );
};
export default HomePage;
