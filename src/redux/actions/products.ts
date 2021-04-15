/* eslint-disable import/prefer-default-export */

import getProducts from "@/api/apiGetProducts";
import IProduct from "@/api/product.d";
import { ProductsActions, ProductsActionsTypes } from "@/types/products";
import { Dispatch } from "redux";

export const loadProducts = (
  search: string,
  platform: string,
  criteria: string,
  type: string,
  genre: string,
  age: string,
  loaderState: React.Dispatch<React.SetStateAction<boolean>>
) => (dispatch: Dispatch<ProductsActions>) => {
  try {
    loaderState(true);
    getProducts(search, platform, criteria, type, genre, age).then((result: IProduct[]) => {
      dispatch({ type: ProductsActionsTypes.LOAD_PRODUCTS, payload: result });
      loaderState(false);
    });
  } catch (e) {
    console.warn("Failed load products!");
    dispatch({ type: ProductsActionsTypes.LOAD_PRODUCTS, payload: [] });
  }
};
