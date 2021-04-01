import Modal from "@/elements/modal";
import signin from "@/api/apiSignin";
import { FormEvent, useState } from "react";

import TextInput from "@/elements/input";
import useActions from "@/hooks/useActions";

const SignInModal = ({
  closeCallback,
  closeCallbackSuccess,
}: {
  closeCallbackSuccess: () => void;
  closeCallback: () => void;
}) => {
  const { changeUsernameAsync } = useActions();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [errorValidate, setError] = useState("");

  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    const t = event.currentTarget;
    if (t.id === "login") setLogin(t.value);
    if (t.id === "password") setPassword(t.value);
  };

  const lengthValidate = () => {
    if (login.length < 6 || password.length < 6) {
      setError("Min length of login and password is 6 symbols!");
      return false;
    }
    return true;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");

    if (lengthValidate() === true) {
      const { username, errorMessage }: { username?: string; errorMessage?: string } = await signin(login, password);
      if (username) {
        changeUsernameAsync(username);
        closeCallbackSuccess();
      } else {
        setError(errorMessage as string);
        setLogin("");
        setPassword("");
      }
    }
  };

  return (
    <Modal showExitButtom closeCallback={closeCallback}>
      <form onSubmit={handleSubmit}>
        <h2>Authorization</h2>
        <p>{errorValidate}</p>
        <TextInput label="Login" type="text" id="login" handleChange={handleChange} value={login} />
        <TextInput label="Password" type="password" id="password" handleChange={handleChange} value={password} />

        <button type="submit" className="modal_button">
          Submit
        </button>
      </form>
    </Modal>
  );
};

export default SignInModal;
