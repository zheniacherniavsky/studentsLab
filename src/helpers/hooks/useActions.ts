import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as UserActions from "@/redux/actions/user";
import * as CartActions from "@/redux/actions/cart";

const actions = {
  ...UserActions,
  ...CartActions,
};

const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};

export default useActions;
