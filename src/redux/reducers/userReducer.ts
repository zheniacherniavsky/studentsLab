import { UserAction, UserActionTypes, UserState } from "@/types/user";

const initialState: UserState = {
  username: null,
};

const userReducer = (state = initialState, action: UserAction): UserState => {
  switch (action.type) {
    case UserActionTypes.CHANGE_USERNAME:
      return { username: action.payload };
    case UserActionTypes.CHANGE_USERNAME_ERROR:
      return { username: null };
    case UserActionTypes.CLEAR_USERNAME:
      return { username: action.payload };
    default:
      return state; // console.warn
  }
};

export default userReducer;
