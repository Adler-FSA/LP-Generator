// =========================
// 📬 INIT – Poststelle Control Center
// =========================
document.addEventListener("DOMContentLoaded", () => {
  fsaLog?.("📬 Poststelle Control-Center geladen (modular)");

  ["slot-token","slot-patch","slot-modules","log","build-status","compliance-panel"]
    .forEach(id => { if (!document.getElementById(id)) console.warn(`⚠️ Slot '${id}' fehlt im DOM`); });

  if (typeof initToken === "function") initToken();
  if (typeof healthCheck === "function") healthCheck();
  if (typeof initModules === "function") initModules();
  if (typeof initCompliance === "function") initCompliance();

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
      headers: (typeof token !== "undefined" && token)
        ? { "Authorization": `Bearer ${token}` }
        : {}
    });

    if (!res.ok) {
      fsaLog?.(`❌ Build-Status konnte nicht abgerufen werden: ${res.status}`, "err");
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
      statusBox.textContent = `⏳ Build läuft… (${time})`;
      statusBox.style.color = "var(--warn)";
    } else if (conclusion === "success") {
      statusBox.textContent = `🟢 Build erfolgreich (${time})`;
      statusBox.style.color = "var(--ok)";
    } else {
      statusBox.textContent = `❌ Build fehlgeschlagen (${time})`;
      statusBox.style.color = "var(--err)";
    }
  } catch (err) {
    fsaLog?.(`❌ Fehler: ${err.message}`, "err");
    if (statusBox) { statusBox.textContent = "❌ Netzwerkfehler beim Statusabruf"; statusBox.style.color = "var(--err)"; }
  }
}

// 🔁 Alle 30 Sekunden automatisch abrufen
setInterval(checkActionStatus, 30000);
