const CACHE_NAME = "pwa-cache-v1";
const ASSETS = [
 "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./fonts/inter-regular.woff2",
  "./fonts/inter-bold.woff2"

];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(
      response => response || fetch(event.request)
    )
  );
});
