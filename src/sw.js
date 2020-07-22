const version = "2.0.3";
const cacheName = `dutch-tax-income-calculator-${version}`;
self.addEventListener('install', e => {
  const timeStamp = Date.now();
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
        `/`,
        `/index.html`,
        `/app.js`,
        `/favicon.png`,
        `https://ajax.googleapis.com/ajax/libs/angularjs/1.7.5/angular.min.js`,
        `https://ajax.googleapis.com/ajax/libs/angularjs/1.7.5/angular-animate.min.js`,
        `https://ajax.googleapis.com/ajax/libs/angularjs/1.7.5/angular-aria.min.js`,
        `https://ajax.googleapis.com/ajax/libs/angular_material/1.1.8/angular-material.min.js`,
        `https://ajax.googleapis.com/ajax/libs/angular_material/0.10.1/angular-material.min.css`,
        `https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic`,
        `https://fonts.googleapis.com/icon?family=Material+Icons`
      ])
          .then(() => self.skipWaiting());
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(cacheName)
      .then(cache => cache.match(event.request, {ignoreSearch: true}))
      .then(response => {
      return response || fetch(event.request);
    })
  );
});