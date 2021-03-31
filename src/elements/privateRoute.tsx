import SignInModal from "@/components/modal/signInModal";
import useTypedSelector from "@/hooks/useTypedSelector";
import { ReactNode } from "react";
import { Route } from "react-router-dom";

interface PrivateRouteProps {
  children: ReactNode;
  path: string;
  exact: boolean;
}

const PrivateRoute = ({ children, ...rest }: PrivateRouteProps) => {
  const { username } = useTypedSelector((state) => state.user);
  if (username) {
    return <Route {...rest} render={() => children} />;
  }
  return (
    <Route {...rest}>
      <SignInModal />
    </Route>
  );
};

export default PrivateRoute;
