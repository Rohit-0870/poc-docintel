import { useEffect, useRef, useState } from "react";
import { defaultConfig } from "./config/uiConfig";
import { fetchExtractionData } from "./api/mockApi";

export default function App({ config = defaultConfig }) {
  const rootRef = useRef(null);
  const [theme, setTheme] = useState(config.theme || "light");
  const [page, setPage] = useState("upload");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!rootRef.current) return;

    rootRef.current.className = theme === "dark" ? "dark" : "";
    rootRef.current.style.setProperty(
      "--brand-color",
      config.brandColor || "#6366f1"
    );
  }, [theme]);

  const loadResults = async () => {
    setLoading(true);
    const res = await fetchExtractionData();
    setData(res);
    setLoading(false);
    setPage("results");
  };

  return (
    <div
      ref={rootRef}
      className="w-full h-full bg-bg text-text p-6 space-y-6"
    >
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
            onClick={loadResults}
            className="px-3 py-2 border rounded"
          >
            Results
          </button>
        </div>
      </header>

      {page === "upload" && (
        <div className="bg-card p-6 rounded-xl shadow">
          <button
            onClick={loadResults}
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

          {loading && <p>Loading data...</p>}

          {!loading && (
            <div className="grid md:grid-cols-2 gap-4">
              {data.map((item) => (
                <div
                  key={item.field}
                  className="p-4 border rounded-lg"
                >
                  <p className="text-sm opacity-70">{item.field}</p>
                  <p className="font-semibold">{item.value}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}