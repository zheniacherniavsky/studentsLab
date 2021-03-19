import React from "react";
import ReactDOM from "react-dom";
import "@/Components/Modal/modal.scss";

class Modal extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = { root: document.createElement("div") };
    document.body.appendChild(this.state.root);
  }

  componentWillUnmount() {
    document.body.removeChild(this.state.root);
  }

  render() {
    return ReactDOM.createPortal(
      <div className="modal">
        <button type="button" className="modal__close_button" onClick={() => this.props.toggleOff()}>
          Закрыть
        </button>
        {this.props.children}
      </div>,
      this.state.root
    );
  }
}

export default Modal;

//
//  future plans : make modals with React.context

// const Modal = ({ modalButtonElement = null, children }) => {
//   const [active, setActive] = useState(false);

//   return (
//     <>
//       <button type="button" onClick={() => setActive(true)}>
//         {modalButtonElement}
//       </button>

//       {active && (
//         <div>
//           <div>
//             <button type="button" onClick={() => setActive(false)}>
//               X
//             </button>
//           </div>
//           <div>{children}</div>
//         </div>
//       )}
//     </>
//   );
// }
