const domEl = document.getElementById("data-dump");

const clearDataDump = () => {
  domEl.innerHTML = "empty";
};

const updateData = data => {
  domEl.innerHTML = JSON.stringify(data);
};

const simpleFetch = url => fetch(url).then(fResp => fResp.json());

const cacheFirstAndRevalidate = (url, needFresh = false, cb) => {
  // start network request immediately
  const networkPromise = simpleFetch(url);
  // if no cache version is requested, return network.
  if (needFresh) return networkPromise;
  // else check cache first
  return caches.match(url).then(async response => {
    let networkResponse = null;
    if (response) {
      console.log("served from cache", url);
      // we want to send resolved network
      networkPromise
        .then(nResp => {
          // set to outside variable so we can avoid race condition on cache return
          networkResponse = nResp;
          if (!cb)
            throw new Error("For refresh data you must supply a callback");
          else cb(null, nResp);
        })
        .catch(() => {
          if (!cb)
            throw new Error("For refresh errors you must supply a callback");
          else cb(err);
        });
      const respToJson = await response.json();
      // return network response if it completed before cache was ready to be returned (possible race cond)
      return networkResponse || respToJson;
    } else return networkPromise;
  });
};

const request = needFresh => async () => {
  clearDataDump();
  const jsonData = await cacheFirstAndRevalidate(
    "https://jsonplaceholder.typicode.com/todos/1",
    needFresh,
    (err, nData) => {
      if (err) throw new Error("network error");
      console.log("network callback fired");
      updateData(nData);
    }
  );
  updateData(jsonData);
};

// bypasses cache check, straight to network. Service worker will cache if running.
const onGetFreshAndUpdate = request(true);
// checks cache and returns if exists, requests new from network and calls hooks once completed
const onGetCachedAndUpdate = request(false);
