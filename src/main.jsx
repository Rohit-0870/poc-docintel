import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// CDN / SDK mode
window.DocumentIntelUI = {
  mount(el, config) {
    if (!el) {
      console.error("Mount element not provided");
      return;
    }

    ReactDOM.createRoot(el).render(
      <React.StrictMode>
        <App config={config} />
      </React.StrictMode>
    );
  },
};

// Local development mode
const localRoot = document.getElementById("root");

// Only auto render when NOT loaded as CDN
if (localRoot && !window.__DOC_INTEL_EMBEDDED__) {
  ReactDOM.createRoot(localRoot).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}