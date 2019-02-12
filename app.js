(function() {
  navigator.serviceWorker.addEventListener("message", event => {
    console.log(event.data);
  });

  function updateData(data) {
    var domEl = document.getElementById("data-dump");
    domEl.innerHTML = data;
  }

  fetch("https://jsonplaceholder.typicode.com/todos/1")
    .then(response => response.json())
    .then(data => {
      console.log("fetch", data);
      updateData(JSON.stringify(data));
    });
})();
