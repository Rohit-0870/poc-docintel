import { useEffect, useRef, useState } from "react";
import { 
  MemoryRouter, 
  Routes, 
  Route, 
  NavLink, 
  useNavigate, 
  useLocation 
} from "react-router-dom";
import { defaultConfig } from "./config/uiConfig";

/**
 * SUB-COMPONENT: Upload Page
 */
const UploadPage = ({ labels, brandColor, onUpload, isProcessing }) => (
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
        onClick={onUpload}
        disabled={isProcessing}
        className={`mt-4 px-8 py-3 rounded-full font-bold bg-white text-slate-900 shadow-xl hover:scale-105 active:scale-95 transition-transform ${isProcessing ? 'animate-pulse' : ''}`}
      >
        {isProcessing ? "Processing..." : "Select File to Start"}
      </button>
    </div>
    <p className="text-center text-xs opacity-50">Supported formats: PDF, PNG, JPG</p>
  </div>
);

/**
 * SUB-COMPONENT: Results Page
 */
const ResultsPage = ({ labels, brandColor }) => {
  const navigate = useNavigate(); // 👈 Hook for navigation

  return (
    <div className="grid gap-4 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          {/* 🔙 THE BACK BUTTON */}
          <button 
            onClick={() => navigate(-1)} 
            className="p-2 hover:bg-slate-700 rounded-full transition"
            title="Go Back"
          >
            ←
          </button>
          <h3 className="text-lg font-semibold">{labels.extracted}</h3>
        </div>
        <button className="text-sm underline" style={{ color: brandColor }}>Export JSON</button>
      </div>

      <div className="space-y-3">
        {[
          { label: "Invoice ID", val: "#INV-8821", conf: "99%" },
          { label: "Total Amount", val: "$1,240.00", conf: "98.5%" },
          { label: "Vendor", val: "MagicHub AI", conf: "94%" }
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
  );
};

/**
 * MAIN MODULE CONTENT
 */
function ModuleContent({ config, labels, brandColor }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleUpload = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      navigate("/results"); 
    }, 2000);
  };

  return (
    <div className="w-full h-full">
      {/* Header & Sub-Navigation */}
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-slate-700 pb-4 mb-6">
        <div className="flex items-center gap-4">
           {/* Global Back Button (Visible if not on home) */}
           {location.pathname !== "/" && (
             <button 
                onClick={() => navigate(-1)}
                className="text-xs bg-slate-700 px-2 py-1 rounded hover:bg-slate-600"
             >
               Back
             </button>
           )}
           <div>
            <h1 className="text-2xl font-bold" style={{ color: brandColor }}>
              {labels.title}
            </h1>
            <p className="text-sm opacity-60">Internal Routing Active</p>
          </div>
        </div>

        <nav className="flex bg-slate-800/50 p-1 rounded-lg">
          {[
            { name: "Upload", path: "/" },
            { name: "Results", path: "/results" },
            { name: "Settings", path: "/settings" }
          ].map((tab) => (
            <NavLink
              key={tab.path}
              to={tab.path}
              className={({ isActive }) => 
                `px-4 py-1.5 rounded-md text-sm transition-all ${
                  isActive ? "bg-white text-slate-900 shadow-sm" : "text-slate-400 hover:text-white"
                }`
              }
            >
              {tab.name}
            </NavLink>
          ))}
        </nav>
      </header>

      <Routes>
        <Route path="/" element={
          <UploadPage 
            labels={labels} 
            brandColor={brandColor} 
            onUpload={handleUpload} 
            isProcessing={isProcessing} 
          />
        } />
        <Route path="/results" element={
          <ResultsPage labels={labels} brandColor={brandColor} />
        } />
        <Route path="/settings" element={
          <div className="p-6 rounded-xl border border-slate-700 bg-slate-800/20">
            <h3 className="text-lg font-semibold mb-2">Module Settings</h3>
            <button 
              onClick={() => navigate("/")} 
              className="text-sm text-cyan-400 underline"
            >
              Return to Home
            </button>
          </div>
        } />
      </Routes>
    </div>
  );
}

/**
 * ROOT EXPORT
 */
export default function App({ config = defaultConfig }) {
  const rootRef = useRef(null);
  const [theme, setTheme] = useState(config.theme);
  const [labels, setLabels] = useState(config.labels);
  const [brandColor, setBrandColor] = useState(config.brandColor);

  useEffect(() => {
    if (!config) return;
    setTheme(config.theme);
    setLabels(config.labels);
    setBrandColor(config.brandColor);
  }, [config]);

  useEffect(() => {
    if (!rootRef.current) return;
    rootRef.current.className = `w-full h-full p-6 transition-all min-h-[500px] ${
      theme === "dark" ? "dark bg-slate-900 text-white" : "bg-white text-slate-900"
    }`;
  }, [theme]);

  return (
    <div ref={rootRef}>
      <MemoryRouter>
        <ModuleContent 
          labels={labels} 
          brandColor={brandColor} 
        />
      </MemoryRouter>
    </div>
  );
}