# LP‑Generator – v2.4.1 Patch‑Tool (Nur 2 Änderungen)

Dieses ZIP enthält ein **einfaches Browser‑Tool**, das deine bestehende `lp-template.html` öffnet und **nur** die zwei gewünschten Änderungen automatisch einbaut:

1) **Patch 1 – Willkommens‑Modal:** Fügt **Vorname** & **Nachname** **vor** das bestehende E‑Mail‑Feld ein (ohne Optik zu verändern).
2) **Patch 2 – NAV Buttons:** Ersetzt den bisherigen NAV‑Block durch **Startseite · Campus · Grundkurs · Onboarding · Krypto‑Glossar** (**ohne „Kino“**).

## So geht’s (ohne Programmierkenntnisse)
1. Lade **`LP-Generator_v2.4.1_Patcher.html`** in deinem Browser (Doppelklick).
2. Klicke auf **„Datei wählen“** und wähle DEINE **Original‑Datei** `lp-template.html` (v2.4.1).
3. Klicke **„Patch anwenden“**.
4. Der Browser lädt dir die **neue Datei** `lp-template_patched.html` herunter.
5. Ersetze in deinem Repo die alte Datei durch `lp-template_patched.html` (oder benenne sie zu `lp-template.html` um).

> Das Tool ändert **nichts anderes** und ist **idempotent** (du kannst es nicht doppelt anwenden – es überspringt bereits eingebaute Patches).

## Enthalten
- `LP-Generator_v2.4.1_Patcher.html` – Ein‑Klick‑Patcher
- `snippets/patch1_modal_names.js` – Referenzsnippet
- `snippets/patch2_nav_block.html` – Referenzsnippet
