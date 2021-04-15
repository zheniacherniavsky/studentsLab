import { ProductsActions, ProductsActionsTypes, ProductsState } from "@/types/products";

const initialState: ProductsState = {
  products: [],
};

const productsReducer = (state = initialState, action: ProductsActions): ProductsState => {
  switch (action.type) {
    case ProductsActionsTypes.LOAD_PRODUCTS:
      return { products: action.payload };
    default:
      return state; // console.warn
  }
};

export default productsReducer;
