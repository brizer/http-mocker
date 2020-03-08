# http-mockjs-sw

[中文文档](./README_ZH.md)

Mock and proxy for requests from  different domains by registering serviceworker with client code.

## Installation

``` sh
npm i http-mockjs-sw
```

## Usage


If you need to mock a request from a different domain, you need to do the following after using http-mockjs to start a mock service or proxy:

1、Create a `mockServiceWorker.js` file in the same directory as the html file of the project entry. The file content is [The content of serviceworker](https://unpkg.com/http-mockjs-sw/sw/mockServiceWorker.js).(The registration files must be located under the same site, due to the serviceworker security mechanism)

2、Inject client-side mock logic in the development environment and pass in the cross-domain interface regular rules that need to match. (The registration logic is best placed at the front of all js to prevent loading order from affecting mock results.)

Support umd：

``` html
<script src="https://unpkg.com/http-mockjs-sw/dist/umd/index.umd.js"></script>
<script>
window.HttpMockJsSW({
    reg: /someotherdomain/gi
});
</script>
```

and import：

``` js
import mocker from "http-mockjs-sw";
mocker({
    reg:/other\.domain/ig
})
```

3、Modify matching routing rules

Routes that meet the cross-domain regular match will be simulated local replication of `swmock`.

If the request is`https://github.com/api/v1/get.json`, then it's match route should be `/swmock/github.com/api/v1/get.json`.

For example：

``` json
{
    "$schema": "http://json.schemastore.org/httpmockrc",
    "mockFileName": "mocks",
    "responseHeaders": {
        "Content-Type": "application/json",
        "X-Proxy-By": "http-mockjs"
    },
    "routes": {
        "GET /j/new?id=123": {
            "path": "/api/123.json",
            "ignore": false,
            "delay": 900
        },
        "GET /swmock/other.domain/somexhr.json": {
            "path": "/swmock/other.domain/somexhr.json",
            "ignore": false
        }
    }
}

```

In this way, the cross-domain interface can also be mocked normally.

4、Remove mock

The ignore field in http-mockjs is useless because the serviceworker is filter in client. So if you want to remove the mock, change the reg or remove the mock register.