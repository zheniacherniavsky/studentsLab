import IProduct from "@/api/product.d";

export const enum ProductsActionsTypes {
  LOAD_PRODUCTS = "LOAD_PRODUCTS",
}

export interface ProductsState {
  products: IProduct[];
}

interface LoadProducts {
  type: ProductsActionsTypes.LOAD_PRODUCTS;
  payload: IProduct[];
}

export type ProductsActions = LoadProducts;
