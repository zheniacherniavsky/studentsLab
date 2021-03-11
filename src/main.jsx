import React from "react";
import ReactDom from "react-dom";
import Title from "./Components/Navbar/Title";
import UseRoutes from "./routes";
import { BrowserRouter } from "react-router-dom";
import NavLinks from "./Components/Navbar/NavLinks";

// Styles
import "./style/styles.css";
import "./style/navbar.css";

function App() {
  const routes = UseRoutes();
  return (
    <div>
      <BrowserRouter>
        <div className="navbar_container">
          <Title title="Game Market" />
          <NavLinks />
        </div>
        <div>{routes}</div>
      </BrowserRouter>
    </div>
  );
}

ReactDom.render(<App />, document.getElementById("app"));
