/* eslint-disable import/prefer-default-export */
import { ProductsAction, ProductsActionTypes } from "@/types/products";
import { Dispatch } from "redux";

export const updateProducts = (status: boolean) => (dispatch: Dispatch<ProductsAction>) => {
  try {
    dispatch({ type: ProductsActionTypes.UPDATE_PRODUCTS, payload: status });
  } catch (e) {
    dispatch({ type: ProductsActionTypes.UPDATE_PRODUCTS, payload: false });
  }
};
