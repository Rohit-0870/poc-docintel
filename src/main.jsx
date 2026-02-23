import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// SDK embed mode
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

// Standalone mode (Vercel/local)
const root = document.getElementById("root");

// Auto mount ONLY when no one else mounted it
if (root && !root.hasChildNodes()) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}