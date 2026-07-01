// VMRTIN26 Service Worker v2.0
// ΣΗΜΑΝΤΙΚΟ: κάθε φορά που ανεβαίνει νέα έκδοση στο GitHub Pages,
// αρκεί να αλλάξεις ΜΟΝΟ αυτό το νούμερο → ο browser θα εγκαταστήσει
// αυτόματα τον νέο SW και θα φορτώσει τα φρέσκα αρχεία.
const CACHE = 'vmrtin26-v2';

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
  self.skipWaiting(); // ενεργοποίησε αμέσως χωρίς να περιμένεις tab κλείσιμο
});

// Activate — διέγραψε ΟΛΕΣ τις παλιές εκδόσεις cache (v1, v2, ...)
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch — χωρίζουμε σε δύο κατηγορίες:
self.addEventListener('fetch', e => {
  const url = e.request.url;

  // 1. Google Apps Script: ΠΟΤΕ cache — πάντα απευθείας στο network
  if (url.includes('script.google.com')) return;

  // 2. Navigation (index.html): network με cache:'reload' για να παρακάμψει
  //    το HTTP cache του GitHub Pages — έτσι κάθε φορά που ο χρήστης ανοίγει
  //    την εφαρμογή παίρνει ΠΑΝΤΑ το φρέσκο index.html.
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request, { cache: 'reload' })
        .then(res => {
          if (res && res.status === 200) {
            const copy = res.clone();
            caches.open(CACHE).then(c => c.put(e.request, copy));
          }
          return res;
        })
        .catch(() => caches.match(e.request)) // fallback αν offline
    );
    return;
  }

  // 3. Όλα τα υπόλοιπα (manifest.json, icons κλπ): network first, cache fallback
  e.respondWith(
    fetch(e.request)
      .then(res => {
        if (res && res.status === 200 && res.type === 'basic') {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, copy));
        }
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
