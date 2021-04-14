import { Link } from "react-router-dom";

import pcImage from "@/assets/images/Categories/computer.svg";
import playstationImage from "@/assets/images/Categories/playstation.svg";
import xboxImage from "@/assets/images/Categories/xbox.svg";
import React from "react";

const Category = ({ name, image }: { name: string; image: string }) => (
  <div className="category">
    <img src={image} alt="" />
    <span>{name}</span>
  </div>
);

class Categories extends React.PureComponent {
  render() {
    return (
      <div className="categories_container page_content_container">
        <h2>Categories</h2>
        <div className="tiles">
          <Link to="/products/pc">
            <Category name="PC" image={pcImage} />
          </Link>
          <Link to="/products/playstationfive">
            <Category name="Playstation 5" image={playstationImage} />
          </Link>
          <Link to="/products/xboxone">
            <Category name="XBox One" image={xboxImage} />
          </Link>
        </div>
      </div>
    );
  }
}
export default Categories;
