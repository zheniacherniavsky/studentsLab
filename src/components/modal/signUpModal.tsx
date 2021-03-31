import Modal from "@/elements/modal";
import signup from "@/api/apiSignup";
import { FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";

import TextInput from "@/elements/input";
import useActions from "@/hooks/useActions";

const SignUpModal = () => {
  const { changeUsernameAsync, toggleSignUpModalAsync } = useActions();
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
        toggleSignUpModalAsync(false);
        redirect("/profile");
      } else {
        setError(errorMessage as string);
        setFirstPassword("");
        setSecondPassword("");
      }
    }
  };

  return (
    <Modal showExitButtom>
      <form onSubmit={handleSubmit}>
        <h2>Registration</h2>
        <p>{errorValidate}</p>
        <TextInput label="Login" type="text" id="login" handleChange={handleChange} value={login} />
        <TextInput
          label="Password"
          type="password"
          id="firstPassword"
          handleChange={handleChange}
          value={firstPassword}
        />
        <TextInput
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
