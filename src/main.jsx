// eslint-disable-next-line no-use-before-define
import React from "react";
import ReactDom from "react-dom";
import Title from "./Components/Navbar/Title";
import "./style/styles.css";
import "./style/navbar.css";
import NavLink from "./Components/Navbar/NavLink";

function App() {
  return (
    <div className="navbar_container">
      <Title title="Game Market" />
      <ul className="navlinks">
        <NavLink name="Sign Up" />
        <NavLink name="Sign In" />
        <NavLink name="About" />
        <NavLink name="Products" />
        <NavLink name="Home" />
      </ul>
    </div>
  );
}

ReactDom.render(<App />, document.getElementById("app"));
