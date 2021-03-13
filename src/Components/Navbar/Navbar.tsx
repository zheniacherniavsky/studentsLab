import { NavLink } from "react-router-dom";
import { useState } from "react";

import "@/style/navbar.scss";

function NavBar(props) {
  const [menuIsActive, toggleMenu] = useState(false);

  return (
    <div className="navbar_container">
      <div className="navbar_container__title">
        <p>{props.title}</p>
        <button type="button" className="toggle_menu_btn" onClick={() => toggleMenu(!menuIsActive)}>
          ☰
        </button>
      </div>
      <div className="navbar_container__navlinks">
        <ul className={menuIsActive ? "" : "hidden"}>
          <li>
            <NavLink exact to="/" activeClassName="active">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="products" activeClassName="active">
              Products
            </NavLink>
          </li>
          <li>
            <NavLink to="about" activeClassName="active">
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="signin" activeClassName="active">
              Sign In
            </NavLink>
          </li>
          <li>
            <NavLink to="signup" activeClassName="active">
              Sign Up
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default NavBar;
