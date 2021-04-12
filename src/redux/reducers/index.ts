import { combineReducers } from "redux";
import userReducer from "./userReducer";
import cartReducer from "./cartReducer";
import productsReducer from "./productsReducer";

export const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  products: productsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
