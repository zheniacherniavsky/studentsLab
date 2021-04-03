import SignInModal from "@/api/components/modal/signInModal";
import useTypedSelector from "@/helpers/hooks/useTypedSelector";
import { ReactNode, useState } from "react";
import { Route, useHistory } from "react-router-dom";

interface PrivateRouteProps {
  children: ReactNode;
  path: string;
  exact: boolean;
}

const PrivateRoute = ({ children, ...rest }: PrivateRouteProps) => {
  const [ShowSignInModal, toggleSignInModal] = useState(true);

  const history = useHistory();
  const redirect = (path: string) => {
    history.push(path);
  };

  const { username } = useTypedSelector((state) => state.user);

  if (username) {
    return <Route {...rest} render={() => children} />;
  }
  return (
    <Route {...rest}>
      {ShowSignInModal ? (
        <SignInModal
          closeCallback={() => {
            toggleSignInModal(false);
            redirect("/");
          }}
          closeCallbackSuccess={() => toggleSignInModal(false)}
        />
      ) : null}
    </Route>
  );
};

export default PrivateRoute;
