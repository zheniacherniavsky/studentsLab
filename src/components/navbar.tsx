import { NavLink, useHistory } from "react-router-dom";
import { useContext, useState } from "react";

import "@/components/navbar.scss";
import Context from "@/api/context";
import IContextType from "@/api/context.d";

import Swal from "sweetalert2/src/sweetalert2";
import { SweetAlertResult } from "sweetalert2";

const NavBar = ({ title }: { title: string }) => {
  const [menuIsActive, toggleMenu] = useState(false);
  const [productsDropDownIsActive, togglePDD] = useState(false);

  const { toggleSignInModal, toggleSignUpModal, username, setNickname } = useContext<Partial<IContextType>>(Context);

  const history = useHistory();

  const redirect = (path: string) => {
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
              <NavLink to="/about" activeClassName="active">
                About
              </NavLink>
            </li>
            {username ? (
              <>
                <li>
                  <NavLink to="/profile" activeClassName="active">
                    {username}
                  </NavLink>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      Swal.fire({
                        title: "Do you want to exit?",
                        showDenyButton: true,
                        confirmButtonText: `Yes`,
                        icon: "question",
                      }).then((result: SweetAlertResult) => {
                        if (result.isConfirmed) {
                          if (setNickname) setNickname(undefined);
                          redirect("/");
                        }
                      });
                    }}
                  >
                    Log out
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      if (toggleSignInModal) toggleSignInModal(true);
                    }}
                  >
                    Sign In
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      if (toggleSignUpModal) toggleSignUpModal(true);
                    }}
                  >
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
