# FSA Admin-Panels (ohne Server, GitHub API)

Dieses Paket enthält zwei Admin-Seiten, die direkt im Browser laufen und
JSON-Dateien in eurem GitHub-Repository lesen/schreiben (per GitHub REST API).

## Dateien
- media-admin.html – JSON-Editor für: settings.json, slideshow.json, rotator.json, music.json, reise.json, emails.json
- lp-admin.html – Spezielles Mini-Panel für emails.json (Unikat-ID → E-Mail + Status)
- README-ADMIN.txt – Kurzanleitung

## Nutzung
1) Öffne media-admin.html (lokal oder im Admin-Repo).
2) Trage Owner, Repository, Branch ein (z. B. main) und gib deinen GitHub-PAT (Token) ein.
3) 🔌 Testen → 📥 Laden → ✨ Formatieren → 🧪 Prüfen → 💾 Speichern (Commit).

Token wird **nicht gespeichert** (kein LocalStorage, keine URL-Parameter).
Bei Branch Protection brauchst du passende Rechte.
