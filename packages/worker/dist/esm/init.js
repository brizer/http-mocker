function listenToDeactivateWorker(worker) {
    window.addEventListener("beforeunload", function () {
        // Deactivate requests interception before page unload.
        // Initial page load requests client assets (HTML, CSS, JS),
        // which, if passed through the interception handler, may result
        // into a broken page.
        if (worker && worker.state !== "redundant") {
            worker.postMessage({ type: "MOCK_DEACTIVATE" });
        }
    });
}
function registerServiceWorker(worker, serviceWorkerUrl, options, regexp) {
    navigator.serviceWorker
        .register(serviceWorkerUrl, options)
        .then(function (reg) {
        var workerInstance = reg.active || reg.installing || reg.waiting;
        workerInstance.postMessage({ type: "MOCK_ACTIVATE", regexp: regexp });
        worker = workerInstance;
        listenToDeactivateWorker(worker);
        return reg;
    })
        .catch(function (error) {
        console.error("[http-mockjs-sw] Failed to register MockServiceWorker (%s). %o", serviceWorkerUrl, error);
    });
}
export default function init(options) {
    if (options === void 0) { options = {
        reg: /https?:\/\/http-mockjs/
    }; }
    var reg = options.reg, _a = options.serviceWorkerUrl, serviceWorkerUrl = _a === void 0 ? "./mockServiceWorker.js" : _a, serviceOptions = options.serviceOptions;
    var worker;
    registerServiceWorker(worker, serviceWorkerUrl, serviceOptions, reg);
}
