// Learn.edu — Service Worker (offline support)
// Network-first for app shell/assets so new deployments do not get stuck
// behind stale cache-first JS.
const CACHE = 'learnedu-v30';
const CORE  = [
  '/',
  '/index.html',
  '/css/style.css',
  '/css/air-theme.css',
  '/js/app.js',
  '/js/views.js',
  '/js/recommendations.js',
  '/js/xp.js',
  '/js/games.js',
  '/js/lesson.js',
  '/data/admin.js',
  '/data/math.js',
  '/data/science.js',
  '/data/spanish.js',
  '/data/ela.js',
  '/data/history.js',
  '/data/coding.js',
  '/manifest.json',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(CORE.map(url => new Request(url, { cache: 'reload' }))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function shouldUseNetworkFirst(request) {
  const url = new URL(request.url);
  return request.mode === 'navigate'
    || ['script', 'style', 'worker'].includes(request.destination)
    || url.pathname.endsWith('.html')
    || url.pathname.endsWith('.js')
    || url.pathname.endsWith('.css');
}

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;

  if (shouldUseNetworkFirst(e.request)) {
    e.respondWith(
      fetch(e.request).then(res => {
        if (res && res.status === 200) {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      }).catch(() => caches.match(e.request))
    );
    return;
  }

  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).then(res => {
      if (res && res.status === 200) {
        const clone = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
      }
      return res;
    }))
  );
});
