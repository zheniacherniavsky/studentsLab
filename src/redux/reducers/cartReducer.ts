import IProduct from "@/api/product";
import { CartAction, CartActionTypes, CartState } from "@/types/cart";

const initialState: CartState = {
  products: [],
  count: 0,
};

const sortByName = (p1: { product: IProduct; count: number }, p2: { product: IProduct; count: number }) => {
  if (p1.product.name[0] < p2.product.name[0]) return -1;
  return 1;
};

const userReducer = (state = initialState, action: CartAction): CartState => {
  let array: Array<{ product: IProduct; count: number }> = [];
  let flag = false;

  switch (action.type) {
    case CartActionTypes.ADD_TO_CART:
      flag = false;
      state.products.forEach((value) => {
        if (value.product.name === action.payload.name) flag = true;
      });
      if (flag) return state;
      return {
        ...state,
        products: [...state.products, { product: action.payload, count: 1 }].sort(sortByName),
        count: state.count + 1,
      };
    case CartActionTypes.REMOVE_FROM_CART:
      if (action.payload.length !== 0) {
        array = state.products;
        action.payload.forEach((p) => {
          array = array.filter((v) => {
            if (v.product.name !== p.name) return v;
            return null;
          });
        });
        return {
          ...state,
          products: [...array].sort(sortByName),
          count: state.count - action.payload.length,
        };
      }
      return state;
    case CartActionTypes.CHANGE_PRODUCT_COUNT:
      array = state.products;
      array = array.filter((v) => {
        if (v.product.name !== action.payload.product.name) return v;
        return null;
      });
      return {
        ...state,
        products: [...array, action.payload].sort(sortByName),
      };
    case CartActionTypes.CLEAR_CART:
      return initialState;
    default:
      return state; // console.warn
  }
};

export default userReducer;
