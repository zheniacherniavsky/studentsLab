import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Footer from "@/api/components/footer";
import NavBar from "@/api/components/navbar";

// Pages
import AboutPage from "@/api/components/pages/aboutPage";
import HomePage from "@/api/components/pages/homePage/home";
import ProductPage from "@/api/components/pages/productPage";
import ProfilePage from "@/api/components/pages/profilePage";

// Styles
import "@/styles/styles.scss";
import "@/styles/pages.scss";
import PrivateRoute from "./elements/privateRoute";

interface IAppProps {
  showSignInModal: boolean;
  showSignUpModal: boolean;
  showInfoModal: boolean;
}

class App extends React.Component<IAppProps> {
  componentDidCatch(error: Error) {
    /* modal window with error in future */
    alert(error); // is it simple alert?

    console.error("UI ERROR:", error); // how i remember, console.error is disabled in configurations
    window.location.assign("/");
  }

  render() {
    return (
      <BrowserRouter>
        {/* {this.props.showSignUpModal ? <SignUpModal /> : null}
        {this.props.showInfoModal ? <InfoModal /> : null} */}
        <header>
          <NavBar title="Game Store" />
        </header>
        <div className="pages_container">
          <Switch>
            <Route path="/" exact>
              <HomePage />
            </Route>
            <PrivateRoute path="/about" exact>
              <AboutPage />
            </PrivateRoute>
            <PrivateRoute path="/pc" exact>
              <ProductPage />
            </PrivateRoute>
            <PrivateRoute path="/profile" exact>
              <ProfilePage />
            </PrivateRoute>
            <PrivateRoute path="/playstationfive" exact>
              <ProductPage />
            </PrivateRoute>
            <PrivateRoute path="/xboxone" exact>
              <ProductPage />
            </PrivateRoute>
            <Redirect to="/" />
          </Switch>
        </div>
        <footer>
          <Footer />
        </footer>
      </BrowserRouter>
    );
  }
}

export default App;
