const CACHE_DYNAMIC_NAME = "dynamic-v1";

self.addEventListener("install", (event) => {
  console.log("installing");
});

self.addEventListener("activate", (event) => {
  console.log("activating");
  return self.clients.cliam();
});

self.addEventListener("fetch", (event) => {
  console.log(event.request);
  event.respondWith(
    caches.match(event.request).then((res) => {
      if (res) {
        return res;
      }
      fetch(event.request).then((response) => {
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }

        const responseToCache = response.clone();

        caches.open(CACHE_DYNAMIC_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
          return response;
        });
      });
    })
  );
});
