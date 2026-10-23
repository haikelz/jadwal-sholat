// Offline support: the site's pages and the prayer-time API fall back to
// the last copy when the network fails. Hashed bundles are cached for good.
const CACHE = "jadwal-sholat-v1";
// The prayer-time API's origin, which BaseLayout passes as ?prayer-api=.
const PRAYER_API = new URL(self.location.href).searchParams.get("prayer-api");

self.addEventListener("install", () => self.skipWaiting());

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

function cacheFirst(request) {
  return caches.match(request).then(
    (cached) =>
      cached ||
      fetch(request).then((response) => {
        if (response.ok) caches.open(CACHE).then((cache) => cache.put(request, response.clone()));
        return response;
      }),
  );
}

function networkFirst(request) {
  return fetch(request)
    .then((response) => {
      if (response.ok) {
        const copy = response.clone();
        caches.open(CACHE).then((cache) => cache.put(request, copy));
      }
      return response;
    })
    .catch(() => caches.match(request).then((cached) => cached || Response.error()));
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  // Audio streams use range requests, which the cache can't answer.
  if (request.method !== "GET" || request.headers.has("range")) return;

  const url = new URL(request.url);
  if (url.origin === self.location.origin) {
    event.respondWith(url.pathname.startsWith("/_astro/") ? cacheFirst(request) : networkFirst(request));
  } else if (url.origin === PRAYER_API) {
    // ponytail: only prayer times are cached cross-origin; Qur'an and hadith
    // responses would grow the cache without bound. Upgrade path: a size cap.
    event.respondWith(networkFirst(request));
  }
});
