import React from "react";
import ReactDOM from "react-dom";
import "@/components/modal/modal.scss";

import closeImg from "@/assets/images/close.svg";

class Modal extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { root: document.createElement("div") };
    document.body.appendChild(this.state.root);
  }

  componentWillUnmount() {
    document.body.removeChild(this.state.root);
  }

  render() {
    return ReactDOM.createPortal(
      <div className="modal_window">
        <button type="button" className="modal_window__close_button" onClick={() => this.props.toggleOff()}>
          <img src={closeImg} alt="X" />
        </button>
        {this.props.children}
      </div>,
      this.state.root
    );
  }
}

export default Modal;
