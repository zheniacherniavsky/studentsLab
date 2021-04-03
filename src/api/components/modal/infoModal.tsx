import Modal from "@/elements/modal";

export const enum InfoType {
  ALERT,
  PROMPT,
}

export interface InfoModalProps {
  infoModalHeader: string;
  infoModalText: string;
  infoModalType: InfoType;
  infoModalCallback: () => void;
  closeInfoModalCallback: () => void;
}

interface IButton {
  text: string;
  callback?: () => void;
  close: () => void;
}

const Button = (p: IButton) => (
  <button
    type="button"
    className="modal_button"
    onClick={() => {
      if (p.callback) p.callback();
      p.close();
    }}
  >
    {p.text}
  </button>
);

const AlertButtons = ({ close }: { close: () => void }) => (
  <div className="buttons_container">
    <Button text="Ok" close={close} />
  </div>
);

const PromptButtons = ({ callback, close }: { callback: () => void; close: () => void }) => (
  <div className="buttons_container">
    <Button text="Yes" close={close} callback={callback} />
    <Button text="Cancel" close={close} />
  </div>
);

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
        {infoModalType === InfoType.ALERT ? <AlertButtons close={closeInfoModalCallback} /> : null}
        {infoModalType === InfoType.PROMPT ? (
          <PromptButtons callback={infoModalCallback} close={closeInfoModalCallback} />
        ) : null}
      </div>
    </Modal>
  );
}
