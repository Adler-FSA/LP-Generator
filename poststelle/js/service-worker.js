// ==========================
// 🚀 FSA Service Worker – Cache Control & Always Fresh
// ==========================

const CACHE_NAME = "fsa-poststelle-cache-v1";

// 📥 INSTALL: Direkt aktivieren, kein Warten
self.addEventListener("install", (event) => {
  console.log("📦 Service Worker installiert");
  self.skipWaiting();
});

// 🧹 ACTIVATE: Alte Versionen löschen
self.addEventListener("activate", (event) => {
  console.log("🔄 Service Worker aktiviert");
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => {
        if (key !== CACHE_NAME) {
          console.log("🧹 Alter Cache entfernt:", key);
          return caches.delete(key);
        }
      }))
    )
  );
  self.clients.claim();
});

// 🌐 FETCH: Immer frische Daten vom Server laden
self.addEventListener("fetch", (event) => {
  // Standardmäßig: immer frische Version laden
  event.respondWith(
    fetch(event.request, { cache: "no-store" })
      .then(response => {
        return response;
      })
      .catch(() => {
        // Optional: Falls offline, versuchen aus Cache zu liefern
        return caches.match(event.request);
      })
  );
});
