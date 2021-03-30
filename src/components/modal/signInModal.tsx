import Modal from "@/elements/modal";
import signin from "@/api/apiSignin";
import { FormEvent, useContext, useState } from "react";

import Context from "@/api/context";
import IContextType from "@/api/context.d";
import TextInput from "@/elements/input";

const SignInModal = () => {
  const context = useContext<Partial<IContextType>>(Context);

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
        if (context.setNickname) context.setNickname(username);
        if (context.toggleSignInModal) context.toggleSignInModal(false);
      } else {
        setError(errorMessage as string);
        setLogin("");
        setPassword("");
      }
    }
  };

  return (
    <Modal showExitButtom>
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
