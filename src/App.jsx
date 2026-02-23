import { useEffect, useState } from "react";
import { defaultConfig } from "./config/uiConfig";
import { extractedData } from "./data/dummyData";

export default function App({ config = defaultConfig }) {
  const [theme, setTheme] = useState(config.theme || "light");
  const [page, setPage] = useState("upload");

  useEffect(() => {
    document.documentElement.className = theme;
    document.documentElement.style.setProperty(
      "--brand-color",
      config.brandColor || "#6366f1"
    );
  }, [theme]);

  return (
    <div className="w-full h-full bg-bg text-text p-6 space-y-6">

      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-brand">
          {config.labels.title}
        </h1>

        <div className="space-x-2">
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="px-3 py-2 rounded bg-brand text-white"
          >
            Theme
          </button>

          <button
            onClick={() => setPage("upload")}
            className="px-3 py-2 border rounded"
          >
            Upload
          </button>

          <button
            onClick={() => setPage("results")}
            className="px-3 py-2 border rounded"
          >
            Results
          </button>
        </div>
      </header>

      {page === "upload" && (
        <div className="bg-card p-6 rounded-xl shadow">
          <button
            onClick={() => setPage("results")}
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