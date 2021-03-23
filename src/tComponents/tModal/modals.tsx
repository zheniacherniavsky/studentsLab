import Modal from "@/Components/Modal/modal";
import signin from "@/api/auth/singin";
import signup from "@/api/auth/signup";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import Context from "@/api/context";

const Modals = ({ redirectPath = "/" }) => {
  const { isModalOpen, modalType, toggleOffModal, setNickname } = useContext(Context);
  const history = useHistory();

  const redirect = (path) => {
    history.push(path);
  };

  return (
    <>
      {isModalOpen && modalType === "signin" && (
        <Modal toggleOff={toggleOffModal}>
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
                const username = await signin();
                if (username) {
                  setNickname(username);
                  toggleOffModal();
                  redirect(redirectPath);
                }
              }}
            >
              Sign In
            </button>
          </div>
        </Modal>
      )}
      {isModalOpen && modalType === "signup" && (
        <Modal toggleOff={toggleOffModal}>
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
                const username = await signup();
                if (username) {
                  setNickname(username);
                  toggleOffModal();
                  redirect("/profile");
                }
              }}
            >
              Sign Up
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Modals;
