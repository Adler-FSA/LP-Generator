# 🚀 Release Notes – LP-Generator Core v2.0.0 (Final)

### Was ist neu
- Vollständiger Partner-Flow: ID erzeugen → E-Mail eintragen → Admin-Freigabe
- `lp-template.html` liest E-Mail per `?id=...` und zeigt Status (⏳/✅)
- `lp-admin.html` verwaltet Einträge via GitHub Contents API (Token-basiert)
- `unikat-generator.html` erzeugt IDs und kann direkt nach `emails.json` schreiben

### Dateien
- lp-template.html, lp-admin.html, unikat-generator.html
- settings.json, emails.json, rotator.json, slideshow.json, music.json, quotes.json
- README.md, CHANGELOG.md

### Live-Aufruf (Beispiel)
- `https://adler-fsa.github.io/LP-Generator/lp-template.html?id=FSA-2025-10-07-0001`

✅ Damit ist der Akquise‑Motor produktionsbereit (ohne Server, via GitHub JSON).
