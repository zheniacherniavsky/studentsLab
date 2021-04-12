import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as UserActions from "@/redux/actions/user";
import * as CartActions from "@/redux/actions/cart";
import * as ProductsActions from "@/redux/actions/product";

const actions = {
  ...UserActions,
  ...CartActions,
  ...ProductsActions,
};

const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};

export default useActions;
