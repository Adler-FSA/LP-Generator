// 🧰 Werkstatt Mini-Konsole v2.4.4 (UI Status + Reload)
(() => {
  const panel = document.createElement('div');
  panel.id = 'werkstatt-console';
  panel.style.cssText = `
    position: fixed;
    top: 10px;
    right: 10px;
    background: rgba(15,23,42,.9);
    color: #e2e8f0;
    padding: 10px 14px;
    border-radius: 10px;
    font: 13px system-ui, sans-serif;
    z-index: 99999;
    box-shadow: 0 0 12px rgba(0,0,0,.4);
    backdrop-filter: blur(4px);
  `;
  panel.innerHTML = `
    <div style="font-weight:600;">🧩 Werkstatt-Status</div>
    <div id="ws-status" style="margin:4px 0 6px;color:#94a3b8;">Initialisiere...</div>
    <button id="ws-reload" style="background:#2563eb;color:#fff;border:0;padding:4px 10px;border-radius:6px;cursor:pointer;">🔄 Neu scannen</button>
  `;
  document.body.appendChild(panel);

  const status = document.getElementById('ws-status');
  const update = (text, color) => {
    status.textContent = text;
    status.style.color = color;
  };

  window.addEventListener('WerkstattReady', () => update('✅ Aktiv', '#10b981'));
  window.addEventListener('WerkstattScan', () => update('🟡 Scan läuft...', '#facc15'));
  window.addEventListener('WerkstattError', () => update('❌ Fehler', '#ef4444'));

  document.getElementById('ws-reload').onclick = () => {
    update('🔁 Neu-Scan...', '#60a5fa');
    document.dispatchEvent(new Event('RebindInit'));
  };

  console.log('🧭 Werkstatt-Konsole bereit.');
})();
