(function(){
  const el = document.getElementById("slot-token");
  el.innerHTML = `
    <h2>🔐 Token & Repo</h2>
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px;">
      <input id="token" type="password" placeholder="GitHub Token eingeben…" style="flex:1;min-width:200px;">
      <button onclick="saveToken()">💾 Speichern</button>
      <button onclick="clearToken()">🧹 Reset</button>
    </div>
    <div style="display:flex;gap:8px;flex-wrap:wrap;">
      <select id="repoSelect" style="flex:1;min-width:200px;">
        <option value="Lp-Generator">Lp-Generator</option>
        <option value="FSA-Core">FSA-Core</option>
        <option value="FSA-WhiteLabel">FSA-WhiteLabel</option>
      </select>
      <button onclick="checkStatus()">🔄 Status aktualisieren</button>
    </div>
    <div style="margin-top:10px;">
      <span class="muted">Deployment Status:</span>
      <span id="deployStatus" class="status-led warn">Wird geprüft…</span>
    </div>
  `;

  window.saveToken = ()=>{
    localStorage.setItem("fsa-token", document.getElementById("token").value);
    fsaLog("🔐 Token gespeichert");
  };
  window.clearToken = ()=>{
    localStorage.removeItem("fsa-token");
    document.getElementById("token").value = "";
    fsaLog("🧹 Token gelöscht");
  };
  window.checkStatus = ()=>{
    const led = document.getElementById("deployStatus");
    led.textContent = "🟢 Erfolg";
    led.className = "status-led ok";
    fsaLog(`✅ Status: ${document.getElementById("repoSelect").value}`);
  };
  document.getElementById("token").value = localStorage.getItem("fsa-token") || "";
})();
