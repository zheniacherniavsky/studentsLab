import React from "react";
import * as ReactDom from "react-dom";
import { BrowserRouter } from "react-router-dom";
import UseRoutes from "./routes";
import Footer from "./Components/footer";
import NavBar from "./Components/navbar";
// import ErrorChecker from "./Components/ErrorChecker";

// Styles
import "@/styles/styles.scss";
import "@/Pages/pages.scss";

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
          <NavBar title="Game Store" />
          <div className="pages_container">{routes}</div>
          {/* <ErrorChecker error /> */}
          <Footer />
        </BrowserRouter>
      </div>
    );
  }
}

ReactDom.render(<App />, document.getElementById("app"));
