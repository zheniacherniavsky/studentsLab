// eslint-disable-next-line no-use-before-define
import React from "react";
import ReactDom from "react-dom";
import "./style/styles.css";

function HelloWorld(props) {
  return <h1>Hello world, {props.name}</h1>;
}

function App() {
  return (
    <div className="header">
      <HelloWorld name="Yauheni" />
    </div>
  );
}

ReactDom.render(<App />, document.getElementById("app"));
