document.addEventListener("DOMContentLoaded", () => {
  const qrReaderContainer = document.getElementById("qr-reader");
  const startScanButton = document.getElementById("start-scan");
  const totpList = document.getElementById("totp-list");

  let qrScanner;

  // Start the QR scanning process on button click
  startScanButton.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent any unintended page reload
    try {
      qrScanner = new Html5Qrcode("qr-reader");
      qrScanner
        .start(
          { facingMode: "environment" },
          { fps: 10, qrbox: { width: 300, height: 300 } },
          (decodedText) => {
            qrScanner.stop().then(() => console.log("QR Scanner stopped."));
            saveSecret(decodedText); // Save the TOTP secret
            updateTOTPDisplay();     // Update display after saving
          },
          (errorMessage) => console.warn("QR Scanner warning:", errorMessage)
        )
        .catch((err) => console.error("Failed to start QR scanner:", err));
    } catch (error) {
      console.error("QR Scanner initialization error:", error);
    }
  });

  // Save the TOTP details to localStorage
  function saveSecret(decodedText) {
    const urlParams = new URLSearchParams(decodedText.split("?")[1]);
    const secret = urlParams.get("secret");
    const issuer = urlParams.get("issuer") || "Unknown Issuer";
    const label = urlParams.get("label") || "Unknown Account";

    if (secret) {
      const totpData = { issuer, label, secret };
      let totps = JSON.parse(localStorage.getItem("totps")) || [];
      totps.push(totpData);
      localStorage.setItem("totps", JSON.stringify(totps));
      alert("TOTP secret saved!");
    } else {
      alert("Invalid QR code");
    }
  }

  // Generate and display all saved TOTPs on the dashboard
  function updateTOTPDisplay() {
    const totps = JSON.parse(localStorage.getItem("totps")) || [];
    totpList.innerHTML = ""; // Clear the list before updating

    if (totps.length === 0) {
      totpList.innerHTML = "<p>No TOTP codes saved yet.</p>";
      return;
    }

    totps.forEach((totpData, index) => {
      const otp = new OTP({ secret: totpData.secret });

      // Create elements for TOTP display
      const totpContainer = document.createElement("div");
      const title = document.createElement("h3");
      title.textContent = `${totpData.issuer} (${totpData.label})`;

      const codeDisplay = document.createElement("p");
      codeDisplay.id = `totp-code-${index}`;
      codeDisplay.textContent = otp.getTOTP();

      totpContainer.appendChild(title);
      totpContainer.appendChild(codeDisplay);
      totpList.appendChild(totpContainer);

      // Update the code every 30 seconds for each TOTP
      setInterval(() => {
        codeDisplay.textContent = otp.getTOTP();
      }, 30000);
    });
  }

  // Load and display all saved TOTPs on initial load
  updateTOTPDisplay();
});
