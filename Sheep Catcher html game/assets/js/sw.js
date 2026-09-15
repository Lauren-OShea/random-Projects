const cacheName = 'sample-pwa';
const filesToCache = [
  '.',
    "assets/js/in-class-initial.js",
    "assets/js/manifest.json",
    "assets/js/nipplejs.js",
    "assets/js/script.js",
    "assets/img/items.js",
    "assets/img/farmer.png",
    "assets/img/fence.jpg",
    "assets/img/garden.jpg",
    "assets/img/house.jpg",
    "assets/img/lake.jpg",
    "assets/img/sheep.jpg",
    "assets/img/tree.jpg",
    "assets/img/trees.jpg",
    "assets/img/well.jpg",
    'assets/js/main.js',
    'index.html',
    'assets/css/style.css',
  

];

self.addEventListener('install', async e => {
  const cache = await caches.open(cacheName);
  await cache.addAll(filesToCache);
  return self.skipWaiting();
});

self.addEventListener('activate', e => {
  self.clients.claim();
});

self.addEventListener('fetch', async e => {
  const req = e.request;
  const url = new URL(req.url);

  if (url.origin === location.origin) {
    e.respondWith(cacheFirst(req));
  } else {
    e.respondWith(networkAndCache(req));
  }
});

async function cacheFirst(req) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(req.url);
  return cached || fetch(req);
}

async function networkAndCache(req) {
  const cache = await caches.open(cacheName);
  try {
    const fresh = await fetch(req);
    await cache.put(req, fresh.clone());
    return fresh;
  } catch (e) {
    const cached = await cache.match(req);
    return cached;
  }
}