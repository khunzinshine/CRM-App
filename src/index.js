import React from "react";
import { Provider } from "react-redux";
import App from "./App";
import { AuthContextProvider } from "./context/authContext";
import { createRoot } from "react-dom/client";
import store from "./features/index";
const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </AuthContextProvider>
  </React.StrictMode>
);
