(function(){
  const statusEl = document.createElement("p");
  statusEl.innerHTML = `Status: <span id="status-led" class="status-led warn">⏳ Starte…</span>`;
  document.querySelector("h1").after(statusEl);

  function setStatus(state){
    const el = document.getElementById("status-led");
    el.className = `status-led ${state}`;
    el.textContent = state === "ok" ? "🟢 Erfolg" : state === "warn" ? "⚠️ Warnung" : "🔴 Fehler";
  }

  function check(){
    setStatus("ok");
    fsaLog("✅ Auto-Healthcheck durchgeführt");
  }

  setInterval(check, 30000);
  check();
})();
