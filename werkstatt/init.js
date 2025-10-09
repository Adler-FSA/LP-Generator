document.addEventListener("DOMContentLoaded", () => {
  console.log("🧠 Werkstatt Init gestartet");

  // Platzhalter für Debug-Anzeige
  document.getElementById("slot-header").innerHTML = "<h2>🛠️ Werkstatt aktiv</h2>";
  document.getElementById("slot-actions").innerHTML = "✅ Actions bereit";
  document.getElementById("slot-modules").innerHTML = "🧰 Module warten…";
  document.getElementById("slot-log").innerHTML = "📜 Log aktiv";
  document.getElementById("slot-help").innerHTML = "❔ Hilfe verfügbar";
});
