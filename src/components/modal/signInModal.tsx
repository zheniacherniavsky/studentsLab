import Modal from "@/elements/modal";
import signin from "@/api/apiSignin";
import { FormEvent, useContext, useState } from "react";

import Context from "@/api/context";
import IContextType from "@/api/context.d";
import Input from "@/elements/input";

import Swal from "sweetalert2/src/sweetalert2";

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
      Swal.fire({
        title: "Ooops...",
        text: errorMessage,
        icon: "error",
      });
      setLogin("");
      setPassword("");
    }
  };

  return (
    <Modal>
      <form onSubmit={handleSubmit}>
        <h2>Authorization</h2>
        <Input label="Login" type="text" id="login" minLength={6} handleChange={handleChange} value={login} />
        <Input
          label="Password"
          type="password"
          id="password"
          minLength={6}
          handleChange={handleChange}
          value={password}
        />

        <button type="submit" className="modal_button">
          Submit
        </button>
      </form>
    </Modal>
  );
};

export default SignInModal;
