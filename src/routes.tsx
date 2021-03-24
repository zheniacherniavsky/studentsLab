import { Switch, Route, Redirect } from "react-router-dom";
import AboutPage from "@/pages/aboutPage";
import HomePage from "@/pages/homePage/home";
import ProductPage from "@/pages/productPage";
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
        <Route path="/pc" exact render={() => authChecker(ProductPage({ type: "pc" }))} />
        <Route path="/profile" exact render={() => authChecker(ProfilePage())} />
        <Route path="/playstationfive" exact render={() => authChecker(ProductPage({ type: "ps5" }))} />
        <Route path="/xboxone" exact render={() => authChecker(ProductPage({ type: "xbox1" }))} />
        <Redirect to="/" />
      </Switch>
    </>
  );
}

export default UseRoutes;
