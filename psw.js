const CACHE = "savehashtag-v1";
const FILES = [
  "./",
  "./index.html",
  "./hashtag.css",
  "./hashtag.js",
  "./pages/video.html",
  "./pages/video.js",
  "./pages/video.css",
  "./css/style.css",
  "./js/javascript.js",
  "./manifest.json",
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)));
});

self.addEventListener("fetch", (e) => {
  e.respondWith(caches.match(e.request).then((res) => res || fetch(e.request)));
});
