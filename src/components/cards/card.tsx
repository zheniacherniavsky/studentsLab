import "./card.scss";
import IProduct from "@/api/product.d";

import psPlatformImage from "@/assets/images/Platforms/ps.png";
import xboxPlatformImage from "@/assets/images/Platforms/xbox.png";
import pcPlatformImage from "@/assets/images/Platforms/pc.png";
import useActions from "@/helpers/hooks/useActions";
import useTypedSelector from "@/helpers/hooks/useTypedSelector";
import SignInModal from "@/components/modal/signInModal";
import { useState } from "react";
import EditCardModal from "../modal/editCardModal";

const Card = ({ product: p }: { product: IProduct }) => {
  const redux = useActions();
  const [showSignInModal, toggleSignInModal] = useState(false);
  const [editCardModal, toggleEditCardModal] = useState(false);

  const [inCardClassName, setInCardClassName] = useState("");

  const { username, isAdmin } = useTypedSelector((state) => state.user);
  const { willUpdate } = useTypedSelector((state) => state.products);

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
      {editCardModal ? (
        <EditCardModal
          closeCallback={() => {
            toggleEditCardModal(false);
          }}
          closeCallbackSuccess={() => {
            redux.updateProducts(!willUpdate);
            toggleEditCardModal(false);
          }}
          product={p}
        />
      ) : null}
      <div className={`front ${inCardClassName}`}>
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
      <div className={`back ${inCardClassName}`}>
        <p>{p.shortdescription}</p>
        <span>{p.age}+</span>
        <div className="buttons">
          {username && isAdmin ? (
            <>
              <button
                type="button"
                onClick={() => {
                  redux.addProductToCart(p);
                  setInCardClassName("inCart");
                  setTimeout(() => setInCardClassName(""), 399);
                }}
              >
                Add to cart
              </button>
              <button type="button" onClick={() => toggleEditCardModal(true)}>
                Edit
              </button>
            </>
          ) : null}
          {username && !isAdmin ? (
            <button
              type="button"
              onClick={() => {
                redux.addProductToCart(p);
                setInCardClassName("inCart");
                setTimeout(() => setInCardClassName(""), 399);
              }}
            >
              Add to cart
            </button>
          ) : null}
          {!username ? (
            <>
              <button
                type="button"
                onClick={() => {
                  toggleSignInModal(true);
                }}
              >
                Log in
              </button>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Card;
