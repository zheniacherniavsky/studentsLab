import Modal from "@/elements/modal";
import signin from "@/api/apiSignin";
import { useContext } from "react";
import { useHistory } from "react-router-dom";

import Context from "@/api/context";
import IContextType from "@/api/context.d";

const SignInModal = ({ willRenderPage }: { willRenderPage: any | null }) => {
  const context = useContext<Partial<IContextType>>(Context);
  const history = useHistory();

  const redirect = (path: string) => {
    history.push(path);
  };

  return (
    <Modal>
      <div className="modal_container">
        <h1>Authorization</h1>
        <div className="modal_container__info">
          <p>Login</p>
          <input id="signin_login" type="login" placeholder="" />
        </div>
        <div className="modal_container__info">
          <p>Password</p>
          <input id="signin_password" type="password" placeholder="" />
        </div>
        <button
          type="button"
          onClick={async () => {
            const { username, errorMessage }: { username?: string; errorMessage?: string } = await signin();

            if (username) {
              if (context.setNickname) context.setNickname(username);
              if (willRenderPage) willRenderPage();
              if (context.toggleSignInModal) context.toggleSignInModal(false);
              else redirect("/");
            } else {
              alert(errorMessage);
            }
          }}
        >
          Sign In
        </button>
      </div>
    </Modal>
  );
};

export default SignInModal;
