import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import WrappedApp from "./App.tsx";
import { store } from "./store/store.tsx";
import { Provider } from "react-redux";

import { AuthProvider } from "./contexts/AuthContext.tsx";

const rootElement = document.getElementById("root");

if (!rootElement) throw new Error("No root element found");

const root = ReactDOM.createRoot(rootElement);

root.render(
  <Provider store={store}>
    <AuthProvider>
      <WrappedApp />
    </AuthProvider>
  </Provider>
);
