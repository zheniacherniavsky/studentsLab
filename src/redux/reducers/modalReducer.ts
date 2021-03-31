import { ModalAction, ModalActionTypes, ModalState } from "@/types/modal";

const initialState: ModalState = {
  showSignInModal: false,
  showSignUpModal: false,
  showInfoModal: false,
  infoModalHeader: undefined,
  infoModalText: undefined,
  infoModalType: undefined,
  infoModalCallback: undefined,
};

const modalReducer = (state = initialState, action: ModalAction): ModalState => {
  switch (action.type) {
    case ModalActionTypes.TOGGLE_SIGNIN_MODAL:
      return { ...state, showSignInModal: action.payload };
    case ModalActionTypes.TOGGLE_SIGNUP_MODAL:
      return { ...state, showSignUpModal: action.payload };
    case ModalActionTypes.CLOSE_INFO_MODAL:
      return { ...state, showInfoModal: action.payload };
    case ModalActionTypes.SHOW_INFO_MODAL:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default modalReducer;
