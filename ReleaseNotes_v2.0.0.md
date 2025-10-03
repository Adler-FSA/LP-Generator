# 🚀 Release Notes – LP‑Generator v2.0.0 (Final)

**Ziel:** Akquise‑Motor – 1000+ individuelle LPs, jeweils mit Unikat‑ID & Partner‑E‑Mail.  
**Steuerung:** JSON‑Hintertüren, keine Tokens/Parameter in URL außer `id`.

### Features
- `lp-template.html` mit:
  - E‑Mail aus `emails.json` per `?id=...` (Unique‑One‑Mail‑Per‑Page)
  - Freigabe‑Banner (⏳) bis `approved:true`
  - CTA mit Mailto + Copy‑Button
  - Kino 16:9: Video (rotator.json) oder Slideshow (slideshow.json)
  - Musik‑Button (music.json)
- Admin & Media Hinweise
- Übersicht `index.html`

### JSON‑Dateien
- `settings.json` – `{ "mode": "video" | "slideshow" }`
- `emails.json` – `[ { id, email, approved } ]`
- `rotator.json`, `slideshow.json`, `music.json`, `quotes.json`, `reise.json`

### Beispiel
- `/lp-template.html?id=FSA-2025-10-07-0001` ⇒ zeigt freigegebene E‑Mail

✅ Produktionsbereit ohne Server (GitHub Pages + JSON).