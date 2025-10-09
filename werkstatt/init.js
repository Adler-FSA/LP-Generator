document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ Werkstatt init gestartet");
  document.getElementById("header").innerHTML = "<h1>🛠️ Werkstatt aktiv</h1>";
  document.getElementById("actions").innerHTML = "<button onclick='alert(\"Funktion läuft\")'>Test-Button</button>";
  document.getElementById("modules").innerHTML = "<p>📦 Module geladen</p>";
  document.getElementById("log").innerHTML = "<p>📝 Log-Ausgabe sichtbar</p>";
  document.getElementById("help").innerHTML = "<p>ℹ️ Hilfe-Slot aktiv</p>";
});
