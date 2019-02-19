const dataCacheName = "app-data-v1";
const domainsToCache = ["jsonplaceholder"];

self.addEventListener("install", () => {
  console.log("installed");
});

self.addEventListener("activate", () => {
  console.log("activated");
});

self.addEventListener("fetch", e => {
  console.log("fetch", e);

  // loose check to only caching requests that are whitelisted
  // TODO: replace with something more regex-y!
  if (domainsToCache.find(url => e.request.url.indexOf(url) > -1)) {
    e.respondWith(
      caches.open(dataCacheName).then(function(cache) {
        return fetch(e.request).then(function(response) {
          cache.put(e.request.url, response.clone());
          return response;
        });
      })
    );
  } else {
    // normal pass through for fetch requests we do not tamper with
    e.respondWith(fetch(e.request));
  }
});
