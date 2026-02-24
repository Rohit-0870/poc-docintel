import { useEffect, useState } from "react";
import { fetchExtractionData } from "./api/mockApi";

export default function App({ config }) {
  const [theme, setTheme] = useState(config.theme);
  const [labels, setLabels] = useState(config.labels);
  const [brandColor, setBrandColor] = useState(config.brandColor);
  const [uploadBoxColor, setUploadBoxColor] = useState(
    config.uploadBoxColor
  );

  const [page, setPage] = useState("upload");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    setTheme(config.theme);
    setLabels(config.labels);
    setBrandColor(config.brandColor);
    setUploadBoxColor(config.uploadBoxColor);
  }, [config]);

  // 🎨 Apply theme + brand globally
  useEffect(() => {
    document.documentElement.className =
      theme === "dark" ? "dark" : "";

    document.documentElement.style.setProperty(
      "--brand-color",
      brandColor
    );
  }, [theme, brandColor]);

  const loadResults = async () => {
    setLoading(true);
    const res = await fetchExtractionData();
    setData(res);
    setLoading(false);
    setPage("results");
  };

  return (
    <div className="w-full h-full bg-bg text-text p-6 space-y-6 transition-all">

      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-brand">
          {labels.title}
        </h1>
      </header>

      {page === "upload" && (
        <div
          className="p-6 rounded-xl shadow text-white transition-all"
          style={{ backgroundColor: uploadBoxColor }}
        >
          <button
            onClick={loadResults}
            className="border-2 border-white w-full p-12 rounded-lg"
          >
            📄 {labels.upload}
          </button>
        </div>
      )}

      {page === "results" && (
        <div className="bg-card p-6 rounded-xl shadow">
          <h2 className="font-semibold mb-4 text-brand">
            {labels.extracted}
          </h2>

          {loading && <p>Loading...</p>}

          {!loading && (
            <div className="grid md:grid-cols-2 gap-4">
              {data.map((item) => (
                <div
                  key={item.field}
                  className="p-4 border border-brand rounded-lg"
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