import Modal from "@/elements/modal";
import useActions from "@/hooks/useActions";
import useTypedSelector from "@/hooks/useTypedSelector";

export default function InfoModal() {
  const { infoModalHeader, infoModalText, infoModalType, infoModalCallback } = useTypedSelector((state) => state.modal);

  const { closeInfoModal } = useActions();

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
              closeInfoModal();
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
                closeInfoModal();
              }}
            >
              Yes
            </button>
            <button
              type="button"
              className="modal_button"
              onClick={() => {
                closeInfoModal();
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
