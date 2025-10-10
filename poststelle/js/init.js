// =========================
// 📬 INIT – Poststelle Control Center
// =========================
document.addEventListener("DOMContentLoaded", () => {
  try{ if (typeof fsaLog === "function") fsaLog("📬 Poststelle Control-Center geladen (modular)"); }catch(_){}

  // Slots prüfen (nur Hinweis)
  ["slot-token","slot-patch","slot-modules","log","build-status","compliance-panel"]
    .forEach(id => { if (!document.getElementById(id)) console.warn(`⚠️ Slot '${id}' fehlt im DOM`); });

  // Token / Healthcheck / Module starten
  if (typeof initToken === "function") initToken();
  if (typeof healthCheck === "function") healthCheck();
  if (typeof initModules === "function") initModules();

  // Compliance-Layer starten
  if (typeof initCompliance === "function") initCompliance();

  // Build-Status direkt abrufen
  if (typeof checkActionStatus === "function") checkActionStatus();
});

// =========================
// 🛰️ GitHub Actions Build Status Live Check
// =========================
async function checkActionStatus() {
  const statusBox = document.getElementById("build-status");
  const apiURL = `https://api.github.com/repos/Adler-FSA/Lp-Generator/actions/runs?per_page=1`;

  try {
    const res = await fetch(apiURL, {
      headers: (typeof token !== "undefined" && token)
        ? { "Authorization": `Bearer ${token}` }
        : {}
    });

    if (!res.ok) {
      if (typeof fsaLog==="function") fsaLog(`❌ Build-Status konnte nicht abgerufen werden: ${res.status}`, "err");
      if (statusBox) { statusBox.textContent = "❌ Fehler beim Abrufen des Build-Status"; statusBox.style.color = "var(--err)"; }
      return;
    }

    const data = await res.json();
    const lastRun = data.workflow_runs?.[0];

    if (!lastRun) {
      if (statusBox) { statusBox.textContent = "⚠️ Keine Build-Runs gefunden"; statusBox.style.color = "var(--warn)"; }
      return;
    }

    const status = lastRun.status;
    const conclusion = lastRun.conclusion;
    const time = new Date(lastRun.updated_at).toLocaleTimeString();

    if (status === "in_progress" || status === "queued") {
      if (statusBox) { statusBox.textContent = `⏳ Build läuft… (${time})`; statusBox.style.color = "var(--warn)"; }
      if (typeof fsaLog==="function") fsaLog(`⏳ GitHub Actions: Build läuft… (${time})`);
    } else if (conclusion === "success") {
      if (statusBox) { statusBox.textContent = `🟢 Build erfolgreich (${time})`; statusBox.style.color = "var(--ok)"; }
      if (typeof fsaLog==="function") fsaLog(`🟢 GitHub Actions: Build erfolgreich bestätigt (${time})`, "ok");
    } else {
      if (statusBox) { statusBox.textContent = `❌ Build fehlgeschlagen (${time})`; statusBox.style.color = "var(--err)"; }
      if (typeof fsaLog==="function") fsaLog(`❌ GitHub Actions: Build fehlgeschlagen (${time})`, "err");
    }
  } catch (err) {
    if (typeof fsaLog==="function") fsaLog(`❌ Fehler: ${err.message}`, "err");
    if (statusBox) { statusBox.textContent = "❌ Netzwerkfehler beim Statusabruf"; statusBox.style.color = "var(--err)"; }
  }
}

// 🔁 Alle 30 Sekunden automatisch abrufen
setInterval(() => {
  if (typeof checkActionStatus === "function") checkActionStatus();
}, 30000);
