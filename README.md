# Cache-First-Then-Revalidate

This repository contains a Proof of Concept for a cache first then revalidate strategy using a Service Worker.

## service-worker.js

The role of our service worker here is to cache fetch requests that in the whitelisted urls. This is the caching mechanism and serves to only cache responses and not to serve said cache responses. That will be handled with our `cacheFirstAndRevalidate()` function.

## app.js

This file holds our `cacheFirstAndRevalidate()` api. This api is documented below

## cacheFirstAndRevalidate()
API
```
cacheFirstAndRevalidate(url, needFresh, options)
```
Example usage
```js
// Example usage using stale then revalidate hook
const jsonData = await cacheFirstAndRevalidate(
  "https://jsonplaceholder.typicode.com/todos/1",
  false,
  {
    refreshFn: updateDataFn,
    errorFn: updateErrFn
  }
);

// Example not using stale cache and just using network so no hooks needed
const jsonData = await cacheFirstAndRevalidate(
  "https://jsonplaceholder.typicode.com/todos/1",
  true
);
```
