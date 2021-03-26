import Modal from "@/elements/modal";
import signin from "@/api/apiSignin";
import { FormEvent, useContext, useState } from "react";

import Context from "@/api/context";
import IContextType from "@/api/context.d";

const SignInModal = () => {
  const context = useContext<Partial<IContextType>>(Context);

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    const t = event.currentTarget;
    if (t.id === "login") setLogin(t.value);
    if (t.id === "password") setPassword(t.value);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const { username, errorMessage }: { username?: string; errorMessage?: string } = await signin(login, password);
    if (username) {
      if (context.setNickname) context.setNickname(username);
      if (context.toggleSignInModal) context.toggleSignInModal(false);
    } else {
      alert(errorMessage);
      setLogin("");
      setPassword("");
    }
  };

  return (
    <Modal>
      <form onSubmit={handleSubmit}>
        <h2>Authorization</h2>
        <label htmlFor="login">
          Login
          <input type="text" id="login" value={login} onChange={handleChange} required minLength={6} />
        </label>
        <label htmlFor="password">
          password
          <input type="password" id="password" value={password} onChange={handleChange} required minLength={6} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </Modal>
  );
};

export default SignInModal;
