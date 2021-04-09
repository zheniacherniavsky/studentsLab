import Modal from "@/elements/modal";
import { FormEvent, useState } from "react";

import PasswordInput from "@/elements/inputs/passwordInput";
import ConfirmPasswordInput from "@/elements/inputs/confirmPasswordInput";
import useTypedSelector from "@/helpers/hooks/useTypedSelector";
import changePassword from "@/api/apiChangePassword";
import ModalCloseButton from "@/elements/modalCloseButton";
import { InfoModal, InfoModalProps, InfoType } from "./infoModal";

const ChangePasswordModal = ({ closeCallback }: { closeCallback: () => void }) => {
  const { username: login } = useTypedSelector((state) => state.user);

  const [firstPassword, setFirstPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [infoModalSuccess, toggleInfoModalSuccess] = useState(false);
  const [error, setError] = useState("");

  const InfoModalSuccessProps: InfoModalProps = {
    infoModalHeader: "Success!",
    infoModalText: "Password has been changed.",
    infoModalType: InfoType.ALERT,
    infoModalCallback: () => null,
    closeInfoModalCallback: () => {
      toggleInfoModalSuccess(false);
      closeCallback();
    },
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const validationErrorMessage =
      passwordError || //
      confirmPasswordError ||
      "";

    if (!validationErrorMessage && firstPassword && confirmPassword) {
      // change password api
      const error = await changePassword(login as string, firstPassword);

      console.log(error);
      if (!error) {
        toggleInfoModalSuccess(true);
      } else {
        setError(error);
        setFirstPassword("");
        setConfirmPassword("");
      }
    } else setError(validationErrorMessage || "Fill in all the fields!");
  };

  return (
    <Modal>
      {infoModalSuccess ? <InfoModal {...InfoModalSuccessProps} /> : null}
      <form onSubmit={handleSubmit}>
        <div className="head">
          <h2>Change password</h2>
          <ModalCloseButton closeCallback={closeCallback} />
        </div>
        <p>{error}</p>
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

export default ChangePasswordModal;
