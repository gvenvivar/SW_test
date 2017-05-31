let filesToCache = [
  '/',
  'https://fonts.googleapis.com/css?family=Roboto',
  '/static/media/frostmourne_by_chillalord-d5ka9vy.edba8d31.jpg',
  '/static/js/main.08b19d07.js',
  '/static/css/main.666d01ee.css',
]

let cacheName = 'static-v1';


self.addEventListener('install', function(event) {
  console.log('Attempting to install service worker and cache static assets');
  event.waitUntil(
    caches.open(cacheName)
    .then(function(cache) {
      return cache.addAll(filesToCache);
    })
    .catch((e) => console.log(e))
  );
});

self.addEventListener('fetch', function(event) {
  console.log('Fetch event for ', event.request.url);
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
        console.log('Found ', event.request.url, ' in cache');
        return response;
      }
      console.log('Network request for ', event.request.url);
      return fetch(event.request).then(function(response) {
        console.log('Response from network is: ', response);

        return response;
      })
      .catch(function(error) {

      // TODO 6 - Respond with custom offline page

    })
  })
)
})


// delete unused caches
self.addEventListener('activate', function(event) {
console.log('Activating new service worker...');

var cacheWhitelist = [cacheName];

event.waitUntil(
  caches.keys().then(function(cacheNames) {
    return Promise.all(
      cacheNames.map(function(cacheName) {
        if (cacheWhitelist.indexOf(cacheName) === -1) {
          return caches.delete(cacheName);
        }
      })
    );
  })
);
});
