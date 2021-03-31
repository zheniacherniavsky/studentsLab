import React, { PropsWithChildren, ReactNode } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Context from "@/api/context";
import Footer from "@/components/footer";
import NavBar from "@/components/navbar";

// Pages
import AboutPage from "@/pages/aboutPage";
import HomePage from "@/pages/homePage/home";
import ProductPage from "@/pages/productPage";
import ProfilePage from "./pages/profilePage";

// Styles
import "@/styles/styles.scss";
import "@/styles/pages.scss";
import SignInModal from "./components/modal/signInModal";
import SignUpModal from "./components/modal/signUpModal";
import PrivateRoute from "./elements/privateRoute";
import InfoModal from "./components/modal/infoModal";

interface IMyComponentState {
  showSignInModal: boolean;
  showSignUpModal: boolean;

  showInfoModal: boolean;
  infoModalHeader?: string;
  infoModalText?: string;
  infoModalType?: string;
  infoModalCallback?: () => void;
}

class App extends React.Component<PropsWithChildren<ReactNode>, IMyComponentState> {
  constructor(props: PropsWithChildren<ReactNode>) {
    super(props);
    this.state = {
      showSignInModal: false,
      showSignUpModal: false,

      showInfoModal: false,
      infoModalHeader: undefined,
      infoModalText: undefined,
      infoModalType: undefined,
      infoModalCallback: undefined,
    };
  }

  componentDidCatch(error: Error) {
    /* modal window with error in future */
    alert(error); // is it simple alert?

    console.error("UI ERROR:", error); // how i remember, console.error is disabled in configurations
    window.location.assign("/");
  }

  toggleInfoModal = (flag: boolean) => {
    this.setState({
      showInfoModal: flag,
    });

    if (flag === false) {
      this.setState({
        infoModalHeader: undefined,
        infoModalText: undefined,
        infoModalType: undefined,
        infoModalCallback: undefined,
      });
    }
  };

  showInfoModal = (header?: string, text?: string, type?: string, callback?: () => void) => {
    this.setState({
      infoModalHeader: header,
      infoModalText: text,
      infoModalType: type,
      infoModalCallback: callback,
    });
    this.toggleInfoModal(true);
  };

  toggleSignInModal = (flag: boolean) => {
    this.setState({
      showSignInModal: flag,
    });
  };

  toggleSignUpModal = (flag: boolean) => {
    this.setState({
      showSignUpModal: flag,
    });
  };

  render() {
    return (
      <>
        <Context.Provider
          value={{
            toggleSignInModal: this.toggleSignInModal,
            toggleSignUpModal: this.toggleSignUpModal,
            toggleInfoModal: this.toggleInfoModal,
            showInfoModal: this.showInfoModal,
            infoModalHeader: this.state.infoModalHeader,
            infoModalText: this.state.infoModalText,
            infoModalType: this.state.infoModalType,
            infoModalCallback: this.state.infoModalCallback,
          }}
        >
          <BrowserRouter>
            {this.state.showSignInModal ? <SignInModal /> : null}
            {this.state.showSignUpModal ? <SignUpModal /> : null}
            {this.state.showInfoModal ? <InfoModal /> : null}
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
        </Context.Provider>
      </>
    );
  }
}

export default App;
