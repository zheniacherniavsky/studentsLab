import { Link, NavLink, useHistory } from "react-router-dom";
import { useState } from "react";

import "./navbar.scss";
import useTypedSelector from "@/helpers/hooks/useTypedSelector";
import useActions from "@/helpers/hooks/useActions";
import logoutImage from "@/assets/images/logout.png";
import shoppingCart from "@/assets/images/shopping-cart.png";
import profileImg from "@/assets/images/user.png";
import { InfoModal, InfoModalProps, InfoType } from "@/components/modal/infoModal";
import SignInModal from "@/components/modal/signInModal";
import SignUpModal from "@/components/modal/signUpModal";

const NavBar = ({ title }: { title: string }) => {
  // Product drop down menu
  const [menuIsActive, toggleMenu] = useState(false);
  const [productsDropDownIsActive, togglePDD] = useState(false);
  const [showSignInModal, toggleSignInModal] = useState(false);
  const [showSignUpModal, toggleSignUpModal] = useState(false);
  const [showInfoModal, toggleInfoModal] = useState(false);

  // redux
  const { username } = useTypedSelector((state) => state.user);
  const { count } = useTypedSelector((state) => state.cart);
  const redux = useActions();

  // routes
  const history = useHistory();
  const redirect = (path: string) => {
    history.push(path);
  };

  const InfoModalProps: InfoModalProps = {
    infoModalHeader: "Exit",
    infoModalText: "Do you want to exit?",
    infoModalType: InfoType.PROMPT,
    infoModalCallback: () => {
      redux.clearUsername();
      redirect("/");
    },
    closeInfoModalCallback: () => toggleInfoModal(false),
  };

  return (
    <div className="navbar_container">
      {showSignInModal ? (
        <SignInModal
          closeCallbackSuccess={() => toggleSignInModal(false)}
          closeCallback={() => toggleSignInModal(false)}
        />
      ) : null}
      {showSignUpModal ? <SignUpModal closeCallback={() => toggleSignUpModal(false)} /> : null}
      {showInfoModal ? <InfoModal {...InfoModalProps} /> : null}
      <div className="navbar_container__title">
        <Link to="/">
          <h1>{title}</h1>
        </Link>
        <button type="button" className="toggle_menu_btn" onClick={() => toggleMenu(!menuIsActive)}>
          ☰
        </button>
      </div>
      <div className="navbar_container__navlinks">
        <ul className={menuIsActive ? "" : "hidden"} onMouseLeave={() => toggleMenu(!menuIsActive)}>
          <li>
            <NavLink exact to="/" activeClassName="active">
              <h3>Home</h3>
            </NavLink>
          </li>
          <li>
            <button type="button" className="dropdownBtn" onClick={() => togglePDD(!productsDropDownIsActive)}>
              <h3>Products {productsDropDownIsActive ? "▴" : "▾"}</h3>
              {productsDropDownIsActive && (
                <ul className={productsDropDownIsActive ? "dropdown visible" : "dropdown"}>
                  <li>
                    <NavLink exact to="/products/pc" activeClassName="active">
                      <h3>PC</h3>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink exact to="/products/playstationfive" activeClassName="active">
                      <h3>Playstation 5</h3>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink exact to="/products/xboxone" activeClassName="active">
                      <h3>XBox One</h3>
                    </NavLink>
                  </li>
                </ul>
              )}
            </button>
          </li>
          <li>
            <NavLink to="/about" activeClassName="active">
              <h3>About</h3>
            </NavLink>
          </li>
          {username !== null ? (
            <>
              <li>
                <NavLink to="/profile" activeClassName="active" className="profileLink">
                  <div>
                    <img src={profileImg} alt="" />
                    <h3>{username}</h3>
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink to="/cart" activeClassName="active" className="shoppingCart">
                  <div>
                    <img src={shoppingCart} alt="Cart" />
                    <h3>{count}</h3>
                  </div>
                </NavLink>
              </li>
              <li>
                <button className="logoutImg" type="button" onClick={() => toggleInfoModal(true)}>
                  <img src={logoutImage} alt="Log out" />
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    toggleSignInModal(true);
                  }}
                >
                  <h3>Sign In</h3>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    toggleSignUpModal(true);
                  }}
                >
                  <h3>Sign Up</h3>
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
