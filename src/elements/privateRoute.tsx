import Context from "@/api/context";
import SignInModal from "@/components/modal/signInModal";
import { ReactNode, useContext } from "react";
import { Route } from "react-router-dom";

export default function PrivateRoute({ children, ...rest }: { children: ReactNode; path: string; exact: boolean }) {
  const context = useContext(Context);

  if (context.username) {
    return <Route {...rest} render={() => children} />;
  }
  return (
    <Route {...rest}>
      <SignInModal />
    </Route>
  );
}
