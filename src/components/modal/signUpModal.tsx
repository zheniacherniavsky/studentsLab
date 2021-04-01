import Modal from "@/elements/modal";
import signup from "@/api/apiSignup";
import { FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";

import LoginInput from "@/elements/inputs/loginInput";
import PasswordInput from "@/elements/inputs/passwordInput";
import useActions from "@/hooks/useActions";

const SignUpModal = ({ closeCallback }: { closeCallback: () => void }) => {
  const { changeUsernameAsync } = useActions();
  const history = useHistory();

  const redirect = (path: string) => {
    history.push(path);
  };

  const [login, setLogin] = useState("");
  const [firstPassword, setFirstPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  const [errorValidate, setError] = useState("");

  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    const t = event.currentTarget;
    if (t.id === "login") setLogin(t.value);
    if (t.id === "firstPassword") setFirstPassword(t.value);
    if (t.id === "secondPassword") setSecondPassword(t.value);
  };

  const lengthValidate = () => {
    if (login.length < 6 || firstPassword.length < 6) {
      setError("Min length of login and password is 6 symbols!");
      return false;
    }
    return true;
  };

  const passwordsValidate = () => {
    if (firstPassword === secondPassword) return true;
    setError("Passwords mismatch!");
    setFirstPassword("");
    setSecondPassword("");
    return false;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");

    if (lengthValidate() === true && passwordsValidate() === true) {
      const { username, errorMessage }: { username?: string; errorMessage?: string } = await signup(
        login,
        firstPassword,
        secondPassword
      );
      if (username) {
        changeUsernameAsync(username);
        closeCallback();
        redirect("/profile");
      } else {
        setError(errorMessage as string);
        setFirstPassword("");
        setSecondPassword("");
      }
    }
  };

  return (
    <Modal showExitButtom closeCallback={closeCallback}>
      <form onSubmit={handleSubmit}>
        <h2>Registration</h2>
        <p>{errorValidate}</p>
        <LoginInput label="Login" type="text" id="login" handleChange={handleChange} value={login} />
        <PasswordInput
          label="Password"
          type="password"
          id="firstPassword"
          handleChange={handleChange}
          value={firstPassword}
        />
        <PasswordInput
          label="Repeat password"
          type="password"
          id="secondPassword"
          handleChange={handleChange}
          value={secondPassword}
        />
        <button type="submit" className="modal_button">
          Submit
        </button>
      </form>
    </Modal>
  );
};

export default SignUpModal;
