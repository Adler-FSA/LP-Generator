const ui = (() => {
  const header = document.getElementById("slot-header");
  const actions = document.getElementById("slot-actions");

  function renderHeader(){
    header.innerHTML = `
      <h1>🛠️ FSA Werkstatt · Control & Patch Center</h1>
      <div class="muted">Mission: Modular – wie Poststelle v3.6.0</div>
    `;
  }

  function renderActions(){
    actions.innerHTML = `
      <button onclick="modules.scan()">🔍 Module neu laden</button>
      <button onclick="patcher.send()">📦 Patch senden</button>
      <button onclick="log.clear()">🧹 Log leeren</button>
    `;
  }

  return { renderHeader, renderActions };
})();
