!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e=e||self).HttpMockJsSW=t()}(this,(function(){"use strict";return function(e={reg:/https?:\/\/http-mockjs/}){const{reg:t,serviceWorkerUrl:o="./mockServiceWorker.js",serviceOptions:r}=e;let n;n=function(e,t,o,r){return navigator.serviceWorker.register(t,o).then(t=>{const o=t.active||t.installing||t.waiting;return o.postMessage({type:"MOCK_ACTIVATE",regexp:r}),e=o,t}).catch(e=>{console.error("[http-mockjs-sw] Failed to register MockServiceWorker (%s). %o",t,e)}),e}(n,o,r,t),function(e){window.addEventListener("beforeunload",()=>{e&&"redundant"!==e.state&&e.postMessage({type:"MOCK_DEACTIVATE"})})}(n)}}));
