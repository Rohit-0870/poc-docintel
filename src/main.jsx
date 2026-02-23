import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

let embeddedRoot = null;

// SDK embed mode (MagicHub)
window.DocumentIntelUI = {
  mount(el, config) {
    if (!el) return;

    // Create root once
    if (!embeddedRoot) {
      embeddedRoot = ReactDOM.createRoot(el);
    }

    // Re-render with new config (reactive updates!)
    embeddedRoot.render(
      <React.StrictMode>
        <App config={config} />
      </React.StrictMode>
    );
  },
};

// Standalone mode (local + Vercel)
const standaloneRoot = document.getElementById("root");

if (standaloneRoot && !standaloneRoot.hasChildNodes()) {
  ReactDOM.createRoot(standaloneRoot).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}