// VMRTIN26 Service Worker v1.0
const CACHE = 'vmrtin26-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
];

// Install — cache assets
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Activate — clean old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch — network first, fallback to cache
self.addEventListener('fetch', e => {
  // Για Google Apps Script requests — πάντα network (χωρίς cache)
  if (e.request.url.includes('script.google.com')) {
    return; // browser handles it
  }

  e.respondWith(
    fetch(e.request)
      .then(res => {
        // Cache την απάντηση αν είναι OK
        if (res && res.status === 200 && res.type === 'basic') {
          const copy = res.clone();
          caches.open(CACHE).then(cache => cache.put(e.request, copy));
        }
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
