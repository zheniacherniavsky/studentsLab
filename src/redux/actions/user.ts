import { UserAction, UserActionTypes } from "@/types/user";
import { Dispatch } from "redux";

export const changeUsernameAsync = (username: string) => async (dispatch: Dispatch<UserAction>) => {
  try {
    dispatch({ type: UserActionTypes.CHANGE_USERNAME, payload: username });
  } catch (e) {
    dispatch({ type: UserActionTypes.CHANGE_USERNAME_ERROR, payload: null });
  }
};

export const clearUsername = () => ({
  type: UserActionTypes.CLEAR_USERNAME,
  payload: null,
});
