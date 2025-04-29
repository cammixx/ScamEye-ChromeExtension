import { useEffect, useState } from "react";
import "./App.css";
import { FaQuestionCircle } from "react-icons/fa"; // Import icons
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { IoIosSpeedometer } from "react-icons/io";

const App: React.FC = () => {
  const [enabled, setEnabled] = useState<boolean>(false);
  const [showOnlyRiskyOnes, setShowOnlyRiskyOnes] = useState<boolean>(false);

  useEffect(() => {
    chrome.storage.local.get(
      "extensionEnabled",
      (data: { extensionEnabled: boolean }) => {
        setEnabled(data.extensionEnabled || false);
      }
    );
    chrome.storage.local.get(
      "showOnlyRiskyOnes",
      (data: { showOnlyRiskyOnes: boolean }) => {
        setShowOnlyRiskyOnes(data.showOnlyRiskyOnes || false);
      }
    );
  }, []);

  const toggleExtension = () => {
    const newState = !enabled;
    chrome.storage.local.set({ extensionEnabled: newState });
    setEnabled(newState);

    // when exension is disabled, set showOnlyRiskyOnes to false
    if (!newState) {
      chrome.storage.local.set({ showOnlyRiskyOnes: false });
      setShowOnlyRiskyOnes(false);
    }
  };

  const toggleShowOnlyRiskyOnes = () => {
    const newState = !showOnlyRiskyOnes;
    chrome.storage.local.set({ showOnlyRiskyOnes: newState });
    setShowOnlyRiskyOnes(newState);
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
        <div className="d-flex justify-content-between align-items-center">
          <span
            className={`status-label ${
              showOnlyRiskyOnes ? "text-success fw-bold" : "text-muted"
            }`}
          >
            {showOnlyRiskyOnes ? "Only Risky Links" : "Show All Links"}
          </span>
          <div className="form-check form-switch">
            <input
              disabled={!enabled}
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="showOnlyRiskyOnesSwitch"
              checked={showOnlyRiskyOnes}
              onChange={toggleShowOnlyRiskyOnes}
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
          <FaQuestionCircle className="me-2" fill="#6366F1" />
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
              <div className="small text-muted">Fast</div>
              <div className="fw-bold text-primary d-flex align-items-center justify-content-center">
                <IoIosSpeedometer className="fs-3" fill="purple" />
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="stat-box rounded-3 bg-white p-2">
              <div className="small text-muted">Secure</div>
              <div className="fw-bold text-danger d-flex align-items-center justify-content-center">
                <IoShieldCheckmarkSharp className="fs-3" fill="blue" />
              </div>
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
