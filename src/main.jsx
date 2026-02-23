import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// SDK mode (for MagicHub)
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

// Local dev mode
const localRoot = document.getElementById("root");

if (localRoot && !window.__DOC_INTEL_SDK__) {
  ReactDOM.createRoot(localRoot).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}