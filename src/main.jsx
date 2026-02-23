import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

window.DocumentIntelUI = {
  mount(el, config) {
    if (!el) return;

    ReactDOM.createRoot(el).render(
      <React.StrictMode>
        <App config={config} />
      </React.StrictMode>
    );
  },
};