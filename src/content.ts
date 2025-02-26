const getRiskColor = (riskPercent: number) => {
  if (riskPercent <= 20) return { color: "#28a745", label: "Safe" };
  if (riskPercent <= 40) return { color: "#ffc107", label: "Caution" };
  if (riskPercent <= 60) return { color: "#fd7e14", label: "Risky" };
  if (riskPercent <= 80) return { color: "#dc3545", label: "Dangerous" };
  return { color: "#8b0000", label: "Highly Dangerous" };
};

document.addEventListener("mouseover", (event: MouseEvent) => {
  chrome.storage.local.get("extensionEnabled", (data) => {
    if (!data.extensionEnabled) return; // Stop if disabled

    const target = event.target as HTMLAnchorElement;

    if (target.tagName === "A" && target.href) {
      const riskPercent = Math.floor(Math.random() * 101); // Replace with actual risk calculation
      const { color, label } = getRiskColor(riskPercent);

      const popup = document.createElement("div");
      popup.id = "scameye-popup";
      popup.innerHTML = `
      <div style="
      display: flex; 
      align-items: center; 
      gap: 8px;
      font-family: Arial, sans-serif;
      background: white;
      border-radius: 10px;
      padding: 12px;
      position: fixed;
      top: ${event.clientY + 10}px;
      left: ${event.clientX + 10}px;
      z-index: 9999;
      box-shadow: 0px 4px 10px rgba(0,0,0,0.2);
      border-left: 5px solid ${color};
      max-width: 280px;
      word-wrap: break-word;
      overflow-wrap: break-word;
    ">
  <img src="${chrome.runtime.getURL(
    "logo.png"
  )}" alt="ScamEye Logo" style="width: 24px; height: 24px;">
  
  <div style="max-width: 100%;">
    <p style="margin: 0; font-size: 14px; color: #262626; font-weight: bold; white-space: normal;">
      Checking risk for:
    </p>
    <p style="margin: 0; font-size: 12px; color: #555; white-space: normal; word-wrap: break-word; overflow-wrap: break-word;">
      ${target.href}
    </p>
    <p style="margin: 0; font-size: 14px; font-weight: bold; color: ${color}; white-space: normal;">
      ${label} (${riskPercent}%)
    </p>
  </div>
</div>

    `;

      document.body.appendChild(popup);

      target.addEventListener("mouseleave", () => {
        popup.remove();
      });
    }
  });
});
