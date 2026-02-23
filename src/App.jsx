import { useEffect, useState } from "react";
import { defaultConfig } from "./config/uiConfig";
import { extractedData } from "./data/dummyData";

export default function App({ config = defaultConfig }) {
  const [theme, setTheme] = useState(config.theme);

  useEffect(() => {
    document.documentElement.className = theme;
    document.documentElement.style.setProperty(
      "--brand-color",
      config.brandColor
    );
  }, [theme]);

  return (
    <div className="min-h-screen bg-bg text-text p-6 transition-all">
      <div className="max-w-4xl mx-auto space-y-6">

        <header className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-brand">
            {config.labels.title}
          </h1>

          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="px-4 py-2 rounded-lg bg-brand text-white"
          >
            Toggle Theme
          </button>
        </header>

        <div className="bg-card p-6 rounded-xl shadow">
          <button className="border-2 border-dashed w-full p-10 rounded-lg text-center hover:border-brand transition">
            📄 {config.labels.upload}
          </button>
        </div>

        <div className="bg-card p-6 rounded-xl shadow">
          <h2 className="font-semibold mb-4">
            {config.labels.extracted}
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {extractedData.map((item) => (
              <div
                key={item.field}
                className="p-4 border rounded-lg hover:border-brand transition"
              >
                <p className="text-sm opacity-70">{item.field}</p>
                <p className="font-semibold">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}