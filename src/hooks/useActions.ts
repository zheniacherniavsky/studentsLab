import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as UserActions from "@/redux/actions/user";

const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(UserActions, dispatch);
};

export default useActions;
