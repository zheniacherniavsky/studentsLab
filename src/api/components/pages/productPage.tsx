import "./productPage.scss";

export default function ProductPage() {
  return (
    <>
      <div className="products page_content_container">
        <div className="homepage_container__search">
          <input type="text" placeholder="Search" id="search_input" />
        </div>
      </div>
      <div className="menu page_content_container">
        <h2>Header</h2>
        <div className="options sort">
          <h3>Sort</h3>
          <label htmlFor="sortName">
            <span>Criteria:</span>
            <select id="sortName">
              <option value="name">Name</option>
              <option value="name">Rating</option>
              <option value="name">Price</option>
            </select>
          </label>
          <label htmlFor="sortType">
            <span>Type:</span>
            <select id="sortType">
              <option value="ascending">Ascending</option>
              <option value="descending">Descending</option>
            </select>
          </label>
        </div>

        <div className="options">
          <h3>Genres</h3>
          <label htmlFor="allGenre">
            <input name="genre" type="radio" id="allGenre" />
            <span>All</span>
          </label>
          <label htmlFor="shooter">
            <input name="genre" type="radio" id="shooter" />
            <span>Shooter</span>
          </label>
          <label htmlFor="arcade">
            <input name="genre" type="radio" id="arcade" />
            <span>Arcade</span>
          </label>
          <label htmlFor="survive">
            <input name="genre" type="radio" id="survive" />
            <span>Survive</span>
          </label>
        </div>

        <div className="options">
          <label htmlFor="allAge">
            <input name="age" type="radio" id="allAge" />
            <span>All</span>
          </label>
          <label htmlFor="moreThree">
            <input name="age" type="radio" id="moreThree" />
            <span>3+</span>
          </label>
          <label htmlFor="moreSix">
            <input name="age" type="radio" id="moreSix" />
            <span>6+</span>
          </label>
          <label htmlFor="moreTwelve">
            <input name="age" type="radio" id="moreTwelve" />
            <span>12+</span>
          </label>
          <label htmlFor="moreEighteen">
            <input name="age" type="radio" id="moreEighteen" />
            <span>18+</span>
          </label>
        </div>
      </div>
    </>
  );
}
