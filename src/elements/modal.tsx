import React, { ReactNode } from "react";
import { createPortal } from "react-dom";
import "./modal.scss";
import Context from "@/api/context";
import closeImg from "@/assets/images/close.svg";

const modalRoot = document.getElementById("modal_window");

type PropsType = {
  children: ReactNode;
  showExitButtom: boolean;
};

class Modal extends React.Component<PropsType> {
  element: HTMLDivElement;

  constructor(props: PropsType) {
    super(props);

    this.element = document.createElement("div");
    this.element.classList.add("modal");
  }

  componentDidMount() {
    modalRoot?.appendChild(this.element);
    modalRoot?.classList.add("active");
  }

  componentWillUnmount() {
    modalRoot?.classList.remove("active");
    modalRoot?.removeChild(this.element);
  }

  render() {
    const ctx = this.context;
    return createPortal(
      <>
        {this.props.showExitButtom ? (
          <button
            type="button"
            className="close_button"
            onClick={() => {
              ctx.toggleSignInModal(false);
              ctx.toggleSignUpModal(false);
              if (!ctx.username) window.location.assign("/"); // bad practice
            }}
            aria-label="Close modal"
          >
            <img src={closeImg} alt="Close modal" />
          </button>
        ) : null}

        {this.props.children}
      </>,
      this.element
    );
  }
}
Modal.contextType = Context;

// const Modal = (props: PropsWithChildren<ReactNode>) => {
//   const context = useContext<Partial<IContextType>>(Context);
//   const root = document.createElement("div");

//   useEffect(() => {
//     document.body.appendChild(root);
//   }, []);

//   const destroy = () => {
//     if (context.toggleSignInModal) context.toggleSignInModal(false);
//     if (context.toggleSignUpModal) context.toggleSignUpModal(false);
//     document.body.removeChild(root);
//   };

//   return ReactDOM.createPortal(
//     <div className="modal_window">
//       <button
//         type="button"
//         className="modal_window__close_button"
//         onClick={() => {
//           window.location.assign("/");
//           destroy();
//         }}
//         aria-label="Close modal"
//       >
//         <img src={closeImg} alt="Close modal" />
//       </button>
//       {props.children}
//     </div>,
//     root
//   );
// };

export default Modal;
