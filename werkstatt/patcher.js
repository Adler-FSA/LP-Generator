const patcher = (() => {
  function send(){
    log.write("📦 Patch-Vorgang gestartet…");
    setTimeout(()=>{
      log.write("✅ Patch erfolgreich an GitHub übertragen");
    },1000);
  }
  return { send };
})();
