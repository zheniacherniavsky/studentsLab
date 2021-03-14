import { Switch, Route, Redirect } from "react-router-dom";
import AboutPage from "./Pages/AboutPage";
import HomePage from "./Pages/HomePage";
import SignUpPage from "./Pages/SignUpPage";
import SignInPage from "./Pages/SignInPage";
import PCPage from "./Pages/ProductsPages/PCPage";
import Playstation5Page from "./Pages/ProductsPages/Playstation5Page";
import XBoxOnePage from "./Pages/ProductsPages/XBoxOnePage";

function UseRoutes() {
  return (
    <Switch>
      <Route path="/" exact>
        <HomePage />
      </Route>
      <Route path="/about" exact>
        <AboutPage />
      </Route>
      <Route path="/pc" exact>
        <PCPage />
      </Route>
      <Route path="/playstationfive" exact>
        <Playstation5Page />
      </Route>
      <Route path="/xboxone" exact>
        <XBoxOnePage />
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
