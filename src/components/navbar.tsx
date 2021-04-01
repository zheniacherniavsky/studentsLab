import { Link, NavLink, useHistory } from "react-router-dom";
import { useState } from "react";

import "./navbar.scss";
import useTypedSelector from "@/hooks/useTypedSelector";
import useActions from "@/hooks/useActions";

const NavBar = ({ title }: { title: string }) => {
  // Product drop down menu
  const [menuIsActive, toggleMenu] = useState(false);
  const [productsDropDownIsActive, togglePDD] = useState(false);

  // redux
  const { username } = useTypedSelector((state) => state.user);
  const redux = useActions();

  // routes
  const history = useHistory();
  const redirect = (path: string) => {
    history.push(path);
  };

  return (
    <div className="navbar_container">
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
                <button
                  type="button"
                  onClick={() => {
                    redux.showInfoModal("Exit", "Do you want to exit?", "prompt", () => {
                      redux.clearUsername(); // reduxClearUsername
                      redirect("/");
                    });
                  }}
                >
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
                    redux.toggleSignInModal(true);
                  }}
                >
                  <h3>Sign In</h3>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    redux.toggleSignUpModal(true);
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
