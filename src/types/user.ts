export enum UserActionTypes {
  CHANGE_USERNAME = "CHANGE_USERNAME",
  CHANGE_USERNAME_ERROR = "CHANGE_USERNAME_ERROR",
  CLEAR_USERNAME = "CLEAR_USERNAME",
}

export interface UserState {
  username: null | string;
}

interface ChangeUsernameAsync {
  type: UserActionTypes.CHANGE_USERNAME | UserActionTypes.CHANGE_USERNAME_ERROR;
  payload: string | null;
}

interface ClearUsername {
  type: UserActionTypes.CLEAR_USERNAME;
  payload: null;
}

export type UserAction =
  | ChangeUsernameAsync //
  | ClearUsername;
