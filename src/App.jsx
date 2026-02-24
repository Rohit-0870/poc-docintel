import { useEffect, useRef, useState } from "react";
import { defaultConfig } from "./config/uiConfig";

export default function App({ config = defaultConfig }) {
  const rootRef = useRef(null);

  const [theme, setTheme] = useState(config.theme);
  const [labels, setLabels] = useState(config.labels);
  const [brandColor, setBrandColor] = useState(config.brandColor);
  const [page, setPage] = useState("upload");

  // Sync with MagicHub updates
  useEffect(() => {
    setTheme(config.theme);
    setLabels(config.labels);
    setBrandColor(config.brandColor);
  }, [config]);

  // Apply styles to the container
  useEffect(() => {
    if (!rootRef.current) return;
    rootRef.current.className = theme === "dark" ? "dark bg-slate-900 text-white" : "bg-white text-black";
    // We set a CSS variable for the brand color
    rootRef.current.style.setProperty("--brand-color", brandColor);
  }, [theme, brandColor]);

  return (
    <div ref={rootRef} className="w-full h-full p-6 space-y-6 transition-all min-h-[400px]">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold" style={{ color: brandColor }}>
          {labels.title}
        </h1>
      </header>

      {page === "upload" && (
        <div 
          className="p-10 rounded-xl shadow-lg transition-colors duration-300"
          style={{ backgroundColor: brandColor }} // 🚩 Changes the box color based on MagicHub
        >
          <button
            className="border-2 border-dashed border-white/50 w-full p-12 rounded-lg text-white hover:bg-white/10 transition"
          >
            <div className="text-4xl mb-2">📄</div>
            <div className="font-bold">{labels.upload}</div>
            <p className="text-xs text-white/70">Controlled by MagicHub</p>
          </button>
        </div>
      )}
    </div>
  );
}