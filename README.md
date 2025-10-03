# LP‑Generator v2.0.0 (Final)

Akquise‑Motor gemäß Memo 01/02: **Eine LP = eine ID = eine E‑Mail**.  
Steuerung via JSON (Hintertüren), keine Tokens in URL, kein LocalStorage.

## Dateien
- `lp-template.html` – Master‑LP; liest E‑Mail anhand `?id=...` aus `emails.json`, zeigt Status (⏳/✅), Kino (Video/Slideshow), Musik‑Button.
- `lp-admin.html` – Demo‑Admin (Anzeige); echte Commits via GitHub Contents API möglich.
- `media-admin.html` – Hinweise zur Medien‑Steuerung.
- JSON: `settings.json`, `emails.json`, `rotator.json`, `slideshow.json`, `music.json`, `quotes.json`, `reise.json`
- `index.html` – Übersicht aller Links.

## Beispielaufrufe
- LP (freigegeben): `/lp-template.html?id=FSA-2025-10-07-0001`
- LP (wartend): `/lp-template.html?id=FSA-2025-10-07-0002`

## Wichtige Regeln
- **Keine E‑Mail in URL.** Nur ID.
- **FSA‑Admin** prüft und setzt `approved:true` in `emails.json`.
- Änderungen an Content/Medien nur über JSON nötig.
