export const enum UserActionTypes {
  CHANGE_USERNAME = "CHANGE_USERNAME",
  CHANGE_USERNAME_ERROR = "CHANGE_USERNAME_ERROR",
  SET_ADMIN_STATUS = "SET_ADMIN_STATUS",
  CLEAR_USERNAME = "CLEAR_USERNAME",
}

export interface UserState {
  username: null | string;
  isAdmin: boolean;
}

interface ChangeUsernameAsync {
  type: UserActionTypes.CHANGE_USERNAME | UserActionTypes.CHANGE_USERNAME_ERROR;
  payload: string | null;
}

interface ClearUsername {
  type: UserActionTypes.CLEAR_USERNAME;
  payload: null;
}

interface SetAdminStatus {
  type: UserActionTypes.SET_ADMIN_STATUS;
  payload: boolean;
}

export type UserAction =
  | ChangeUsernameAsync //
  | ClearUsername
  | SetAdminStatus;
