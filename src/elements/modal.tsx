import React, { ReactNode } from "react";
import { createPortal } from "react-dom";
import "./modal.scss";
import { toggleSignInModal } from "@/redux/actions/modal";
import closeImg from "@/assets/images/close.svg";
import { connect } from "react-redux";
import StateType from "@/types/state";

const modalRoot = document.getElementById("modal_window");

type PropsType = {
  children: ReactNode;
  showExitButtom: boolean;
  username: string | null;
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
    return createPortal(
      <>
        {this.props.showExitButtom ? (
          <button
            type="button"
            className="close_button"
            onClick={() => {
              toggleSignInModal(false);
              // ctx.toggleSignUpModal(false);
              if (!this.props.username) window.location.assign("/"); // bad practice
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

const mapStateToProps = (state: StateType) => ({
  username: state.user.username,
});

const mapDispatchToProps = {
  toggleSignInModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
