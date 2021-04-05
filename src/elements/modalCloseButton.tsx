import closeImg from "@/api/assets/images/close.svg";

export default function ModalCloseButton({ closeCallback }: { closeCallback: () => void }) {
  return (
    <button
      type="button"
      className="close_button"
      onClick={() => {
        closeCallback();
      }}
      aria-label="Close modal"
    >
      <img src={closeImg} alt="Close modal" />
    </button>
  );
}
