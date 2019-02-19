# Cache-First-Then-Revalidate

This repository contains a Proof of Concept for a cache first then revalidate strategy using a Service Worker. This app must be served from a web server, I recommend [Web Server for Chrome](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb?hl=en) from the root directory of this project.

## service-worker.js

The role of our service worker here is to cache fetch requests that in the whitelisted urls. This is the caching mechanism and serves to only cache responses and not to serve said cache responses. That will be handled with our `cacheFirstAndRevalidate()` function.

## app.js

This file holds our `cacheFirstAndRevalidate()` api. This api is documented below

## cacheFirstAndRevalidate()

API

```
cacheFirstAndRevalidate(url, needFresh, callback)
```

Example usage

```js
// Example usage using stale then revalidate hook
const jsonData = await cacheFirstAndRevalidate(
  "https://jsonplaceholder.typicode.com/todos/1",
  false,
  (error, response) => {
    // do stuff with new update
  }
);

// Example not using stale cache and just using network so no hooks needed
const jsonData = await cacheFirstAndRevalidate(
  "https://jsonplaceholder.typicode.com/todos/1",
  true
);
```
