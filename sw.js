const CACHE = 'mi-app-v1';
const ARCHIVOS = [
  '/Agenda-de-Tareas/',
  '/Agenda-de-Tareas/index.html',
  '/Agenda-de-Tareas/style.css',
  '/Agenda-de-Tareas/script.js',
  '/Agenda-de-Tareas/icono-192.png',
  '/Agenda-de-Tareas/icono-512.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ARCHIVOS)));
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
