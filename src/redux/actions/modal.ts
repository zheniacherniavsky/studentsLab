import { ModalAction, ModalActionTypes } from "@/types/modal";
import { Dispatch } from "redux";

export const toggleSignInModal = (flag: boolean) => ({
  type: ModalActionTypes.TOGGLE_SIGNIN_MODAL,
  payload: flag,
});

export const toggleSignInModalAsync = (flag: boolean) => async (dispatch: Dispatch<ModalAction>) => {
  dispatch({ type: ModalActionTypes.TOGGLE_SIGNIN_MODAL, payload: flag });
};

export const toggleSignUpModal = (flag: boolean) => ({
  type: ModalActionTypes.TOGGLE_SIGNUP_MODAL,
  payload: flag,
});

export const toggleSignUpModalAsync = (flag: boolean) => async (dispatch: Dispatch<ModalAction>) => {
  dispatch({ type: ModalActionTypes.TOGGLE_SIGNUP_MODAL, payload: flag });
};

export const closeInfoModal = () => ({
  type: ModalActionTypes.CLOSE_INFO_MODAL,
  payload: false,
});

export const showInfoModal = (header?: string, text?: string, type?: string, callback?: () => void) => ({
  type: ModalActionTypes.SHOW_INFO_MODAL,
  payload: {
    showInfoModal: true,
    infoModalHeader: header,
    infoModalText: text,
    infoModalType: type,
    infoModalCallback: callback,
  },
});
