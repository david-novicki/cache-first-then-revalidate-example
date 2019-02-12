const dataCacheName = "app-data-v1";

self.addEventListener("install", () => {
  console.log("installed");
});

self.addEventListener("activate", () => {
  console.log("activated");
});

self.addEventListener("fetch", event => {
  console.log("fetch", event);
  // start network request
  const networkPromise = fetch(event.request);
  event.respondWith(
    // try to find a match in the cache
    caches.match(event.request).then(function(response) {
      // if cache match found, return response, else return network promise
      return response || networkPromise;
    })
  );
  // once network request returns, update cache and update clients
//   networkPromise.then(response => {
//     return caches.open(dataCacheName).then(function(cache) {
//       cache.put(event.request.url, response);
//       self.clients.matchAll().then(function(clients) {
//         clients.forEach(function(client) {
//           client.postMessage({
//             type: "update",
//             url: event.request.url
//           });
//         });
//       });
//     });
//   });
});
