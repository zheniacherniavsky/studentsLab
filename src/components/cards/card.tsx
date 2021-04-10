import "./card.scss";
import IProduct from "@/api/product";

import psPlatformImage from "@/assets/images/Platforms/ps.png";
import xboxPlatformImage from "@/assets/images/Platforms/xbox.png";
import pcPlatformImage from "@/assets/images/Platforms/pc.png";
import useActions from "@/helpers/hooks/useActions";
import useTypedSelector from "@/helpers/hooks/useTypedSelector";
import SignInModal from "@/components/modal/signInModal";
import { useState } from "react";

const Card = ({ product: p }: { product: IProduct }) => {
  const redux = useActions();
  const [showSignInModal, toggleSignInModal] = useState(false);

  const { username } = useTypedSelector((state) => state.user);

  const rating = [];
  for (let i = 1; i <= 5; i++) {
    rating.push(i <= p.rating ? <span key={p.name + i} className="active" /> : <span key={p.name + i} />);
  }

  return (
    <div className="card_container">
      {showSignInModal ? (
        <SignInModal
          closeCallback={() => {
            toggleSignInModal(false);
          }}
          closeCallbackSuccess={() => toggleSignInModal(false)}
        />
      ) : null}
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
          <button
            type="button"
            onClick={() => {
              if (username) redux.addProductToCart(p);
              else toggleSignInModal(true);
            }}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
