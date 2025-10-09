const modules = (() => {
  const container = document.getElementById("slot-modules");

  const MODULE_LIST = [
    "actions.js",
    "healthcheck.js",
    "init.js",
    "log.js",
    "modules.js",
    "token.js"
  ];

  function scan() {
    container.innerHTML = "🔄 Module werden geladen…";
    setTimeout(() => {
      container.innerHTML = `
        ✅ Module gefunden:
        <ul>
          ${MODULE_LIST.map(f => `<li>${f}</li>`).join("")}
        </ul>
      `;
      log.write("📦 Modul-Scan abgeschlossen");
    }, 500);
  }

  return { scan };
})();
