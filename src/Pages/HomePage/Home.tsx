import { useState } from "react";
import backgroundImage from "@/assets/images/homeBackgroundImage.jpg";
import debounce from "debounce";
import getData from "@/api/search/searchData";
import loadingImage from "@/assets/images/loading.svg";

import "@/style/homePage.scss";

const Card = ({ product }) => (
  <>
    <div>
      <h1>{product.name}</h1>
    </div>
  </>
);

const HomePage = () => {
  const [searchData, updateSearchData] = useState([]);
  const [loading, updateLoading] = useState(false);

  return (
    <>
      <div className="background_image">
        <img src={backgroundImage} alt="" />
      </div>
      <div className="homepage_container">
        <div className="homepage_container__search">
          <input
            onChange={debounce(async () => {
              updateLoading(true); // refactor this
              updateSearchData(await getData());
              updateLoading(false);
            }, 200)}
            type="text"
            placeholder="Search"
            id="search_input"
          />
        </div>
        <div className="homepage_container__search_results">
          {loading ? (
            <div className="homepage_container__search_results__loading">
              <img src={loadingImage} alt="loading" />
            </div>
          ) : (
            ""
          )}
          {searchData !== [] ? (
            <div className="homepage_container__search_results__content">
              {searchData.map((item) => (
                <Card product={item} />
              ))}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};
export default HomePage;
