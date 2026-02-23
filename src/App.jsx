import { useEffect, useState } from "react";
import { defaultConfig } from "./config/uiConfig";
import { extractedData } from "./data/dummyData";

export default function App({ config = defaultConfig }) {
  const [theme, setTheme] = useState(config.theme);
  const [page, setPage] = useState("upload");

  useEffect(() => {
    document.documentElement.className = theme;
    document.documentElement.style.setProperty(
      "--brand-color",
      config.brandColor
    );
  }, [theme]);

  const go = (route) => {
    setPage(route);
    config.onNavigate?.(route); // notify MagicHub if needed
  };

  return (
    <div className="min-h-screen bg-bg text-text p-6">

      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-brand">
          {config.labels.title}
        </h1>

        <div className="space-x-2">
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="px-4 py-2 rounded bg-brand text-white"
          >
            Theme
          </button>

          <button
            onClick={() => go("upload")}
            className="px-3 py-2 border rounded"
          >
            Upload
          </button>

          <button
            onClick={() => go("results")}
            className="px-3 py-2 border rounded"
          >
            Results
          </button>
        </div>
      </header>

      {/* Pages */}

      {page === "upload" && (
        <div className="bg-card p-6 rounded-xl shadow">
          <button
            onClick={() => go("results")}
            className="border-2 border-dashed w-full p-12 rounded-lg hover:border-brand transition"
          >
            📄 {config.labels.upload}
          </button>
        </div>
      )}

      {page === "results" && (
        <div className="bg-card p-6 rounded-xl shadow">
          <h2 className="font-semibold mb-4">
            {config.labels.extracted}
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {extractedData.map((item) => (
              <div
                key={item.field}
                className="p-4 border rounded-lg"
              >
                <p className="text-sm opacity-70">{item.field}</p>
                <p className="font-semibold">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}