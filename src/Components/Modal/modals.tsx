import Modal from "@/Components/Modal/modal";
import signin from "@/api/auth/singin";
import signup from "@/api/auth/signup";

const Modals = ({ isModalOpen, modalType, toggleOffModal, setNickname }) => (
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
              const response = await signin();
              if (response.username) {
                setNickname(response.username);
                toggleOffModal();
              } else alert(response.errorMessage);
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
              const response = await signup();
              if (response.username) {
                setNickname(response.username);
                toggleOffModal();
              } else alert(`${response.response} - ${response.errorMessage}`);
            }}
          >
            Sign Up
          </button>
        </div>
      </Modal>
    )}
  </>
);

export default Modals;
