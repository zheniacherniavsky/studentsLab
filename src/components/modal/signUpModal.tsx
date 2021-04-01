import Modal from "@/elements/modal";
import signup from "@/api/apiSignup";
import { FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";

import LoginInput from "@/elements/inputs/loginInput";
import PasswordInput from "@/elements/inputs/passwordInput";
import ConfirmPasswordInput from "@/elements/inputs/confirmPasswordInput";
import useActions from "@/hooks/useActions";

const SignUpModal = ({ closeCallback }: { closeCallback: () => void }) => {
  const { changeUsernameAsync } = useActions();
  const history = useHistory();

  const redirect = (path: string) => {
    history.push(path);
  };

  const [login, setLogin] = useState("");
  const [firstPassword, setFirstPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loginError, setLoginError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const validationErrorMessage =
      loginError || //
      passwordError ||
      confirmPasswordError ||
      "";

    if (!validationErrorMessage) {
      const { username, errorMessage }: { username?: string; errorMessage?: string } = await signup(
        login,
        firstPassword
      );
      if (username) {
        changeUsernameAsync(username);
        closeCallback();
        redirect("/profile");
      } else {
        setError(errorMessage as string);
        setFirstPassword("");
        setConfirmPassword("");
      }
    } else setError(validationErrorMessage);
  };

  return (
    <Modal showExitButtom closeCallback={closeCallback}>
      <form onSubmit={handleSubmit}>
        <h2>Registration</h2>
        <p>{error}</p>
        <LoginInput
          label="Login"
          type="text"
          id="login"
          handleChange={setLogin}
          value={login}
          errorDispatch={setLoginError}
        />
        <PasswordInput
          label="Password"
          type="password"
          id="firstPassword"
          handleChange={setFirstPassword}
          value={firstPassword}
          errorDispatch={setPasswordError}
        />
        <ConfirmPasswordInput
          label="Repeat password"
          type="password"
          id="secondPassword"
          handleChange={setConfirmPassword}
          value={confirmPassword}
          firstPassword={firstPassword}
          errorDispatch={setConfirmPasswordError}
        />
        <button type="submit" className="modal_button">
          Submit
        </button>
      </form>
    </Modal>
  );
};

export default SignUpModal;
