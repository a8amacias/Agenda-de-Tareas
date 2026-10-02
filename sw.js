const CACHE = 'mi-app-v1';
const ARCHIVOS = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './icono-192.png',
  './icono-512.png'
];

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  if (url.pathname.endsWith('.html') || url.pathname.endsWith('/')) {
    event.respondWith(fetch(event.request));
    return;
  }
  event.respondWith(
    caches.match(event.request).then((resp) => resp || fetch(event.request))
  );
});
