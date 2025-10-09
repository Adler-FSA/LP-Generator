const patcher = (() => {
  function send() {
    log.write("🚀 Patch-Vorgang gestartet…");
    setTimeout(() => log.write("✅ Patch erfolgreich übertragen"), 1200);
  }
  return { send };
})();
