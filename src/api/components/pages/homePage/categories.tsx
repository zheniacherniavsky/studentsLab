import { Link } from "react-router-dom";

import pcImage from "@/api/assets/images/Categories/computer.svg";
import playstationImage from "@/api/assets/images/Categories/playstation.svg";
import xboxImage from "@/api/assets/images/Categories/xbox.svg";

const Category = ({ name, image }: { name: string; image: string }) => (
  <div className="category">
    <img src={image} alt="" />
    <span>{name}</span>
  </div>
);

const Categories = () => (
  <div className="categories_container page_content_container">
    <h2>Categories</h2>
    <div className="tiles">
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
);

export default Categories;
