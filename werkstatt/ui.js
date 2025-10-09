const ui = (() => {
  const header = document.getElementById("slot-header");
  const actions = document.getElementById("slot-actions");

  function renderHeader() {
    header.innerHTML = `
      <h1>🧰 FSA Werkstatt</h1>
      <div class="muted">Control & Patch Center v2.0</div>
    `;
  }

  function renderActions() {
    actions.innerHTML = `
      <button onclick="modules.scan()">🔍 Module laden</button>
      <button onclick="patcher.send()">🚀 Patch senden</button>
      <button onclick="log.clear()">🧽 Log leeren</button>
    `;
  }

  return { renderHeader, renderActions };
})();

document.addEventListener("DOMContentLoaded", () => {
  ui.renderHeader();
  ui.renderActions();
});
