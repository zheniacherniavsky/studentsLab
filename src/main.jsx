import * as ReactDom from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Title from "./Components/Navbar/Title";
import UseRoutes from "./routes";
import NavLinks from "./Components/Navbar/NavLinks";
import Footer from "./Components/Footer/Footer";

// Styles
import "./style/styles.scss";
import "./style/navbar.scss";
import "./style/pages.scss";
import "./style/footer.scss";

function App() {
  const routes = UseRoutes();
  return (
    <div>
      <BrowserRouter>
        <div className="navbar_container">
          <Title title="Game Market" />
          <NavLinks />
        </div>
        <div className="pages_container">{routes}</div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

ReactDom.render(<App />, document.getElementById("app"));
