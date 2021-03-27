import Modal from "@/elements/modal";
import signup from "@/api/apiSignup";
import { FormEvent, useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import Context from "@/api/context";
import IContextType from "@/api/context.d";

const SignUpModal = () => {
  const context = useContext<Partial<IContextType>>(Context);
  const history = useHistory();

  const redirect = (path: string) => {
    history.push(path);
  };

  const [login, setLogin] = useState("");
  const [firstPassword, setFirstPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");

  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    const t = event.currentTarget;
    if (t.id === "login") setLogin(t.value);
    if (t.id === "firstPassword") setFirstPassword(t.value);
    if (t.id === "secondPassword") setSecondPassword(t.value);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const { username, errorMessage }: { username?: string; errorMessage?: string } = await signup(
      login,
      firstPassword,
      secondPassword
    );
    if (username) {
      if (context.setNickname) context.setNickname(username);
      if (context.toggleSignUpModal) context.toggleSignUpModal(false);
      redirect("/profile");
    } else {
      alert(errorMessage);
      setFirstPassword("");
      setSecondPassword("");
    }
  };

  return (
    <Modal>
      <form onSubmit={handleSubmit}>
        <h2>Registration</h2>
        <label htmlFor="login">
          Login
          <input type="text" id="login" value={login} onChange={handleChange} required minLength={6} />
        </label>
        <label htmlFor="firstPassword">
          Password
          <input
            type="password"
            id="firstPassword"
            value={firstPassword}
            onChange={handleChange}
            required
            minLength={6}
          />
        </label>
        <label htmlFor="secondPassword">
          Repeat password
          <input
            type="password"
            id="secondPassword"
            value={secondPassword}
            onChange={handleChange}
            required
            minLength={6}
          />
        </label>
        <button type="submit" className="modal_button">
          Submit
        </button>
      </form>
    </Modal>
  );
};

export default SignUpModal;
