import Modal from "@/elements/modal";
import ModalCloseButton from "@/elements/modalCloseButton";
import signin from "@/api/apiSignin";
import { FormEvent, useState } from "react";

import LoginInput from "@/elements/inputs/loginInput";
import PasswordInput from "@/elements/inputs/passwordInput";
import useActions from "@/helpers/hooks/useActions";

const SignInModal = ({
  closeCallback,
  closeCallbackSuccess,
}: {
  closeCallbackSuccess: () => void;
  closeCallback: () => void;
}) => {
  const { changeUsernameAsync, setAdminStatusAsync } = useActions();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const [loginError, setLoginError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const validationErrorMessage =
      loginError || //
      passwordError ||
      "";

    if (!validationErrorMessage && login && password) {
      const {
        username,
        errorMessage,
        isAdmin,
      }: { username?: string; errorMessage?: string; isAdmin?: boolean } = await signin(login, password);
      if (username) {
        changeUsernameAsync(username);
        setAdminStatusAsync(isAdmin);
        closeCallbackSuccess();
      } else {
        setError(errorMessage as string);
        setLogin("");
        setPassword("");
      }
    } else setError(validationErrorMessage || "Fill in all the fields!");
  };

  return (
    <Modal>
      <form onSubmit={handleSubmit}>
        <div className="head">
          <h2>Authorization</h2>
          <ModalCloseButton closeCallback={closeCallback} />
        </div>
        <p>{error}</p>
        <LoginInput
          autofocus
          label="Login"
          type="text"
          id="login"
          handleChange={setLogin}
          value={login}
          errorDispatch={setLoginError}
        />
        <PasswordInput
          autocomplete={false}
          label="Password"
          type="password"
          id="password"
          handleChange={setPassword}
          value={password}
          errorDispatch={setPasswordError}
        />

        <button type="submit" className="modal_button">
          Submit
        </button>
      </form>
    </Modal>
  );
};

export default SignInModal;
