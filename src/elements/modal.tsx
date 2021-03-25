import { PropsWithChildren, ReactNode, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import "@/elements/modal.scss";
import Context from "@/api/context";

import IContextType from "@/api/context.d";

import closeImg from "@/assets/images/close.svg";

const Modal = (props: PropsWithChildren<ReactNode>) => {
  const context = useContext<Partial<IContextType>>(Context);
  const root = document.createElement("div");

  useEffect(() => {
    document.body.appendChild(root);
  }, []);

  const destroy = () => {
    if (context.toggleSignInModal) context.toggleSignInModal(false);
    if (context.toggleSignUpModal) context.toggleSignUpModal(false);
    document.body.removeChild(root);
  };

  return ReactDOM.createPortal(
    <div className="modal_window">
      <button
        type="button"
        className="modal_window__close_button"
        onClick={() => {
          window.location.assign("/");
          destroy();
        }}
        aria-label="Close modal"
      >
        <img src={closeImg} alt="Close modal" />
      </button>
      {props.children}
    </div>,
    root
  );
};

export default Modal;
