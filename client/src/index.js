import React from "react";
import ReactDOM from "react-dom";
import "./styles/main.css";
import App from "./App";
import "@fortawesome/fontawesome-free/css/all.min.css";
import AuthProvder from "./provider/auth/authProvider";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvder>
      <App />
    </AuthProvder>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
