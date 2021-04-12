import { UserAction, UserActionTypes, UserState } from "@/types/user";

const initialState: UserState = {
  username: null,
  isAdmin: false,
};

const userReducer = (state = initialState, action: UserAction): UserState => {
  switch (action.type) {
    case UserActionTypes.CHANGE_USERNAME:
      return { ...state, username: action.payload };
    case UserActionTypes.CHANGE_USERNAME_ERROR:
      return { ...state, username: null };
    case UserActionTypes.CLEAR_USERNAME:
      return { ...state, username: action.payload };
    case UserActionTypes.SET_ADMIN_STATUS:
      return { ...state, isAdmin: action.payload };
    default:
      return state; // console.warn
  }
};

export default userReducer;
