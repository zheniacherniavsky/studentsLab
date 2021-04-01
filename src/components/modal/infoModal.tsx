import Modal from "@/elements/modal";

// TODO: components for modals

export interface InfoModalProps {
  infoModalHeader: string;
  infoModalText: string;
  infoModalType: string;
  infoModalCallback: () => void;
  closeInfoModalCallback: () => void;
}

export function InfoModal({
  infoModalHeader,
  infoModalText,
  infoModalType,
  infoModalCallback,
  closeInfoModalCallback,
}: InfoModalProps) {
  return (
    <Modal showExitButtom={false}>
      <div className="container">
        <h2>{infoModalHeader}</h2>
        <p>{infoModalText}</p>
        {infoModalType === "alert" ? (
          <button
            type="button"
            className="modal_button"
            onClick={() => {
              closeInfoModalCallback();
            }}
          >
            Ok
          </button>
        ) : null}
        {infoModalType === "prompt" ? (
          <div className="buttons_container">
            <button
              type="button"
              className="modal_button"
              onClick={() => {
                if (infoModalCallback) infoModalCallback();
                closeInfoModalCallback();
              }}
            >
              Yes
            </button>
            <button
              type="button"
              className="modal_button"
              onClick={() => {
                closeInfoModalCallback();
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
