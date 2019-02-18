const url = "https://jsonplaceholder.typicode.com/todos/1";
const domEl = document.getElementById("data-dump");

const clearDataDump = () => {
  domEl.innerHTML = "empty";
};

const updateData = data => {
  domEl.innerHTML = JSON.stringify(data);
};

const getData = (needRefresh = false) => {
  if (needRefresh) return fetch(url).then(fResp => fResp.json());
  return caches.match(url).then(response => {
    if (response) {
      console.log("served from cache", url);
      return response.json();
    } else return fetch(url).then(fResp => fResp.json());
  });
};

const request = needRefresh => async () => {
  clearDataDump();
  const jsonData = await getData(needRefresh);
  updateData(jsonData);
};

const onGetFreshAndUpdate = request(true);
const onGetCachedAndUpdate = request(false);
