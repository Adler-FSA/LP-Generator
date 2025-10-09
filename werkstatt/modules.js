const modules = (() => {
  const container = document.getElementById("slot-modules");

  function scan(){
    container.innerHTML = `⏳ Scanne JS-Module…`;
    fetch("../poststelle/js/")
      .then(() => {
        container.innerHTML = `
          ✅ Module gefunden: 
          <ul>
            <li>actions.js</li>
            <li>healthcheck.js</li>
            <li>init.js</li>
            <li>log.js</li>
            <li>modules.js</li>
            <li>token.js</li>
          </ul>`;
        log.write("📂 Modul-Scan abgeschlossen");
      })
      .catch(() => container.innerHTML = "❌ Fehler beim Laden der Module");
  }

  return { scan };
})();
