var CACHE_NAME = "ajeng-firstpwa-v1";
var urlsToCache = [
  "/",
  "nav.html",
  "index.html",
  "article.html",
  "pages/home.html",
  "pages/about.html",
  "pages/contact.html",
  "css/materialize.min.css",
  "js/materialize.min.js",
  "manifest.json",
  "js/nav.js",
  "js/api.js",
  "icon.png"
];

self.addEventListener("install", function(event) {
  console.log('Service  worker  installing...');

    caches.open(CACHE_NAME)
    .then(function(cache) {
      return cache.addAll(urlsToCache);
    })

  self.skipWaiting();
});

self.addEventListener('fetch',	function(event)	{
  event.respondWith(
      caches.match(event.request)
      .then(function(response)	{
          return	response	||	fetchAndCache(event.request);
      })
  );
});
function	fetchAndCache(url)	{
  return	fetch(url)
  .then(function(response)	{
      if	(!response.ok)	{
          throw	Error(response.statusText);
      }
      return	caches.open(CACHE_NAME)
      .then(function(cache)	{
          cache.put(url,	response.clone());
          return	response;
      });
  })
  .catch(function(error)	{
      console.log('Request	failed:',	error);
  });
}

// self.addEventListener("fetch", function(event) {
//   var base_url = "http://jsonplaceholder.typicode.com/";

//   if (event.request.url.indexOf(base_url) > -1) {
//     event.respondWith(
//       caches.open(CACHE_NAME).then(function(cache) {
//         return fetch(event.request).then(function(response) {
//           cache.put(event.request.url, response.clone());
//           return response;
//         })
//       })
//     );
//   } else {
//     event.respondWith(
//       caches.match(event.request, { ignoreSearch: true }).then(function(response) {
//         return response || fetch (event.request);
//       })
//     )
//   }
// });

self.addEventListener("activate", function(event) {
  console.log('Service  worker  activating...');
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
