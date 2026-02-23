import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Normal app render (for local development)
const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

// CDN / SDK mount
window.DocumentIntelUI = {
  mount: (el, config) => {
    if (!el) return;
    ReactDOM.createRoot(el).render(<App config={config} />);
  },
};