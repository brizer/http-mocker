interface InitOptions {
  reg: RegExp;
  serviceWorkerUrl?: string;
  serviceOptions?: RegistrationOptions;
}
function listenToDeactivateWorker(worker: ServiceWorker) {
  window.addEventListener("beforeunload", () => {
    // Deactivate requests interception before page unload.
    // Initial page load requests client assets (HTML, CSS, JS),
    // which, if passed through the interception handler, may result
    // into a broken page.
    if (worker && worker.state !== "redundant") {
      worker.postMessage({type:"MOCK_DEACTIVATE"});
    }
  });
}

function registerServiceWorker(
  worker: ServiceWorker,
  serviceWorkerUrl: string,
  options: RegistrationOptions,
  regexp: RegExp
) {
  navigator.serviceWorker
    .register(serviceWorkerUrl, options)
    .then(reg => {
      const workerInstance = reg.active || reg.installing || reg.waiting;

      workerInstance.postMessage({ type: "MOCK_ACTIVATE", regexp });
      worker = workerInstance;
      return reg;
    })
    .catch(error => {
      console.error(
        "[http-mockjs-sw] Failed to register MockServiceWorker (%s). %o",
        serviceWorkerUrl,
        error
      );
    });
  return worker;
}
export default function init(
  options: InitOptions = {
    reg: /https?:\/\/http-mockjs/
  }
) {
  const { reg, serviceWorkerUrl="./mockServiceWorker.js", serviceOptions } = options;
  let worker: ServiceWorker;
  worker = registerServiceWorker(worker, serviceWorkerUrl, serviceOptions, reg);
  listenToDeactivateWorker(worker);
}
