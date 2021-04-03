import { Link, NavLink, useHistory } from "react-router-dom";
import { useState } from "react";

import "./navbar.scss";
import useTypedSelector from "@/hooks/useTypedSelector";
import useActions from "@/hooks/useActions";
import SignInModal from "./modal/signInModal";
import SignUpModal from "./modal/signUpModal";
import { InfoModal, InfoModalProps, InfoType } from "./modal/infoModal";

const NavBar = ({ title }: { title: string }) => {
  // Product drop down menu
  const [menuIsActive, toggleMenu] = useState(false);
  const [productsDropDownIsActive, togglePDD] = useState(false);
  const [showSignInModal, toggleSignInModal] = useState(false);
  const [showSignUpModal, toggleSignUpModal] = useState(false);
  const [showInfoModal, toggleInfoModal] = useState(false);

  // redux
  const { username } = useTypedSelector((state) => state.user);
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
                    <NavLink exact to="/pc" activeClassName="active">
                      <h3>PC</h3>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink exact to="/playstationfive" activeClassName="active">
                      <h3>Playstation 5</h3>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink exact to="/xboxone" activeClassName="active">
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
                <NavLink to="/profile" activeClassName="active">
                  <h3>{username}</h3>
                </NavLink>
              </li>
              <li>
                <button type="button" onClick={() => toggleInfoModal(true)}>
                  <h3>Log out</h3>
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
