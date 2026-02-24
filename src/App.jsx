import { useEffect, useRef, useState } from "react";
import { defaultConfig } from "./config/uiConfig";

export default function App({ config = defaultConfig }) {
  const rootRef = useRef(null);

  // State synced with Parent (MagicHub)
  const [theme, setTheme] = useState(config.theme);
  const [labels, setLabels] = useState(config.labels);
  const [brandColor, setBrandColor] = useState(config.brandColor);

  // Internal Local State
  const [page, setPage] = useState("upload"); // Simple routing: 'upload', 'results', 'settings'
  const [isProcessing, setIsProcessing] = useState(false);
  const [files, setFiles] = useState([]);

  // Sync with MagicHub updates
  useEffect(() => {
    if (!config) return;
    setTheme(config.theme);
    setLabels(config.labels);
    setBrandColor(config.brandColor);
  }, [config]);

  // Apply styles and theme classes
  useEffect(() => {
    if (!rootRef.current) return;
    rootRef.current.className = `w-full h-full p-6 space-y-6 transition-all min-h-[500px] ${
      theme === "dark" ? "dark bg-slate-900 text-white" : "bg-white text-slate-900"
    }`;
  }, [theme]);

  // Function to simulate document processing
  const handleUpload = () => {
    setIsProcessing(true);
    // Simulate a 2-second AI processing delay
    setTimeout(() => {
      setIsProcessing(false);
      setPage("results");
    }, 2000);
  };

  return (
    <div ref={rootRef}>
      {/* Header & Sub-Navigation */}
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-slate-700 pb-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: brandColor }}>
            {labels.title}
          </h1>
          <p className="text-sm opacity-60">Status: System Online</p>
        </div>

        <nav className="flex bg-slate-800/50 p-1 rounded-lg">
          {["upload", "results", "settings"].map((tab) => (
            <button
              key={tab}
              onClick={() => setPage(tab)}
              className={`px-4 py-1.5 rounded-md text-sm capitalize transition-all ${
                page === tab 
                  ? "bg-white text-slate-900 shadow-sm" 
                  : "text-slate-400 hover:text-white"
              }`}
              style={page === tab ? { backgroundColor: 'white' } : {}}
            >
              {tab}
            </button>
          ))}
        </nav>
      </header>

      {/* --- PAGE: UPLOAD --- */}
      {page === "upload" && (
        <div className="space-y-4 animate-in fade-in duration-500">
          <div 
            className="p-12 rounded-2xl shadow-2xl transition-all duration-500 flex flex-col items-center justify-center text-center border-4 border-transparent hover:border-white/20"
            style={{ backgroundColor: brandColor }}
          >
            <div className="bg-white/20 p-6 rounded-full mb-4">
              <span className="text-5xl">{isProcessing ? "⚙️" : "📄"}</span>
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-2">
              {isProcessing ? "Analyzing Document..." : labels.upload}
            </h2>
            
            <button
              onClick={handleUpload}
              disabled={isProcessing}
              className={`mt-4 px-8 py-3 rounded-full font-bold bg-white text-slate-900 shadow-xl hover:scale-105 active:scale-95 transition-transform ${isProcessing ? 'animate-pulse' : ''}`}
            >
              {isProcessing ? "Processing..." : "Select File to Start"}
            </button>
          </div>
          <p className="text-center text-xs opacity-50">Supported formats: PDF, PNG, JPG</p>
        </div>
      )}

      {/* --- PAGE: RESULTS --- */}
      {page === "results" && (
        <div className="grid gap-4 animate-in slide-in-from-bottom-4 duration-500">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">{labels.extracted}</h3>
            <button className="text-sm underline" style={{ color: brandColor }}>Export JSON</button>
          </div>
          
          <div className="space-y-3">
            {[
              { label: "Invoice ID", val: "#INV-8821", conf: "99%" },
              { label: "Total Amount", val: "$1,240.00", conf: "98.5%" },
              { label: "Vendor", val: "MagicHub Cloud Services", conf: "94%" }
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-lg bg-slate-800/40 border border-slate-700 flex justify-between">
                <div>
                  <p className="text-xs opacity-50 uppercase tracking-wider">{item.label}</p>
                  <p className="font-mono text-lg">{item.val}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs opacity-50">Confidence</p>
                  <p className="text-green-400 font-bold">{item.conf}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- PAGE: SETTINGS --- */}
      {page === "settings" && (
        <div className="p-6 rounded-xl border border-slate-700 bg-slate-800/20 animate-in fade-in">
          <h3 className="text-lg font-semibold mb-4">Module Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-slate-800/40 rounded-lg">
              <span>Auto-process uploads</span>
              <div className="w-10 h-5 bg-green-500 rounded-full relative">
                 <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>
            <p className="text-xs opacity-40 italic">Note: Visual theme and brand colors are controlled by the MagicHub parent dashboard.</p>
          </div>
        </div>
      )}
    </div>
  );
}