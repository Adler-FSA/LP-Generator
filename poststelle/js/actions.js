/* ============================
📬 actions.js – Deploy & Backup Aktionen
Funktionen:
 - Deploy geänderter Dateien an GitHub (API)
 - Vor Deploy: Compliance Check via Hook
 - Backup Trigger
 - Statusausgabe ins Log
=============================== */

// GitHub Repository Einstellungen
const GITHUB = {
  owner: "Adler-FSA",
  repo: "Lp-Generator",
  branch: "main"
};

// Helper: API URL builder
function ghApi(path) {
  return `https://api.github.com/repos/${GITHUB.owner}/${GITHUB.repo}${path}`;
}

// 📡 Hauptfunktion: Deploy Patch
async function deployPatch(patch) {
  try {
    if (typeof fsaLog === "function") fsaLog("🚀 Deploy-Vorgang gestartet…");

    // 1️⃣ Compliance-Check vor dem Deploy
    if (window.poststelleHooks?.beforeDeploy) {
      const ok = await window.poststelleHooks.beforeDeploy(patch);
      if (!ok) {
        fsaLog("❌ Deploy abgebrochen (S-O-S Compliance verletzt)", "err");
        return;
      }
    }

    if (!token) {
      fsaLog("❌ Kein Token gesetzt!", "err");
      alert("Bitte zuerst Token unter 'Token & Repo' setzen.");
      return;
    }

    // 2️⃣ Einzelne Dateien pushen
    for (const file of patch.files) {
      await pushFileToGitHub(file.path, file.content, file.message || patch.message);
    }

    // 3️⃣ Build Trigger loggen
    fsaLog(`✅ Deploy erfolgreich abgeschlossen (${patch.files.length} Dateien)`, "ok");

  } catch (err) {
    fsaLog(`❌ Deploy Fehler: ${err.message}`, "err");
    console.error("Deploy Error:", err);
  }
}

// 📂 Datei an GitHub pushen
async function pushFileToGitHub(filePath, content, message) {
  const url = ghApi(`/contents/${filePath}`);
  const headers = {
    "Authorization": `Bearer ${token}`,
    "Accept": "application/vnd.github+json",
    "Content-Type": "application/json"
  };

  // Schritt 1: Prüfen, ob Datei schon existiert (für SHA)
  let sha = null;
  const getRes = await fetch(url, { headers });
  if (getRes.ok) {
    const data = await getRes.json();
    sha = data.sha;
  }

  // Schritt 2: Base64 konvertieren
  const b64 = btoa(unescape(encodeURIComponent(content)));

  // Schritt 3: Commit an GitHub
  const body = JSON.stringify({
    message: message || `update: ${filePath}`,
    content: b64,
    branch: GITHUB.branch,
    sha: sha || undefined
  });

  const putRes = await fetch(url, { method: "PUT", headers, body });
  if (!putRes.ok) {
    const errData = await putRes.json();
    throw new Error(`Fehler bei ${filePath}: ${putRes.status} – ${errData.message}`);
  }

  fsaLog(`📄 ${filePath} erfolgreich übertragen`, "ok");
}

// 🧭 Backup Trigger (stabile Fallback-Version)
async function deployBackup() {
  fsaLog("🧭 Backup-Deploy gestartet…", "warn");

  const backupContent = `
    <!-- 📦 Poststelle Backup Fallback -->
    <html><head><meta charset="utf-8"><title>📦 Backup</title></head>
    <body><h1>📦 FSA Poststelle – Fallback</h1><p>Diese Seite wurde automatisch als Sicherheits-Backup bereitgestellt.</p></body>
    </html>
  `;

  await deployPatch({
    message: "backup(poststelle): automatische Fallback-Version",
    files: [{
      path: "poststelle/backup.html",
      content: backupContent
    }]
  });

  fsaLog("✅ Backup erfolgreich erstellt.", "ok");
  alert("Backup erfolgreich deployed.");
}

// 📜 Beispielaufruf: Deploy einer einzelnen Datei
// deployPatch({
//   message: "fix: kleiner Test-Commit",
//   files: [{
//     path: "test.txt",
//     content: "Hallo Welt"
//   }]
// });

// Export global (für Buttons in der UI)
window.deployPatch = deployPatch;
window.deployBackup = deployBackup;
