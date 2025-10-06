/*
 * 🦅 Werkstatt Interface UI – v2.4.4
 * Visuelles Interface für Auto-Init ReBind
 * Zeigt erkannte Module & Seiten als Dropdown / Statusliste
 */

(function() {
  const ui = {
    init() {
      const box = document.createElement('div');
      box.id = 'fsa-ui';
      Object.assign(box.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        background: 'rgba(11,18,32,.95)',
        color: '#eaf2ff',
        fontFamily: 'system-ui, Segoe UI, sans-serif',
        borderRadius: '10px',
        boxShadow: '0 0 18px rgba(0,0,0,.5)',
        padding: '16px 20px',
        zIndex: 99999,
        fontSize: '14px',
        width: '280px'
      });

      box.innerHTML = `
        <div style="font-weight:600;font-size:15px;margin-bottom:8px;">🧩 Werkstatt-Interface</div>
        <div id="moduleStatus">Module werden überprüft...</div>
        <div style="margin:8px 0;border-top:1px solid rgba(255,255,255,.1)"></div>
        <label style="display:block;margin-bottom:6px;">Seite wählen:</label>
        <select id="pageSelect" style="width:100%;padding:6px;border-radius:6px;border:none;background:#1e293b;color:#fff;">
          <option>Lade Seiten...</option>
        </select>
      `;

      document.body.appendChild(box);
      this.checkModules();
      this.fillPages();
    },

    async checkModules() {
      const mods = ['rebind-core.js','rebind-observer.js','debug-overlay.js'];
      const out = [];
      for (const mod of mods) {
        try {
          const res = await fetch(`../${mod}`, { method: 'HEAD' });
          out.push(`<div>${res.ok ? '✅' : '⚠️'} ${mod}</div>`);
        } catch {
          out.push(`<div>⚠️ ${mod} (nicht gefunden)</div>`);
        }
      }
      document.getElementById('moduleStatus').innerHTML = out.join('');
    },

    async fillPages() {
      const select = document.getElementById('pageSelect');
      const pages = ['index.html','lp-admin.html','media-admin.html','kino.html','campus.html','mentor.html'];
      let html = '';
      for (const page of pages) {
        try {
          const res = await fetch(`../../${page}`, { method: 'HEAD' });
          html += `<option ${res.ok ? '' : 'disabled'}>${res.ok ? '✅' : '❌'} ${page}</option>`;
        } catch {
          html += `<option disabled>❌ ${page}</option>`;
        }
      }
      select.innerHTML = html;
    }
  };

  document.addEventListener('DOMContentLoaded', () => ui.init());
})();
