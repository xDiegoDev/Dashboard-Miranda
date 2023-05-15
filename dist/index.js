import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import WrappedApp from "./App";
import store from "./store/store";
import { Provider } from "react-redux";
import { AuthProvider } from "./contexts/AuthContext.tsx";
var root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(Provider, { store: store },
    React.createElement(AuthProvider, null,
        React.createElement(WrappedApp, null))));
