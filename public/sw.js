if (!self.define) {
  let e,
    s = {};
  const a = (a, i) => (
    (a = new URL(a + ".js", i).href),
    s[a] ||
      new Promise((s) => {
        if ("document" in self) {
          const e = document.createElement("script");
          (e.src = a), (e.onload = s), document.head.appendChild(e);
        } else (e = a), importScripts(a), s();
      }).then(() => {
        let e = s[a];
        if (!e) throw new Error(`Module ${a} didn’t register its module`);
        return e;
      })
  );
  self.define = (i, n) => {
    const c = e || ("document" in self ? document.currentScript.src : "") || location.href;
    if (s[c]) return;
    let t = {};
    const r = (e) => a(e, c),
      d = { module: { uri: c }, exports: t, require: r };
    s[c] = Promise.all(i.map((e) => d[e] || r(e))).then((e) => (n(...e), t));
  };
}
define(["./workbox-80ca14c3"], function (e) {
  "use strict";
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: "/_next/app-build-manifest.json", revision: "d3c717453eecb6f1d6d158b076233c7a" },
        {
          url: "/_next/static/4k6W3SVFzpKBJOhkTBDmA/_buildManifest.js",
          revision: "8df8218095aa7d835e009fcdb71b7eb3",
        },
        {
          url: "/_next/static/4k6W3SVFzpKBJOhkTBDmA/_ssgManifest.js",
          revision: "b6652df95db52feb4daf4eca35380933",
        },
        { url: "/_next/static/chunks/174-d50e7d91b20c0148.js", revision: "4k6W3SVFzpKBJOhkTBDmA" },
        { url: "/_next/static/chunks/33-8a2596070444e61c.js", revision: "4k6W3SVFzpKBJOhkTBDmA" },
        { url: "/_next/static/chunks/506-bbd12a92a1f01f3c.js", revision: "4k6W3SVFzpKBJOhkTBDmA" },
        { url: "/_next/static/chunks/617-b206074467adcc0d.js", revision: "4k6W3SVFzpKBJOhkTBDmA" },
        { url: "/_next/static/chunks/700-e0286d2aa62d4501.js", revision: "4k6W3SVFzpKBJOhkTBDmA" },
        { url: "/_next/static/chunks/808-a73f83971c077d4f.js", revision: "4k6W3SVFzpKBJOhkTBDmA" },
        {
          url: "/_next/static/chunks/app/asmaul-husna/page-2063abe1bd26ced9.js",
          revision: "4k6W3SVFzpKBJOhkTBDmA",
        },
        {
          url: "/_next/static/chunks/app/jadwal-sholat/kota/%5Bid%5D/page-f57708fbee9e3bf1.js",
          revision: "4k6W3SVFzpKBJOhkTBDmA",
        },
        {
          url: "/_next/static/chunks/app/jadwal-sholat/page-2f1b82e8c86c1526.js",
          revision: "4k6W3SVFzpKBJOhkTBDmA",
        },
        {
          url: "/_next/static/chunks/app/layout-4dda4cc20cdf6f5c.js",
          revision: "4k6W3SVFzpKBJOhkTBDmA",
        },
        {
          url: "/_next/static/chunks/app/not-found-7b6294c2c6c62de9.js",
          revision: "4k6W3SVFzpKBJOhkTBDmA",
        },
        {
          url: "/_next/static/chunks/app/page-911661b34b0e8867.js",
          revision: "4k6W3SVFzpKBJOhkTBDmA",
        },
        {
          url: "/_next/static/chunks/app/quran/page-1339544826981803.js",
          revision: "4k6W3SVFzpKBJOhkTBDmA",
        },
        {
          url: "/_next/static/chunks/app/quran/surat/%5Bnumber%5D/page-c8ec933d09fcbad6.js",
          revision: "4k6W3SVFzpKBJOhkTBDmA",
        },
        {
          url: "/_next/static/chunks/bec6b74f-fa036a7780d02514.js",
          revision: "4k6W3SVFzpKBJOhkTBDmA",
        },
        {
          url: "/_next/static/chunks/f5be4826-7895b6ddf6d0b3f6.js",
          revision: "4k6W3SVFzpKBJOhkTBDmA",
        },
        {
          url: "/_next/static/chunks/framework-510ec8ffd65e1d01.js",
          revision: "4k6W3SVFzpKBJOhkTBDmA",
        },
        {
          url: "/_next/static/chunks/main-app-babe89cd96a5f0fb.js",
          revision: "4k6W3SVFzpKBJOhkTBDmA",
        },
        { url: "/_next/static/chunks/main-eca13a0ef2d183be.js", revision: "4k6W3SVFzpKBJOhkTBDmA" },
        {
          url: "/_next/static/chunks/pages/_app-39e1da1546f3222a.js",
          revision: "4k6W3SVFzpKBJOhkTBDmA",
        },
        {
          url: "/_next/static/chunks/pages/_error-d38fe1cf5c645f88.js",
          revision: "4k6W3SVFzpKBJOhkTBDmA",
        },
        {
          url: "/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",
          revision: "79330112775102f91e1010318bae2bd3",
        },
        {
          url: "/_next/static/chunks/webpack-f7815605803b3b77.js",
          revision: "4k6W3SVFzpKBJOhkTBDmA",
        },
        { url: "/_next/static/css/13cc59b21418ee97.css", revision: "13cc59b21418ee97" },
        { url: "/_next/static/css/3567235c1e82f524.css", revision: "3567235c1e82f524" },
        { url: "/_next/static/css/8f55cf5599b747b1.css", revision: "8f55cf5599b747b1" },
        {
          url: "/_next/static/media/0596140cb8d9223a-s.woff2",
          revision: "ddd5de66d4a7c56eeac6e0b10c5d8521",
        },
        {
          url: "/_next/static/media/1a4dd1d7cd3232ea-s.woff2",
          revision: "91c6fe4b62b5ebda5ccee3c4aa1eb33d",
        },
        {
          url: "/_next/static/media/1e54e3d2e91b8e51-s.woff2",
          revision: "59918dbc12ea36954d9426781c768659",
        },
        {
          url: "/_next/static/media/2378c743173f808c-s.woff2",
          revision: "9fc470eb03aea871a54f471acc8b3cef",
        },
        {
          url: "/_next/static/media/341baa6ce7a16e81-s.woff2",
          revision: "0c7b4bd9156673a090be9999002eaab1",
        },
        {
          url: "/_next/static/media/356abdd51b933898-s.woff2",
          revision: "4ed5a85b9b460c31a44ba541e277bcc0",
        },
        {
          url: "/_next/static/media/746a2e66d01d3678-s.woff2",
          revision: "79ef89943a7a1afb1354e1a22ef4e8cb",
        },
        {
          url: "/_next/static/media/b068929f93724d72-s.woff2",
          revision: "d16b988d1fe9bdaf5550ab2f174487c2",
        },
        {
          url: "/_next/static/media/be96aec8275f86f8-s.p.woff2",
          revision: "76b675fa0420f1d789cd5f2f93c078d8",
        },
        {
          url: "/_next/static/media/c22ccc5eb58b83e1-s.p.woff2",
          revision: "8a051a2b61e4a766fff21bb106142860",
        },
        {
          url: "/_next/static/media/d3656d64b405eb4e-s.p.woff2",
          revision: "4a591d320aea1c3f875edb23762c6c54",
        },
        {
          url: "/_next/static/media/d3c3cdb1c52a964c-s.woff2",
          revision: "7e89ea1da378857852b1ca5f1355299f",
        },
        {
          url: "/_next/static/media/d70c23d6fe66d464-s.woff2",
          revision: "7abbd25026a8e3994d885bd8704b9588",
        },
        {
          url: "/_next/static/media/ec1cce4f25f37272-s.woff2",
          revision: "cfea47193218540abb7d00cddc8be686",
        },
        { url: "/docs/asmaul-husna.png", revision: "4e11e200b64f69ad3d46cda6fbcb6bb7" },
        { url: "/docs/home.png", revision: "f2f5e2dd8398f3ec3c31e4b2db0d67d3" },
        { url: "/docs/jadwal-sholat.png", revision: "b63db86509dcd7657f7281a15828f317" },
        { url: "/docs/puasa-sunnah.png", revision: "18fc95cf3e3c1645ea11619f7d43df53" },
        { url: "/docs/quran.png", revision: "a9846e8ccb82868897be665edff4f283" },
        { url: "/favicon.ico", revision: "beec086a267aa0629dc9d31ac3274364" },
        { url: "/img/Quran.webp", revision: "1ba61d5ad4a8d9f746079108ad26e9fe" },
        { url: "/img/fasting.webp", revision: "9e82052a39e7c4bb66fbe33a8e5b7215" },
        { url: "/img/home.webp", revision: "485816848e240a91edb7609cc16cf755" },
        { url: "/img/icon-192x192.png", revision: "365bb562af4091a6d6dd1a3a49b230e0" },
        { url: "/img/icon-256x256.png", revision: "1fb3c7a912b03559974bafdce86da3a2" },
        { url: "/img/icon-384x384.png", revision: "32b2a2d2cdb4f716c9cac6715b6b2ee1" },
        { url: "/img/icon-512x512.png", revision: "1dfc2bc4590370b69bc0af37be5d382d" },
        { url: "/img/mosque.webp", revision: "005c5fac240666eddd746de75d318ee3" },
        { url: "/img/opengraph.png", revision: "2799a4f02f70da68e577f653fbc9594f" },
        { url: "/img/void.svg", revision: "7a635cfd5f9721c194aaf989051cedea" },
        { url: "/manifest.json", revision: "22fa6d0bbd9e35dcc400ab9521a7499b" },
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      "/",
      new e.NetworkFirst({
        cacheName: "start-url",
        plugins: [
          {
            cacheWillUpdate: async ({ request: e, response: s, event: a, state: i }) =>
              s && "opaqueredirect" === s.type
                ? new Response(s.body, { status: 200, statusText: "OK", headers: s.headers })
                : s,
          },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: "google-fonts-webfonts",
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 })],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: "google-fonts-stylesheets",
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-font-assets",
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-image-assets",
        plugins: [new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-image",
        plugins: [new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: "static-audio-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: "static-video-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-js-assets",
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-style-assets",
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-data",
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: "static-data-assets",
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        const s = e.pathname;
        return !s.startsWith("/api/auth/") && !!s.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "apis",
        networkTimeoutSeconds: 10,
        plugins: [new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 })],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        return !e.pathname.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "others",
        networkTimeoutSeconds: 10,
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: "cross-origin",
        networkTimeoutSeconds: 10,
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 })],
      }),
      "GET"
    );
});
