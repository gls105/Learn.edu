// Learn.edu — Service Worker (offline support)
const CACHE = 'learnedu-v29';
const CORE  = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/app.js',
  '/js/views.js',
  '/js/lesson.js',
  '/data/admin.js',
  '/data/math.js',
  '/data/science.js',
  '/data/spanish.js',
  '/manifest.json',
];

// Cache core files on install
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting())
  );
});

// Activate and clean old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Cache-first strategy
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).then(res => {
      // Cache successful GET responses
      if (e.request.method === 'GET' && res.status === 200) {
        const clone = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
      }
      return res;
    }))
  );
});
