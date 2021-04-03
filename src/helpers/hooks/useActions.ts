import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as UserActions from "@/redux/actions/user";

const actions = {
  ...UserActions,
};

const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};

export default useActions;
