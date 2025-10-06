/*
 * 🦅 Auto-Init ReBind – v2.4.4
 * Initialisiert automatisch alle verbundenen Werkstatt-Module (SAFE · INLINE · UPLOAD)
 * und erkennt, welche Seiten (index, admin, kino, media etc.) verfügbar sind.
 */

(function() {
  const autoInit = {
    version: '2.4.4',
    modules: [
      'rebind-core.js',
      'rebind-observer.js',
      'debug-overlay.js'
    ],
    pages: [
      'index.html',
      'lp-admin.html',
      'media-admin.html',
      'kino.html',
      'campus.html',
      'mentor.html'
    ],

    log(msg, type='info') {
      const color = type === 'ok' ? '#10b981' : type === 'warn' ? '#f59e0b' : '#93c5fd';
      console.log(`%c[AutoInit] ${msg}`, `color:${color}; font-weight:500`);
    },

    async checkModules() {
      for (const mod of this.modules) {
        try {
          const res = await fetch(`./${mod}`, { method: 'HEAD' });
          this.log(`${mod} ✓ gefunden`, res.ok ? 'ok' : 'warn');
        } catch {
          this.log(`${mod} ⚠️ fehlt oder nicht erreichbar`, 'warn');
        }
      }
    },

    async checkPages() {
      const found = [];
      for (const page of this.pages) {
        try {
          const res = await fetch(`../${page}`, { method: 'HEAD' });
          if (res.ok) found.push(page);
        } catch {}
      }
      this.log(`Gefundene Seiten: ${found.join(', ') || 'keine'}`, 'info');
    },

    async init() {
      this.log(`Starte Auto-Init v${this.version}…`);
      await this.checkModules();
      await this.checkPages();
      this.log('✅ Werkstatt-Scan abgeschlossen – bereit für Bindung', 'ok');
    }
  };

  document.addEventListener('DOMContentLoaded', () => autoInit.init());
})();
