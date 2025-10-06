/* =========================================================
   🧩 Auto-Bind System v2.4.4 – Werkstatt-Integration
   ---------------------------------------------------------
   Zweck:
   - Verbindet Werkstatt-UI mit ReBind-Modulen (core, overlay, observer)
   - Erkennt automatisch geladene LP-Dateien (index, admin, kino, etc.)
   - Aktualisiert Statusanzeige + Dropdowns in der Werkstatt
   ---------------------------------------------------------
   Autor: Adler-FSA Dev System · 2025-10-06
========================================================= */

const AutoBind = {
  version: 'v2.4.4',
  modules: ['rebind-core.js', 'rebind-overlay.js', 'rebind-observer.js'],
  pages: ['index.html', 'admin.html', 'kino.html', 'campus.html', 'lp-template.html'],
  
  async init() {
    console.log(`🧩 Auto-Bind ${this.version} gestartet…`);
    this.ui = document.querySelector('#werkstatt-status');
    this.select = document.querySelector('#werkstatt-select');
    this.bindModules();
    this.bindPages();
    this.updateStatus('Bereit für Verknüpfung', 'ok');
  },

  bindModules() {
    this.modules.forEach(src => {
      const tag = document.createElement('script');
      tag.src = `../patch-modules/${src}`;
      tag.onload = () => this.updateStatus(`Modul geladen: ${src}`, 'ok');
      tag.onerror = () => this.updateStatus(`Fehler: ${src} fehlt`, 'warn');
      document.body.appendChild(tag);
    });
  },

  bindPages() {
    if (!this.select) return;
    this.pages.forEach(page => {
      const opt = document.createElement('option');
      opt.value = page;
      opt.textContent = page.replace('.html', '').replace('lp-', '').toUpperCase();
      this.select.appendChild(opt);
    });
    this.select.addEventListener('change', e => this.handlePageSelect(e.target.value));
  },

  handlePageSelect(page) {
    if (!page) return;
    this.updateStatus(`Lade ${page}...`, 'info');
    fetch(`../${page}`)
      .then(r => r.text())
      .then(html => {
        this.updateStatus(`✅ ${page} erfolgreich geladen`, 'ok');
        localStorage.setItem('werkstatt_last', page);
        console.log(`🔗 Auto-Bind: ${page} verknüpft`);
      })
      .catch(() => this.updateStatus(`❌ ${page} konnte nicht geladen werden`, 'warn'));
  },

  updateStatus(text, type = 'info') {
    if (!this.ui) return;
    const color =
      type === 'ok' ? '#10b981' :
      type === 'warn' ? '#f59e0b' :
      '#60a5fa';
    this.ui.textContent = text;
    this.ui.style.color = color;
  }
};

document.addEventListener('DOMContentLoaded', () => AutoBind.init());
