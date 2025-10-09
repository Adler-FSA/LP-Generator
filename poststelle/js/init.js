// =========================
// 📬 INIT – Poststelle Control Center
// =========================
document.addEventListener("DOMContentLoaded", () => {
  fsaLog("📬 Poststelle Control-Center geladen (modular)");

  // Slots prüfen
  const slots = ["slot-token", "slot-patch", "slot-modules", "log", "build-status"];
  slots.forEach(id => {
    if (!document.getElementById(id)) {
      console.warn(`⚠️ Slot '${id}' fehlt im DOM`);
    }
  });

  // Token prüfen (Debug-Info)
  if (typeof token === "undefined" || !token) {
    console.warn("⚠️ Kein Token gesetzt — Build-Status kann nicht abgerufen werden.");
    fsaLog("⚠️ Kein Token aktiv — bitte unter Token & Repo speichern.", "warn");
  } else {
    console.log("🔐 Token aktiv:", token ? "✅ vorhanden" : "❌ fehlt");
  }

  // Token / Healthcheck / Module starten
  if (typeof initToken === "function") initToken();
  if (typeof healthCheck === "function") healthCheck();
  if (typeof initModules === "function") initModules();

  // 🟢 Live Build Status sofort abrufen
  checkActionStatus();
});

// =========================
// 🛰️ GitHub Actions Build Status Live Check
// =========================
async function checkActionStatus() {
  const statusBox = document.getElementById("build-status");
  const apiURL = `https://api.github.com/repos/Adler-FSA/Lp-Generator/actions/runs?per_page=1`;

  try {
    const res = await fetch(apiURL, {
      headers: typeof token !== "undefined" && token
        ? { "Authorization": `Bearer ${token}` }   // ✅ FIX
        : {}
    });

    if (!res.ok) {
      fsaLog(`❌ Build-Status konnte nicht abgerufen werden: ${res.status}`, "err");
      if (statusBox) {
        statusBox.textContent = "❌ Fehler beim Abrufen des Build-Status";
        statusBox.style.color = "#ff5c5c";
      }
      return;
    }

    const data = await res.json();
    const lastRun = data.workflow_runs[0];

    if (!lastRun) {
      if (statusBox) {
        statusBox.textContent = "⚠️ Keine Build-Runs gefunden";
        statusBox.style.color = "#ffcb5c";
      }
      return;
    }

    const status = lastRun.status;
    const conclusion = lastRun.conclusion;
    const time = new Date(lastRun.updated_at).toLocaleTimeString();

    if (status === "in_progress" || status === "queued") {
      if (statusBox) {
        statusBox.textContent = `⏳ Build läuft… (${time})`;
        statusBox.style.color = "#ffcb5c";
      }
      fsaLog(`⏳ GitHub Actions: Build läuft… (${time})`);
    } else if (conclusion === "success") {
      if (statusBox) {
        statusBox.textContent = `🟢 Build erfolgreich (${time})`;
        statusBox.style.color = "#1ecb6c";
      }
      fsaLog(`🟢 GitHub Actions: Build erfolgreich bestätigt (${time})`, "ok");
    } else {
      if (statusBox) {
        statusBox.textContent = `❌ Build fehlgeschlagen (${time})`;
        statusBox.style.color = "#ff5c5c";
      }
      fsaLog(`❌ GitHub Actions: Build fehlgeschlagen (${time})`, "err");
    }
  } catch (err) {
    fsaLog(`❌ Fehler: ${err.message}`, "err");
    if (statusBox) {
      statusBox.textContent = "❌ Netzwerkfehler beim Statusabruf";
      statusBox.style.color = "#ff5c5c";
    }
  }
}

// 🔁 Alle 30 Sekunden automatisch abrufen
setInterval(checkActionStatus, 30000);
