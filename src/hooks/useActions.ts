import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as UserActions from "@/redux/actions/user";
import * as ModalActions from "@/redux/actions/modal";

const actions = {
  ...UserActions,
  ...ModalActions,
};

const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};

export default useActions;
