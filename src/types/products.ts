export enum ProductsActionTypes {
  UPDATE_PRODUCTS = "UPDATE_PRODUCTS",
}

export interface ProductsState {
  willUpdate: boolean;
}

interface UpdateProducts {
  type: ProductsActionTypes.UPDATE_PRODUCTS;
  payload: boolean;
}
export type ProductsAction = UpdateProducts;
