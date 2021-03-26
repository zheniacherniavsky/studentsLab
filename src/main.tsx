import React from "react";
import * as ReactDom from "react-dom";
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
// import SignInModal from "./components/modal/signInModal";
// import SignUpModal from "./components/modal/signUpModal";

interface IMyComponentState {
  username: string | null;
  isSignInOpen: boolean;
  isSignUpOpen: boolean;
}

class App extends React.Component<unknown, IMyComponentState> {
  constructor(props: unknown) {
    super(props);
    this.state = {
      username: null,
      isSignInOpen: false,
      isSignUpOpen: false,
    };
  }

  componentDidCatch(error: Error) {
    /* modal window with error in future */
    alert(error); // is it simple alert?

    console.error("UI ERROR:", error); // how i remember, console.error is disabled in configurations
    window.location.assign("/");
  }

  setNickname = (nick: string | null) => {
    this.setState({ username: nick });
  };

  toggleSignInModal = (mode: boolean) => {
    this.setState({ isSignInOpen: mode });
  };

  toggleSignUpModal = (mode: boolean) => {
    this.setState({ isSignUpOpen: mode });
  };

  authChecker = (component: JSX.Element) => component;

  // if (this.state.username) return component;
  // return <SignInModal WillRenderPage={component} />;

  render() {
    return (
      <>
        <Context.Provider
          value={{
            isSignInOpen: this.state.isSignInOpen,
            isSignUpOpen: this.state.isSignUpOpen,
            toggleSignInModal: this.toggleSignInModal,
            toggleSignUpModal: this.toggleSignUpModal,
            // profile details
            username: this.state.username,
            setNickname: this.setNickname,
          }}
        >
          <BrowserRouter>
            <header>
              <NavBar title="Game Store" />
            </header>
            <div className="pages_container">
              <Switch>
                <Route path="/" exact>
                  <HomePage />
                </Route>
                <Route path="/about" exact>
                  <AboutPage />
                </Route>
                <Route path="/pc" exact>
                  <ProductPage />
                </Route>
                <Route path="/profile" exact>
                  <ProfilePage />
                </Route>
                <Route path="/playstationfive" exact>
                  <ProductPage />
                </Route>
                <Route path="/xboxone" exact>
                  <ProductPage />
                </Route>
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

ReactDom.render(<App />, document.getElementById("app"));
