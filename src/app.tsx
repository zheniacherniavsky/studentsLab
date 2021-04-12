import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Footer from "@/components/footer";
import NavBar from "@/components/navbar";

// Styles
import "@/styles/styles.scss";
import "@/styles/pages.scss";
import PrivateRoute from "./elements/privateRoute";
import Loading from "./elements/loading";
import CartPage from "./components/pages/cartPage";

interface IAppProps {
  showSignInModal: boolean;
  showSignUpModal: boolean;
  showInfoModal: boolean;
}

const Pages = () => {
  const HomePage = React.lazy(() => import("@/components/pages/homePage/home"));
  const ProductPage = React.lazy(() => import("@/components/pages/productPage"));
  const ProfilePage = React.lazy(() => import("@/components/pages/profilePage"));

  return (
    <div className="pages_container">
      <React.Suspense fallback={<Loading hook className="loadingPage" />}>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <PrivateRoute path="/profile" exact>
            <ProfilePage />
          </PrivateRoute>
          <PrivateRoute path="/products/:platform" exact>
            <ProductPage />
          </PrivateRoute>
          <PrivateRoute path="/cart" exact>
            <CartPage />
          </PrivateRoute>
          <Redirect to="/" />
        </Switch>
      </React.Suspense>
    </div>
  );
};

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
        <header>
          <NavBar title="Game Store" />
        </header>
        <Pages />
        <footer>
          <Footer />
        </footer>
      </BrowserRouter>
    );
  }
}

export default App;
