import Modal from "@/elements/modal";
import signup from "@/api/apiSignup";
import React, { FormEvent, useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import Context from "@/api/context";
import IContextType from "@/api/context.d";
import Input from "@/elements/input";

import Swal from "sweetalert2/src/sweetalert2";

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
      Swal.fire({
        title: "Ooops...",
        text: errorMessage,
        icon: "error",
      });
      setFirstPassword("");
      setSecondPassword("");
    }
  };

  return (
    <Modal>
      <form onSubmit={handleSubmit}>
        <h2>Registration</h2>
        <Input label="Login" type="text" id="login" minLength={6} handleChange={handleChange} value={login} />
        <Input
          label="Password"
          type="password"
          id="firstPassword"
          minLength={6}
          handleChange={handleChange}
          value={firstPassword}
        />
        <Input
          label="Repeat password"
          type="password"
          id="secondPassword"
          minLength={6}
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
