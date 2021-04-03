import React, { ReactNode } from "react";
import { createPortal } from "react-dom";
import "./modal.scss";
import closeImg from "@/api/assets/images/close.svg";

import { connect } from "react-redux";
import StateType from "@/types/state";

const modalRoot = document.getElementById("modal_window");

type PropsType = {
  children: ReactNode;
  showExitButtom?: boolean;
  username?: string | null;
  closeCallback?: () => void;
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
              if (this.props.closeCallback) this.props.closeCallback();
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

export default connect(mapStateToProps, null)(Modal);
