const CACHE = 'mi-app-v2';  

self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))
    ))
  );
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);

  
  if (url.pathname.endsWith('.html') || url.pathname.endsWith('/')) {
    e.respondWith(fetch(e.request));
    return;
  }

  
  e.respondWith(
    caches.match(e.request).then((r) => r || fetch(e.request))
  );
});

