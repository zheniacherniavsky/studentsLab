import { ProductsAction, ProductsActionTypes, ProductsState } from "@/types/products";

const initialState: ProductsState = {
  willUpdate: false,
};

const productsReducer = (state = initialState, action: ProductsAction): ProductsState => {
  switch (action.type) {
    case ProductsActionTypes.UPDATE_PRODUCTS:
      return { ...state, willUpdate: action.payload };
    default:
      return state;
  }
};

export default productsReducer;
