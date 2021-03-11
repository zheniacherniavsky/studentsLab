import { Switch, Route, Redirect } from "react-router-dom";
import AboutPage from "./Pages/AboutPage";
import HomePage from "./Pages/HomePage";
import ProductsPage from "./Pages/ProductsPage";
import SignUpPage from "./Pages/SignUpPage";
import SignInPage from "./Pages/SignInPage";

function UseRoutes() {
  return (
    <Switch>
      <Route path="/" exact>
        <HomePage />
      </Route>
      <Route path="/about" exact>
        <AboutPage />
      </Route>
      <Route path="/products" exact>
        <ProductsPage />
      </Route>
      <Route path="/signup" exact>
        <SignUpPage />
      </Route>
      <Route path="/signin" exact>
        <SignInPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
}

export default UseRoutes;
