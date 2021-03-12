import * as ReactDom from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Title from "./Components/Navbar/Title";
import UseRoutes from "./routes";
import NavLinks from "./Components/Navbar/NavLinks";
import Footer from "./Components/Footer/Footer";
// import ErrorChecker from "./Components/ErrorChecker";

// Styles
import "./style/styles.scss";
import "./style/navbar.scss";
import "./style/pages.scss";
import "./style/footer.scss";

// * ISSUE
// without this comment eslint dont want run 'App', because React is not defined
// BUT if we define react, eslint tell us that React has been defined and you cant
// define it again

// eslint-disable-next-line no-undef
class App extends React.Component {
  componentDidCatch(error) {
    /* modal window with error in future */
    alert(error); // is it simple alert?

    console.error("UI ERROR:", error); // how i remember, console.error is disabled in configurations
    window.location.assign("/");
  }

  render() {
    const routes = UseRoutes();
    return (
      <div>
        <BrowserRouter>
          <div className="navbar_container">
            <Title title="Game Market" />
            <NavLinks />
          </div>
          <div className="pages_container">{routes}</div>
          {/* <ErrorChecker error /> */}
          <Footer />
        </BrowserRouter>
      </div>
    );
  }
}

ReactDom.render(<App />, document.getElementById("app"));
