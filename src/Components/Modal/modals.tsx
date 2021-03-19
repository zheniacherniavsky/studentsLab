import Modal from "@/Components/Modal/modal";

const Modals = ({ isModalOpen, modalType, toggleOffModal }) => (
  <>
    {isModalOpen && modalType === "signin" && (
      <Modal toggleOff={toggleOffModal}>
        <div className="modal_container">
          <h1>Authorization</h1>
          <div className="modal_container__info">
            <p>Login</p>
            <input type="login" placeholder="" />
          </div>
          <div className="modal_container__info">
            <p>Password</p>
            <input type="password" placeholder="" />
          </div>
          <button type="button">Sign In</button>
        </div>
      </Modal>
    )}
    {isModalOpen && modalType === "signup" && (
      <Modal toggleOff={toggleOffModal}>
        <div className="modal_container">
          <h1>Registration</h1>
          <div className="modal_container__info">
            <p>Email</p>
            <input type="email" placeholder="example@exam.ple" />
          </div>
          <div className="modal_container__info">
            <p>Login</p>
            <input type="login" placeholder="Your future nickname" />
          </div>
          <div className="modal_container__info">
            <p>Password</p>
            <input type="password" placeholder="" />
          </div>
          <div className="modal_container__info">
            <p>Confirm password</p>
            <input type="password" placeholder="" />
          </div>
          <button type="button">Sign Up</button>
        </div>
      </Modal>
    )}
  </>
);

export default Modals;
