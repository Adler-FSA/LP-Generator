# LP-Generator Core v2.0.0

Finaler Akquise-Motor (Memo 01/02): Eine LP = eine ID = eine Partner‑E‑Mail.

## Dateien
- lp-template.html → Partner-LP (zieht Mail per ?id=... aus emails.json)
- lp-admin.html → Freigabe & Pflege (GitHub Contents API)
- unikat-generator.html → IDs erzeugen & nach emails.json schreiben
- settings.json → mode=video|slideshow, approved (globaler Hinweis)
- emails.json → Liste aus Objekten {id,email,approved}
- rotator.json / slideshow.json / music.json / quotes.json

## Live-Aufruf (Beispiel)
/lp-template.html?id=FSA-2025-10-07-0001

## Sicherheit
GitHub Token nur im Admin verwenden (nie in Links/URL).