🦅 Finanzielle Souveränitäts Akademie – Adler-FSA
Patch-Werkstatt / ReBind-System v2.4.2 (2025-10-05)
Projekt: Adler-FSA / LP-Generator v2.4.1
Copyright © 2025 – All Rights Reserved
Lizenz: Nur für interne Verwendung innerhalb der FSA-Projektstruktur.

============================================
WAS DIESES PAKET LÖST
============================================
Buttons im LP-Generator reagierten nach ZIP-Update/GitHub-Serve nicht mehr (Events „verschwunden“).
Das ReBind-System prüft beim Laden + bei DOM-Änderungen alle Buttons und (re-)bindet Click-Events.
Zusätzlich gibt es ein kleines Debug-Overlay rechts unten.

============================================
WIE EINBAUEN
============================================
1) Alte Version sichern (Commit/ZIP). 
2) Den kompletten Ordner „Patch-Werkstatt-ReBind-v2.4.2_2025-10-05/“ in Euer Repo kopieren (z. B. /tools/).
3) Die *_ReBind.html Dateien können direkt eingesetzt werden – sie laden die Module aus ./patch-modules/ via <script src>.
4) Optional: Öffnet ReBind_Test.html, um alle Tools automatisiert zu prüfen.
5) Für Notfälle liegt eine „ALL_INLINE“ Datei bei, die alle Patches direkt inline eingebettet hat.

============================================
BUTTON-SELEKTOREN
============================================
Es werden folgende Selektoren automatisch erkannt:
- button
- [role="button"]
- .btn
- .fsa-btn

Bei Bedarf in rebind-core.js anpassen.

============================================
BEKANNTE RANDNOTEN
============================================
- Safari (iOS/iPadOS) blockiert manchmal inline-Handler nach ZIP-Restore/Serve – ReBind gleicht das aus.
- GitHub Pages kann Caching haben; bei Problemen Hard-Reload erzwingen.
- Wenn Buttons dynamisch nachgeladen werden, übernimmt rebind-observer.js das automatische Binden.