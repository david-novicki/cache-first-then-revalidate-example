const dataCacheName = "app-data-v1";
const dataUrl = "jsonplaceholder";

self.addEventListener("install", () => {
  console.log("installed");
});

self.addEventListener("activate", () => {
  console.log("activated");
});

self.addEventListener("fetch", e => {
  console.log("fetch", e);

  if (e.request.url.indexOf(dataUrl) > -1) {
    e.respondWith(
      caches.open(dataCacheName).then(function(cache) {
        return fetch(e.request).then(function(response) {
          cache.put(e.request.url, response.clone());
          return response;
        });
      })
    );
  } else {
    e.respondWith(fetch(e.request));
  }
});
