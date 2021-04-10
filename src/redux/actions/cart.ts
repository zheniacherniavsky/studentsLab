import IProduct from "@/api/product";
import { CartActionTypes } from "@/types/cart";

export const addProductToCart = (product: IProduct) => ({
  type: CartActionTypes.ADD_TO_CART,
  payload: product,
});

export const removeProductFromCart = (products: IProduct[]) => ({
  type: CartActionTypes.REMOVE_FROM_CART,
  payload: products,
});

export const changeProductCount = (product: { product: IProduct; count: number }) => ({
  type: CartActionTypes.CHANGE_PRODUCT_COUNT,
  payload: product,
});

export const clearCart = () => ({
  type: CartActionTypes.CLEAR_CART,
  payload: null,
});
