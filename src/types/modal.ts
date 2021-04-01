export enum ModalActionTypes {
  TOGGLE_SIGNIN_MODAL = "TOGGLE_SIGNIN_MODAL",
  TOGGLE_SIGNUP_MODAL = "TOGGLE_SIGNUP_MODAL",
  CLOSE_INFO_MODAL = "CLOSE_INFO_MODAL",
  SHOW_INFO_MODAL = "SHOW_INFO_MODAL",
}

export interface ModalState {
  showSignInModal: boolean;
  showSignUpModal: boolean;
  showInfoModal: boolean;
  infoModalHeader?: string;
  infoModalText?: string;
  infoModalType?: string;
  infoModalCallback?: () => void;
}

interface ToggleSignInModal {
  type: ModalActionTypes.TOGGLE_SIGNIN_MODAL;
  payload: boolean;
}

interface ToggleSignUpModal {
  type: ModalActionTypes.TOGGLE_SIGNUP_MODAL;
  payload: boolean;
}

interface CloseInfoModal {
  type: ModalActionTypes.CLOSE_INFO_MODAL;
  payload: boolean;
}

interface ShowInfoModal {
  type: ModalActionTypes.SHOW_INFO_MODAL;
  payload: {
    header: string;
    text: string;
    type: string;
    callback: () => void;
  };
}

export type ModalAction =
  | ToggleSignInModal //
  | ToggleSignUpModal
  | CloseInfoModal
  | ShowInfoModal;
