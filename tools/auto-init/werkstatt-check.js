/*
 * 🧠 Werkstatt-Checker v2.4.4
 * Prüft, ob alle Auto-Init-Komponenten aktiv und fehlerfrei geladen sind.
 * (C) 2025 Adler-FSA · FSA-LP-Generator Framework
 */

(function(){
  const modules = [
    { name: 'ReBind', key: 'auto-init-rebind.js' },
    { name: 'UI', key: 'auto-ui.js' },
    { name: 'Bind', key: 'auto-bind.js' }
  ];

  const status = { ok: [], fail: [] };

  modules.forEach(m => {
    const found = [...document.scripts].some(s => s.src.includes(m.key));
    if (found) {
      console.log(`✅ ${m.name} geladen (${m.key})`);
      status.ok.push(m.name);
    } else {
      console.warn(`⚠️ ${m.name} fehlt (${m.key})`);
      status.fail.push(m.name);
    }
  });

  if (status.fail.length === 0) {
    console.log("%c🚀 Werkstatt vollständig initialisiert!","color:#22c55e;font-weight:700;font-size:1rem");
  } else {
    console.error("%c❌ Werkstatt unvollständig! Fehlende Module:", "color:#ef4444;font-weight:700");
    console.error(status.fail.join(', '));
  }
})();
