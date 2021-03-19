import Modal from "@/Components/Modal/modal";

const Modals = ({ isModalOpen, modalType, toggleOffModal }) => (
  <>
    {isModalOpen && modalType === "signin" && (
      <Modal toggleOff={toggleOffModal}>
        <h1>Sign in page</h1>
      </Modal>
    )}
    {isModalOpen && modalType === "signup" && (
      <Modal toggleOff={toggleOffModal}>
        <h1>Sign up page</h1>
      </Modal>
    )}
  </>
);

export default Modals;
