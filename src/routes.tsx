import { Switch, Route, Redirect } from "react-router-dom";
import AboutPage from "@/Pages/aboutPage";
import HomePage from "@/Pages/HomePage/home";
import PCPage from "@/Pages/ProductsPages/pcPage";
import Playstation5Page from "@/Pages/ProductsPages/playstation5Page";
import XBoxOnePage from "@/Pages/ProductsPages/xBoxOnePage";
import ProfilePage from "./Pages/profilePage";

function UseRoutes(username, modal) {
  const authChecker = (component) => {
    if (username) return component;
    modal("signin");
    return <Redirect to="/" />;
  };

  return (
    <>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/about" exact render={() => authChecker(AboutPage())} />
        <Route path="/pc" exact render={() => authChecker(PCPage())} />
        <Route path="/profile" exact render={() => authChecker(ProfilePage())} />
        <Route path="/playstationfive" exact render={() => authChecker(Playstation5Page())} />
        <Route path="/xboxone" exact render={() => authChecker(XBoxOnePage())} />
        <Redirect to="/" />
      </Switch>
    </>
  );
}

export default UseRoutes;
