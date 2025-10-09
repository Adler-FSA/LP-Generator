// ===============================
// 📨 FSA Poststelle – Init + GitHub Upload Validation
// ===============================
(function () {
  const repoOwner = "Adler-FSA";
  const repoName = "Lp-Generator";
  const branch = "main";
  const backupPath = "backup/poststelle_v1/testfile.txt";

  // Token aus LocalStorage lesen
  const token = localStorage.getItem("fsa_github_token");

  // -------------------------------
  // 🪵 Log Helper
  // -------------------------------
  function fsaLog(msg, type = "info") {
    const logBox = document.getElementById("log");
    const time = new Date().toLocaleTimeString();
    const icon = type === "ok" ? "✅" : type === "err" ? "❌" : "🪵";
    const entry = `[${time}] ${icon} ${msg}\n`;
    logBox.textContent += entry;
    logBox.scrollTop = logBox.scrollHeight;
    console.log(icon, msg);
  }

  // -------------------------------
  // 🧪 Token Test Funktion
  // -------------------------------
  window.tokenCheck = async function () {
    if (!token) {
      fsaLog("⚠️ Kein Token gefunden – bitte speichern!", "err");
      return;
    }

    const testMessage = "✅ Token funktioniert";
    fsaLog("🧪 Token-Test läuft …");

    const res = await fetch(
      `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${backupPath}`,
      {
        method: "PUT",
        headers: {
          "Authorization": `token ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: "Token-Test",
          content: btoa(testMessage),
          branch: branch
        })
      }
    );

    if (res.ok) {
      fsaLog("✅ Token-Test erfolgreich – Schreibrechte vorhanden!", "ok");
    } else {
      fsaLog(`❌ Token-Test fehlgeschlagen: ${res.status}`, "err");
    }
  };

  // -------------------------------
  // 📦 Backup Upload Funktion mit Validierung
  // -------------------------------
  window.deployBackup = async function (fileName = "backup_test.txt", fileContent = "📦 Backup-Test") {
    if (!token) {
      fsaLog("⚠️ Kein Token gefunden – Upload abgebrochen", "err");
      return;
    }

    const path = `backup/poststelle_v1/${fileName}`;
    fsaLog(`📤 Starte Backup-Upload: ${path}`);

    // 1️⃣ Datei hochladen
    const uploadRes = await fetch(
      `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${path}`,
      {
        method: "PUT",
        headers: {
          "Authorization": `token ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: `📦 Backup erstellt – ${fileName}`,
          content: btoa(fileContent),
          branch: branch
        })
      }
    );

    if (!uploadRes.ok) {
      fsaLog(`❌ Upload fehlgeschlagen: ${uploadRes.status}`, "err");
      return;
    }

    // 2️⃣ Upload verifizieren
    const checkRes = await fetch(
      `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${path}`,
      {
        headers: { "Authorization": `token ${token}` }
      }
    );

    if (checkRes.ok) {
      fsaLog("✅ Backup erfolgreich auf GitHub gespeichert!", "ok");
    } else {
      fsaLog("❌ Upload konnte nicht bestätigt werden – bitte manuell prüfen.", "err");
    }
  };

  // -------------------------------
  // 🟢 Initialisierung
  // -------------------------------
  document.addEventListener("DOMContentLoaded", () => {
    fsaLog("📬 Poststelle Control-Center geladen (modular)");
    fsaLog("🧪 Token-Test verfügbar: 'tokenCheck()'");
    fsaLog("📦 Backup-Test verfügbar: 'deployBackup()'");
  });
})();
