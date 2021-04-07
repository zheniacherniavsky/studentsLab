import "./card.scss";
import IProduct from "@/api/product";

import psPlatformImage from "@/assets/images/Platforms/ps.png";
import xboxPlatformImage from "@/assets/images/Platforms/xbox.png";
import pcPlatformImage from "@/assets/images/Platforms/pc.png";

const Card = ({ product: p }: { product: IProduct }) => {
  const rating = [];
  for (let i = 1; i <= 5; i++) {
    rating.push(i <= p.rating ? <span key={p.name + i} className="active" /> : <span key={p.name + i} />);
  }

  return (
    <div className="card_container">
      <div className="front">
        <img src={p.image} alt="Product" />
        <div className="platforms">
          {p.platform.includes("pc") ? <img src={pcPlatformImage} alt="PC" /> : null}
          {p.platform.includes("playstationfive") ? <img src={psPlatformImage} alt="Playstation" /> : null}
          {p.platform.includes("xboxone") ? <img src={xboxPlatformImage} alt="XBox" /> : null}
        </div>
        <div className="info">
          <span className="title">{p.name}</span>
          <span className="ageLimit">{p.price}$</span>
        </div>
        <div className="rating">{rating}</div>
      </div>
      <div className="back">
        <p>{p.shortdescription}</p>
        <div>
          <span>{p.age}+</span>
          <button type="button">Show game</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
