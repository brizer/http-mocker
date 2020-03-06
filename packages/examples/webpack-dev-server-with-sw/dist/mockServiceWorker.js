/**
 * Mock Service Worker.
 * This Service Worker is meant for development usage only.
 * Make sure not to include it on production.
 */
const urlReg = /https?\:\/\/(.*)/gi;
self.addEventListener("install", event => {
  return self.skipWaiting();
});

self.addEventListener("activate", event => {
  console.log(
    "%c[http-mockjs service worker] Activated!",
    "color:green;font-weight:bold;"
  );
  return self.clients.claim();
});

self.addEventListener("message", event => {
  const data = event.data;
  switch (data.type) {
    case "MOCK_ACTIVATE": {
      self.__isMswEnabled = true;
      self.__MatchReg = data.regexp;
      break;
    }
    case "MOCK_DEACTIVATE": {
      self.__isMswEnabled = false;
      break;
    }
  }
});

function replaceUrl(url) {
  return url.replace(urlReg, "/swmock/$1");
}

self.addEventListener("fetch", function(event) {
  const { url: sourceUrl, method } = event.request;
  if (self.__isMswEnabled && self.__MatchReg.test(sourceUrl)) {
    const url = replaceUrl(sourceUrl);
    const req = new Request(url, { method });
    event.respondWith(
      fetch(req).then(function(response) {
        if (response.status === 404) {
          console.log(
            `%c[http-mockjs service worker] The request ${sourceUrl} was not detected, please check the configuration!`,
            "color:red;font-weight:bold;"
          );
        }
        return response;
      })
    );
  }
});
