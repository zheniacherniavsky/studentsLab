import "@/Components/Cards/card.scss";
import IProduct from "@/api/product";

const Card = ({ product: p }: { product: IProduct }) => (
  <div className="card_container">
    <div className="front">
      <img className="card_container__image" src={p.image} alt="productImage" />

      <div className="card_container__frontinfo">
        <p className="card_container__frontinfo_title">{p.name}</p>
        <p className="card_container__frontinfo_age">
          <span>{p.age}+</span>
        </p>
      </div>
    </div>
    <div className="back">
      <div className="card_container__shortdescription">{p.shortdescription}</div>
      <div className="card_container__backinfo">
        <p className="card_container__backinfo_price">
          Price: <span>{p.price}</span>
        </p>
        <button type="button" className="card_container__backinfo_btn">
          Show game
        </button>
      </div>
    </div>
  </div>
);

export default Card;
