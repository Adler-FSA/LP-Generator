(function(){
  const el = document.getElementById("slot-patch");
  el.innerHTML = `
    <h2>⚡ Aktionen</h2>
    <div style="display:flex;gap:10px;flex-wrap:wrap;">
      <button style="background:#3b82f6;color:white;flex:1;" onclick="fsaLog('🚀 Test-Commit ausgeführt')">🚀 Test-Commit</button>
      <button style="background:#facc15;color:black;flex:1;" onclick="fsaLog('🧰 Werkstatt-Patch ausgeführt')">🧰 Werkstatt-Patch</button>
      <button style="background:#ef4444;color:white;flex:1;" onclick="fsaLog('📦 ZIP-Backup ausgelöst')">📦 ZIP-Backup</button>
    </div>
    <p class="muted" style="margin-top:8px;">Tipp: vor Patches ein Backup auslösen.</p>
  `;
})();
