/* 
  📚 Paragraph-Registry (globaler Überblick)
  - Definiert gesperrte Kern-Dateien (Layout/Template/Funktion)
  - Listet verwaltete Seiten & Blöcke (Paragraphen-IDs)
  - Dient als Grundlage für die Compliance-Prüfung vor jedem Deploy
*/

window.SOS_REGISTRY = {
  version: "1.0.0",
  updated_at: new Date().toISOString(),

  // ❌ Kernbereiche: dürfen NICHT direkt verändert werden (nur per autorisierter Patch-Pipeline)
  protected_files: [
    "poststelle/index.html",
    "werkstatt/index.html",
    "lp-template.html",
    "tools/index.html",
    "docs/sos-gesetz-v1.2.html"
  ],

  // ✅ Erlaubte Änderungsorte: JS-Blöcke / Paragraphen
  // Jede Seite kann beliebig viele Paragraphen (Abschnitte/Blöcke) registrieren
  pages: [
    {
      id: "POST",
      title: "Poststelle",
      base: "poststelle/",
      paragraphs: [
        { pid: "POST-01", file: "js/token.js",     area: "Token & Repo Konfiguration" },
        { pid: "POST-02", file: "js/actions.js",   area: "Deploy/Backup Aktionen" },
        { pid: "POST-03", file: "js/modules.js",   area: "Module & Schnellzugriff" },
        { pid: "POST-04", file: "js/check-law.js", area: "Compliance-Check Logik" }
      ]
    },
    {
      id: "WS",
      title: "Werkstatt",
      base: "werkstatt/",
      paragraphs: [
        { pid: "WS-01", file: "js/ui.js",              area: "UI/Bedienung" },
        { pid: "WS-02", file: "js/paragraph-manager.js", area: "Paragraphen-Editor" },
        { pid: "WS-03", file: "js/modules.js",         area: "Module/Scan" }
      ]
    },
    {
      id: "LP",
      title: "LP-Generator / LP",
      base: "lp/",
      paragraphs: [
        { pid: "LP-11", file: "js/section-11.js", area: "Hero/Begrüßung" },
        { pid: "LP-27-2", file: "js/section-27-2.js", area: "Profil & Audio-Branding" },
        { pid: "LP-45", file: "js/section-45.js", area: "Onboarding via Partnerlink" }
      ]
    }
  ]
};
