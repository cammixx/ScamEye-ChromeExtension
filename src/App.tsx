import { useEffect, useState } from "react";
import "./App.css";

const App: React.FC = () => {
  const [enabled, setEnabled] = useState<boolean>(false);

  useEffect(() => {
    chrome.storage.local.get(
      "extensionEnabled",
      (data: { extensionEnabled: boolean }) => {
        setEnabled(data.extensionEnabled || false);
      }
    );
  }, []);

  const toggleExtension = () => {
    const newState = !enabled;
    chrome.storage.local.set({ extensionEnabled: newState });
    setEnabled(newState);
  };

  return (
    <div className="container p-4 text-center shadow-lg rounded bg-white">
      <img src="/logo.png" alt="ScamEye Logo" className="logo mb-2" />

      <h2 className="fw-bold text-primary">ScamEye</h2>
      <p className="text-muted">Stay Safe Online – Detect Fraud Links</p>

      <button
        className={`btn ${enabled ? "btn-success" : "btn-danger"} w-100 my-3`}
        onClick={toggleExtension}
      >
        {enabled ? "Disable Extension" : "Enable Extension"}
      </button>

      <div className="info-box p-2 rounded bg-light">
        <p className="text-dark small">
          Hover over links to check fraud risk before clicking.
        </p>
      </div>

      <footer className="mt-2 small text-muted">
        <a
          href="https://github.com/s-s01tan/scam-eye-chrome-extension"
          target="_blank"
          className="text-decoration-none"
        >
          View on GitHub
        </a>
      </footer>
    </div>
  );
};

export default App;
