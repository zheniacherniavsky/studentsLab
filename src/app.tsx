import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Footer from "@/components/footer";
import NavBar from "@/components/navbar";

// Pages
import AboutPage from "@/pages/aboutPage";
import HomePage from "@/pages/homePage/home";
import ProductPage from "@/pages/productPage";
import { connect } from "react-redux";
import ProfilePage from "./pages/profilePage";

// Styles
import "@/styles/styles.scss";
import "@/styles/pages.scss";
import SignInModal from "./components/modal/signInModal";
import SignUpModal from "./components/modal/signUpModal";
import PrivateRoute from "./elements/privateRoute";
import InfoModal from "./components/modal/infoModal";
import StateType from "./types/state";

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
        {this.props.showSignInModal ? <SignInModal /> : null}
        {this.props.showSignUpModal ? <SignUpModal /> : null}
        {this.props.showInfoModal ? <InfoModal /> : null}
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

const mapStateToProps = (state: StateType) => ({
  showSignInModal: state.modal.showSignInModal,
  showSignUpModal: state.modal.showSignUpModal,
  showInfoModal: state.modal.showInfoModal,
});

export default connect(mapStateToProps, null)(App);
