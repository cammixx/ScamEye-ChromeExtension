import { useEffect, useState } from "react";
import "./App.css";

const App: React.FC = () => {
  const [enabled, setEnabled] = useState<boolean>(false);
  const [linksScanned, setLinksScanned] = useState<number>(0);
  const [threatLinks, setThreatLinks] = useState<number>(0);

  useEffect(() => {
    chrome.storage.local.get(
      "extensionEnabled",
      (data: { extensionEnabled: boolean }) => {
        setEnabled(data.extensionEnabled || false);
      }
    );

    const savedLinksScanned = localStorage.getItem("scameye-links-scanned");
    const savedThreatLinks = localStorage.getItem("scameye-threat-links");

    if (savedLinksScanned) {
      setLinksScanned(parseInt(savedLinksScanned));
    }

    if (savedThreatLinks) {
      setThreatLinks(parseInt(savedThreatLinks));
    }

    const updateStats = () => {
      const currentLinksScanned = localStorage.getItem("scameye-links-scanned");
      const currentThreatLinks = localStorage.getItem("scameye-threat-links");

      if (currentLinksScanned) {
        setLinksScanned(parseInt(currentLinksScanned));
      }

      if (currentThreatLinks) {
        setThreatLinks(parseInt(currentThreatLinks));
      }
    };

    const statsInterval = setInterval(updateStats, 1000);

    return () => {
      clearInterval(statsInterval);
    };
  }, []);

  const toggleExtension = () => {
    const newState = !enabled;
    chrome.storage.local.set({ extensionEnabled: newState });
    setEnabled(newState);
  };

  return (
    <div
      className="container p-4 d-flex flex-column align-items-center bg-white rounded-4 shadow"
      style={{ maxWidth: "320px" }}
    >
      <div
        className="header-container w-100 mb-3 rounded-4 p-3 text-center d-flex flex-column align-items-center"
        style={{
          background: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",
        }}
      >
        <div
          className="logo-container bg-white rounded-circle p-2 shadow-sm mb-2"
          style={{
            width: "60px",
            height: "60px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src="/logo.png"
            alt="ScamEye Logo"
            style={{ width: "40px", height: "40px" }}
          />
        </div>
        <h2 className="fw-bold text-white mb-0">ScamEye</h2>
        <p className="text-white opacity-75 small">Stay Safe Online</p>
      </div>

      <div className="w-100 bg-light rounded-4 p-3 mb-2">
        <div className="d-flex justify-content-between align-items-center">
          <span
            className={`status-label ${
              enabled ? "text-success fw-bold" : "text-muted"
            }`}
          >
            {enabled ? "Protection Active" : "Protection Disabled"}
          </span>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="enableSwitch"
              checked={enabled}
              onChange={toggleExtension}
              style={{
                width: "3rem",
                height: "1.5rem",
                cursor: "pointer",
                boxShadow: "none",
                backgroundColor: enabled ? "#10B981" : "#CBD5E1",
              }}
            />
          </div>
        </div>
      </div>

      <div className="info-card w-100 bg-light rounded-4 p-3 mb-2">
        <h6 className="fw-bold mb-2 d-flex align-items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="#6366F1"
            className="bi bi-shield-check me-2"
            viewBox="0 0 16 16"
          >
            <path d="M5.338 1.59a61 61 0 0 0-2.837.856.48.48 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.7 10.7 0 0 0 2.287 2.233c.346.244.652.42.893.533q.18.085.293.118a1 1 0 0 0 .808 0q.114-.033.294-.118c.24-.113.547-.29.893-.533a10.7 10.7 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.856C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.8 11.8 0 0 1-2.517 2.453 7 7 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7 7 0 0 1-1.048-.625 11.8 11.8 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 63 63 0 0 1 5.072.56z" />
            <path d="M10.854 5.146a.5.5 0 0 1 0 .708l-3.5 3.5a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L6.5 7.793l3.146-3.147a.5.5 0 0 1 .708 0z" />
          </svg>
          How it works
        </h6>
        <p className="text-muted small mb-0">
          Hover over any link while browsing to instantly check its risk score
          before clicking.
        </p>
      </div>

      <div className="stats-card w-100 bg-light rounded-4 p-3 mb-3">
        <div className="row text-center g-2">
          <div className="col-6">
            <div className="stat-box rounded-3 bg-white p-2">
              <div className="small text-muted">
                Links
                <br />
                Scanned
              </div>
              <div className="fw-bold text-primary">{linksScanned}</div>
            </div>
          </div>
          <div className="col-6">
            <div className="stat-box rounded-3 bg-white p-2">
              <div className="small text-muted">
                Threat
                <br />
                Links
              </div>
              <div className="fw-bold text-danger">{threatLinks}</div>
            </div>
          </div>
        </div>
      </div>

      <footer className="w-100 d-flex justify-content-between align-items-center mt-2">
        <a href="#" className="text-decoration-none small text-muted">
          Privacy Policy
        </a>
        <a
          href="https://github.com/s-s01tan/scam-eye-chrome-extension"
          target="_blank"
          className="text-decoration-none d-flex align-items-center small text-muted"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            fill="currentColor"
            className="bi bi-github me-1"
            viewBox="0 0 16 16"
          >
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.7-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
          </svg>
          GitHub
        </a>
      </footer>
    </div>
  );
};

export default App;
