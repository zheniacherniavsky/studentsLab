import React from "react";
import * as ReactDom from "react-dom";
import { BrowserRouter } from "react-router-dom";
import UseRoutes from "./routes";
import Footer from "./Components/footer";
import NavBar from "./Components/navbar";
import Modals from "./Components/Modal/modals";
// import ErrorChecker from "./Components/ErrorChecker";

// Styles
import "@/styles/styles.scss";
import "@/Pages/pages.scss";

interface IMyComponentState {
  isModalOpen: boolean;
  modalType: string;
  username: string;
}

class App extends React.Component<any, IMyComponentState> {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      modalType: "",
      username: null,
    };
  }

  componentDidCatch(error) {
    /* modal window with error in future */
    alert(error); // is it simple alert?

    console.error("UI ERROR:", error); // how i remember, console.error is disabled in configurations
    window.location.assign("/");
  }

  setNickname = (nick) => {
    this.setState({ username: nick });
  };

  toggleOnModal = (type) => {
    this.setState({ modalType: type });
    this.setState({ isModalOpen: true });
  };

  toggleOffModal = () => {
    this.setState({ modalType: "" });
    this.setState({ isModalOpen: false });
  };

  render() {
    const routes = UseRoutes(this.state.username, this.toggleOnModal);

    return (
      <>
        <BrowserRouter>
          <Modals
            isModalOpen={this.state.isModalOpen}
            modalType={this.state.modalType}
            toggleOffModal={this.toggleOffModal}
            setNickname={this.setNickname}
          />
          <NavBar
            title="Game Store"
            modalToggle={this.toggleOnModal}
            username={this.state.username}
            setUsername={this.setNickname}
          />
          <div className="pages_container">{routes}</div>
          {/* <ErrorChecker error /> */}
          <Footer />
        </BrowserRouter>
      </>
    );
  }
}

ReactDom.render(<App />, document.getElementById("app"));
