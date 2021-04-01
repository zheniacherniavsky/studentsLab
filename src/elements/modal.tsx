import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import "./modal.scss";
import closeImg from "@/assets/images/close.svg";
import { useHistory } from "react-router-dom";
import useActions from "@/hooks/useActions";
import useTypedSelector from "@/hooks/useTypedSelector";

const modalRoot = document.getElementById("modal_window");

type PropsType = {
  children: ReactNode;
  showExitButtom: boolean;
};

const Modal = (props: PropsType) => {
  const element: HTMLDivElement = document.createElement("div");
  element.classList.add("modal");

  const history = useHistory();
  const redirect = (path: string) => {
    history.push(path);
  };

  const { username } = useTypedSelector((state) => state.user);
  const redux = useActions();

  useEffect(() => {
    modalRoot?.appendChild(element);
    modalRoot?.classList.add("active"); // change

    return () => {
      modalRoot?.classList.remove("active");
      modalRoot?.removeChild(element); // change
    };
  }, []);

  return createPortal(
    <>
      {props.showExitButtom ? (
        <button
          type="button"
          className="close_button"
          onClick={() => {
            redux.toggleSignInModal(false);
            redux.toggleSignUpModal(false);
            if (!username) redirect("/");
          }}
          aria-label="Close modal"
        >
          <img src={closeImg} alt="Close modal" />
        </button>
      ) : null}

      {props.children}
    </>,
    element
  );
};

export default Modal;
