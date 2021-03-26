import Modal from "@/elements/modal";
import signup from "@/api/apiSignup";
import { useContext } from "react";
import { useHistory } from "react-router-dom";

import Context from "@/api/context";
import IContextType from "@/api/context.d";

const SignUpModal = () => {
  const context = useContext<Partial<IContextType>>(Context);
  const history = useHistory();

  const redirect = (path: string) => {
    history.push(path);
  };

  return (
    <Modal>
      <div className="modal_container">
        <h1>Registration</h1>
        <div className="modal_container__info">
          <p>Login</p>
          <input id="signup_login" type="login" placeholder="Your future nickname" />
        </div>
        <div className="modal_container__info">
          <p>Password</p>
          <input id="signup_password" type="password" placeholder="" />
        </div>
        <div className="modal_container__info">
          <p>Confirm password</p>
          <input id="signup_confirmPassword" type="password" placeholder="" />
        </div>
        <button
          type="button"
          onClick={async () => {
            const { username, errorMessage }: { username?: string; errorMessage?: string } = await signup();

            if (username) {
              if (context.setNickname) context.setNickname(username);
              if (context.toggleSignUpModal) context.toggleSignUpModal(false);
              redirect("/profile");
            } else alert(errorMessage);
          }}
        >
          Sign Up
        </button>
      </div>
    </Modal>
  );
};

export default SignUpModal;
