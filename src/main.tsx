import React from "react";
import * as ReactDom from "react-dom";
import { BrowserRouter } from "react-router-dom";
import UseRoutes from "./routes";
import Footer from "./Components/footer";
import NavBar from "./Components/navbar";
// import ErrorChecker from "./Components/ErrorChecker";

// Styles
import "@/styles/styles.scss";
import "@/Pages/pages.scss";
import Modal from "./Components/Modal/modal";

interface IMyComponentState {
  isModalOpen: boolean;
  modalType: string;
}

class App extends React.Component<any, IMyComponentState> {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      modalType: "",
    };
  }

  componentDidCatch(error) {
    /* modal window with error in future */
    alert(error); // is it simple alert?

    console.error("UI ERROR:", error); // how i remember, console.error is disabled in configurations
    window.location.assign("/");
  }

  toggleOnModal = (type) => {
    this.setState({ modalType: type });
    this.setState({ isModalOpen: true });
  };

  toggleOffModal = () => {
    this.setState({ modalType: "" });
    this.setState({ isModalOpen: false });
  };

  render() {
    const routes = UseRoutes();
    return (
      <>
        {this.state.isModalOpen && this.state.modalType === "signin" && (
          <Modal toggleOff={this.toggleOffModal}>
            <h1>Sign in page</h1>
          </Modal>
        )}
        {this.state.isModalOpen && this.state.modalType === "signup" && (
          <Modal toggleOff={this.toggleOffModal}>
            <h1>Sign up page</h1>
          </Modal>
        )}
        <BrowserRouter>
          <NavBar title="Game Store" modalToggle={this.toggleOnModal} />
          <div className="pages_container">{routes}</div>
          {/* <ErrorChecker error /> */}
          <Footer />
        </BrowserRouter>
      </>
    );
  }
}

ReactDom.render(<App />, document.getElementById("app"));
