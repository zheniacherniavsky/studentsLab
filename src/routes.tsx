import { Switch, Route, Redirect } from "react-router-dom";
import AboutPage from "@/pages/aboutPage";
import HomePage from "@/pages/homePage/home";
import PCPage from "@/pages/productsPages/pcPage";
import Playstation5Page from "@/pages/productsPages/playstation5Page";
import XBoxOnePage from "@/pages/productsPages/xBoxOnePage";
import ProfilePage from "./pages/profilePage";

function UseRoutes(username: string | null, modal: Function) {
  const authChecker = (component: any) => {
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
