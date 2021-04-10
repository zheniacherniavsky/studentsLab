import IProduct from "@/api/product";

export enum CartActionTypes {
  ADD_TO_CART = "ADD_TO_CART",
  REMOVE_FROM_CART = "REMOVE_FROM_CART",
  CHANGE_PRODUCT_COUNT = "CHANGE_PRODUCT_COUNT",
  CLEAR_CART = "CLEAR_CART",
}

export interface CartState {
  products: Array<{ product: IProduct; count: number }>;
  count: number;
}

interface AddProductToCart {
  type: CartActionTypes.ADD_TO_CART;
  payload: IProduct;
}

interface RemoveProductFromCart {
  type: CartActionTypes.REMOVE_FROM_CART;
  payload: IProduct[];
}

interface ChangeProductCount {
  type: CartActionTypes.CHANGE_PRODUCT_COUNT;
  payload: { product: IProduct; count: number };
}

interface ClearCart {
  type: CartActionTypes.CLEAR_CART;
  payload: null;
}

export type CartAction =
  | AddProductToCart //
  | RemoveProductFromCart
  | ChangeProductCount
  | ClearCart;
