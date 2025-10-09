// =======================================================
// 📬 FSA Poststelle - init.js
// Version: v3.6.0 · Slot-Architektur · Modular
// =======================================================

// 🪵 Log-Funktion (wird beim Laden der Seite initialisiert)
function fsaLog(msg, type = "info") {
  const logEl = document.getElementById("log");
  const ts = new Date().toLocaleTimeString();
  const line = `[${ts}] ${msg}`;
  logEl.textContent += (logEl.textContent ? "\n" : "") + line;
  logEl.scrollTop = logEl.scrollHeight;
  console.log(line);
}

// 🧠 Token laden
function getToken() {
  return localStorage.getItem("github_token") || "";
}

// =======================================================
// 📦 Backup Trigger (Deploy Fallback)
// =======================================================
async function deployBackup() {
  const token = getToken();
  if (!token) {
    alert("⚠️ Kein Token vorhanden! Bitte zuerst GitHub-Token eingeben.");
    fsaLog("❌ Deploy Backup abgebrochen – kein Token");
    return;
  }

  const owner = "Adler-FSA";
  const repo = "Lp-Generator";
  const basePath = "backup/poststelle_v1";

  const files = {
    "index.html": `<!doctype html><html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>📬 FSA Poststelle – Fallback v1.0</title><link rel="icon" href="../favicon.ico"><style>:root{--bg:#0b1220;--panel:#111b2e;--line:#1f2b44;--text:#e6f2ff;--muted:#9db4d6;--ok:#1ecb6c;--warn:#ffcb5c;--err:#ff5c5c;--info:#3fa9f5;--radius:12px;--card-shadow:0 8px 30px rgba(0,0,0,.35);}body{margin:0;background:var(--bg);color:var(--text);font-family:system-ui,Segoe UI,Roboto,Inter,Arial,sans-serif;}.slot{max-width:1100px;margin:20px auto;padding:12px 16px}.card{background:var(--panel);border:1px solid var(--line);border-radius:var(--radius);box-shadow:var(--card-shadow);padding:18px 20px;margin:16px 0}h1{margin:0 0 6px;font-size:22px}.muted{color:var(--muted);font-size:13px}</style></head><body><div class="slot card" id="slot-header"></div><div class="slot card" id="slot-actions"></div><div class="slot card" id="slot-modules"></div><div class="slot card" id="slot-log"></div><div class="slot card" id="slot-help"></div><script src="./init.js"></script><script src="./ui.js"></script><script src="./modules.js"></script><script src="./patcher.js"></script><script src="./log.js"></script><script src="./help.js"></script></body></html>`,
    "init.js": `console.log("🛡️ Poststelle Backup v1 gestartet");const essentialFiles=['init.js','ui.js','modules.js','patcher.js','log.js','help.js'];Promise.all(essentialFiles.map(f=>fetch(f).then(r=>r.ok).catch(()=>false))).then(r=>{if(r.includes(false)){console.warn("❌ Backup beschädigt – kein weiterer Fallback verfügbar");document.getElementById("slot-header").innerHTML="<h1>🚨 Backup beschädigt!</h1>";}else{document.getElementById("slot-header").innerHTML="<h1>📬 Poststelle – Backup Version 1.0</h1>";document.getElementById("slot-actions").innerHTML="✅ Modulsteuerung aktiv";document.getElementById("slot-modules").innerHTML="📦 Module geladen";document.getElementById("slot-log").innerHTML="📝 Log aktiv";document.getElementById("slot-help").innerHTML="🆘 Hilfe & Support aktiv";}});`,
    "ui.js": `console.log("🧭 UI geladen – Poststelle Backup v1");`,
    "modules.js": `console.log("📦 Module geladen – Poststelle Backup v1");`,
    "patcher.js": `console.log("🔁 Patch-System aktiv – Poststelle Backup v1");`,
    "log.js": `console.log("📝 Log-System aktiv – Poststelle Backup v1");`,
    "help.js": `console.log("🆘 Hilfe-System aktiv – Poststelle Backup v1");document.getElementById("slot-help").innerHTML += '<div style="margin-top:10px;"><button onclick="window.open(\\'https://chat.openai.com\\', \\'_blank\\')" style="padding:8px 14px; background:#38bdf8; color:#0b1220; border:none; border-radius:6px; cursor:pointer;">💬 Support öffnen</button></div>';`,
    "manifest.json": `{"version":"1.0","released":"2025-10-10","component":"Poststelle","description":"Stabile Fallback-Version für Poststelle","author":"FSA System","source":"/poststelle/"}`
  };

  for (const [file, content] of Object.entries(files)) {
    const encoded = btoa(unescape(encodeURIComponent(content)));
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${basePath}/${file}`;
    const res = await fetch(url, {
      method: "PUT",
      headers: { Authorization: `token ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        message: `add(backup): ${file} – Poststelle Fallback v1.0`,
        content: encoded
      })
    });

    if (!res.ok) {
      const err = await res.json();
      fsaLog(`❌ Fehler beim Upload von ${file}: ${err.message}`);
      alert(`Fehler beim Upload von ${file}: ${err.message}`);
      return;
    }
    fsaLog(`✅ ${file} erfolgreich hochgeladen`);
  }

  alert("✅ Poststelle Backup erfolgreich deployed!");
  fsaLog("📦 Backup v1.0 erfolgreich deployed");
}

// =======================================================
// 🧭 Initialisierung
// =======================================================
(function(){
  fsaLog("📬 Poststelle Control-Center geladen (modular)");

  // Auto Healthcheck nach 1 Sekunde
  setTimeout(() => {
    if (typeof fsaHealthCheck === "function") {
      fsaLog("🩺 Healthcheck wird ausgeführt …");
      fsaHealthCheck();
    }
  }, 1000);

  // Token-Status prüfen
  if (getToken()) {
    fsaLog("🔐 Token erkannt – bereit für Aktionen");
  } else {
    fsaLog("⚠️ Kein Token gefunden – bitte eingeben");
  }

})();
