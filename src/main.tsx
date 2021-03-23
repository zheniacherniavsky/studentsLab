import React from "react";
import * as ReactDom from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Context from "@/api/context";
import UseRoutes from "@/routes";
import Footer from "@/Components/footer";
import NavBar from "@/Components/navbar";
import Modals from "@/Components/Modal/modals";
// import ErrorChecker from "./Components/ErrorChecker";

// Styles
import "@/styles/styles.scss";
import "@/styles/pages.scss";

interface IMyComponentState {
  isModalOpen: boolean;
  modalType: string;
  username: string | null;
}

class App extends React.Component<any, IMyComponentState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isModalOpen: false,
      modalType: "",
      username: null,
    };
  }

  componentDidCatch(error: any) {
    /* modal window with error in future */
    alert(error); // is it simple alert?

    console.error("UI ERROR:", error); // how i remember, console.error is disabled in configurations
    window.location.assign("/");
  }

  setNickname = (nick: string) => {
    this.setState({ username: nick });
  };

  toggleOnModal = (type: string) => {
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
        <Context.Provider
          value={{
            // modal windows
            toggleOnModal: this.toggleOnModal,
            toggleOffModal: this.toggleOffModal,
            isModalOpen: this.state.isModalOpen,
            modalType: this.state.modalType,

            // profile details
            username: this.state.username,
            setNickname: this.setNickname,
          }}
        >
          <BrowserRouter>
            <Modals />
            <NavBar title="Game Store" />
            <div className="pages_container">{routes}</div>
            {/* <ErrorChecker error /> */}
            <Footer />
          </BrowserRouter>
        </Context.Provider>
      </>
    );
  }
}

ReactDom.render(<App />, document.getElementById("app"));
