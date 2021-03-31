import { combineReducers } from "redux";
import modalReducer from "./modalReducer";
import userReducer from "./userReducer";

export const rootReducer = combineReducers({
  user: userReducer,
  modal: modalReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
