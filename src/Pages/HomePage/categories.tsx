import { Link } from "react-router-dom";

import pcImage from "@/assets/images/Categories/computer.svg";
import playstationImage from "@/assets/images/Categories/playstation.svg";
import xboxImage from "@/assets/images/Categories/xbox.svg";

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

export default Categories;
