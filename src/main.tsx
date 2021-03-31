import * as ReactDom from "react-dom";
import { Provider } from "react-redux";
import App from "@/app";
import store from "./redux";

const initialProps = {
  showSignInModal: false,
  showSignUpModal: false,
  showInfoModal: false,
};

ReactDom.render(
  <Provider store={store}>
    <App {...initialProps} />
  </Provider>,
  document.getElementById("app")
);
