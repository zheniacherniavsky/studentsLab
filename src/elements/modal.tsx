import React, { ReactNode } from "react";
import { createPortal } from "react-dom";
import "./modal.scss";
import closeImg from "@/assets/images/close.svg";

import { connect } from "react-redux";
import StateType from "@/types/state";
import { toggleSignInModal, toggleSignUpModal } from "@/redux/actions/modal";
import { ModalActionTypes } from "@/types/modal";

const modalRoot = document.getElementById("modal_window");

type PropsType = {
  children: ReactNode;
  showExitButtom: boolean;
  username: string | null;
  toggleSignInModal: (flag: boolean) => { type: ModalActionTypes; payload: boolean };
  toggleSignUpModal: (flag: boolean) => { type: ModalActionTypes; payload: boolean };
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
  }

  componentWillUnmount() {
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
              this.props.toggleSignInModal(false);
              this.props.toggleSignUpModal(false);
              if (!this.props.username) window.location.assign("/"); // bad practive
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
  toggleSignUpModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
