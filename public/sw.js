const CACHE_NAME = 'explore-v2';
const TILE_CACHE = 'tiles-v2';

const BASE = new URL(self.registration.scope).pathname.replace(/\/$/, '');

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      cache.addAll([
        `${BASE}/`,
        `${BASE}/index.html`,
        `${BASE}/manifest.json`,
        `${BASE}/sw.js`
      ])
    ).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;

  const url = new URL(e.request.url);

  if (url.hostname.includes('tile.openstreetmap.org') || url.hostname.includes('images.weserv.nl')) {
    e.respondWith(
      caches.open(TILE_CACHE).then(cache =>
        cache.match(e.request).then(cached => {
          if (cached) return cached;
          return fetch(e.request).then(resp => {
            if (resp.ok) cache.put(e.request, resp.clone());
            return resp;
          }).catch(() => cached || new Response('', { status: 503 }));
        })
      )
    );
    return;
  }

  e.respondWith(
    fetch(e.request).then(resp => {
      if (resp.ok && url.origin === location.origin) {
        const clone = resp.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(e.request, clone));
      }
      return resp;
    }).catch(() => caches.match(e.request))
  );
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(
    self.clients.matchAll({ type: 'window' }).then(clients => {
      if (clients.length) return clients[0].focus();
      return self.clients.openWindow(`${BASE}/`);
    })
  );
});
