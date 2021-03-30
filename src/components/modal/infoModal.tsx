import Context from "@/api/context";
import IContextType from "@/api/context.d";
import Modal from "@/elements/modal";
import { useContext } from "react";

export default function InfoModal() {
  const context = useContext<Partial<IContextType>>(Context);

  return (
    <Modal showExitButtom={false}>
      <div className="container">
        <h2>{context.infoModalHeader}</h2>
        <p>{context.infoModalText}</p>
        {context.infoModalType === "alert" ? (
          <button
            type="button"
            className="modal_button"
            onClick={() => {
              if (context.toggleInfoModal) context.toggleInfoModal(false);
            }}
          >
            Ok
          </button>
        ) : null}
        {context.infoModalType === "prompt" ? (
          <div className="buttons_container">
            <button
              type="button"
              className="modal_button"
              onClick={() => {
                if (context.infoModalCallback) context.infoModalCallback();
                if (context.toggleInfoModal) context.toggleInfoModal(false);
              }}
            >
              Yes
            </button>
            <button
              type="button"
              className="modal_button"
              onClick={() => {
                if (context.toggleInfoModal) context.toggleInfoModal(false);
              }}
            >
              Cancel
            </button>
          </div>
        ) : null}
      </div>
    </Modal>
  );
}
