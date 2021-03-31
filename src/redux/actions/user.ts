import { UserActionTypes } from "@/types/user";
import { Dispatch } from "redux";

export const changeUsernameAsync = (username: string) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: UserActionTypes.CHANGE_USERNAME, payload: username });
  } catch (e) {
    dispatch({ type: UserActionTypes.CHANGE_USERNAME_ERROR });
  }
};

export const clearUsername = () => ({
  type: UserActionTypes.CLEAR_USERNAME,
  payload: null,
});
