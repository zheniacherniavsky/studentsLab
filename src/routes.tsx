import { Switch, Route, Redirect } from "react-router-dom";
import AboutPage from "@/Pages/aboutPage";
import HomePage from "@/Pages/HomePage/home";
import SignUpPage from "@/Pages/signUpPage";
import SignInPage from "@/Pages/signInPage";
import PCPage from "@/Pages/ProductsPages/pcPage";
import Playstation5Page from "@/Pages/ProductsPages/playstation5Page";
import XBoxOnePage from "@/Pages/ProductsPages/xBoxOnePage";
import ProfilePage from "./Pages/profilePage";

function UseRoutes() {
  return (
    <>
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
        <Route path="/profile" exact>
          <ProfilePage />
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
    </>
  );
}

export default UseRoutes;
