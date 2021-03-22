import { NavLink, useHistory } from "react-router-dom";
import { useContext, useState } from "react";

import "@/Components/navbar.scss";
import Context from "@/api/context";

const NavBar = ({ title }) => {
  const [menuIsActive, toggleMenu] = useState(false);
  const [productsDropDownIsActive, togglePDD] = useState(false);

  const { toggleOnModal, username, setNickname } = useContext(Context);
  const history = useHistory();

  const redirect = (path) => {
    history.push(path);
  };

  return (
    <>
      <div className="navbar_container">
        <div className="navbar_container__title">
          <p>{title}</p>
          <button type="button" className="toggle_menu_btn" onClick={() => toggleMenu(!menuIsActive)}>
            ☰
          </button>
        </div>
        <div className="navbar_container__navlinks">
          <ul className={menuIsActive ? "" : "hidden"} onMouseLeave={() => toggleMenu(!menuIsActive)}>
            <li>
              <NavLink exact to="/" activeClassName="active">
                Home
              </NavLink>
            </li>
            <li>
              <button type="button" className="dropdownBtn" onClick={() => togglePDD(!productsDropDownIsActive)}>
                Products {productsDropDownIsActive ? "▴" : "▾"}
                {productsDropDownIsActive && (
                  <ul className={productsDropDownIsActive ? "dropdown visible" : "dropdown"}>
                    <li>
                      <NavLink exact to="/pc" activeClassName="active">
                        PC
                      </NavLink>
                    </li>
                    <li>
                      <NavLink exact to="/playstationfive" activeClassName="active">
                        Playstation 5
                      </NavLink>
                    </li>
                    <li>
                      <NavLink exact to="/xboxone" activeClassName="active">
                        XBox One
                      </NavLink>
                    </li>
                  </ul>
                )}
              </button>
            </li>
            <li>
              <NavLink to="about" activeClassName="active">
                About
              </NavLink>
            </li>
            {username ? (
              <>
                <li>
                  <button type="button">{username}</button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      setNickname(null);
                      redirect("/");
                    }}
                  >
                    Log out
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <button type="button" onClick={() => toggleOnModal("signin")}>
                    Sign In
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => toggleOnModal("signup")}>
                    Sign Up
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default NavBar;
