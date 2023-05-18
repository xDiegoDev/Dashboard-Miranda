import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import WrappedApp from "./App";
import { store } from "./store/store.tsx";
import { Provider } from "react-redux";

import { AuthProvider } from "./contexts/AuthContext.tsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <AuthProvider>
      <WrappedApp />
    </AuthProvider>
  </Provider>
);
