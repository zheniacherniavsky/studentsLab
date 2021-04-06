import "./card.scss";
import IProduct from "@/api/product";

const Card = ({ product: p }: { product: IProduct }) => {
  const rating = [];
  for (let i = 1; i <= 5; i++) {
    rating.push(i <= p.rating ? <span className="active" /> : <span />);
  }

  return (
    <div className="card_container">
      <div className="front">
        <img src={p.image} alt="Product" />
        <div>
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
