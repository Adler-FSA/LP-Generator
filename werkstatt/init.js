document.addEventListener("DOMContentLoaded", () => {
  log.write("🛠️ Werkstatt initialisiert …");
  ui.renderHeader();
  ui.renderActions();
  modules.scan();
  help.render();
});
