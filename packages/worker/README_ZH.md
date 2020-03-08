# http-mockjs-sw

通过给客户端代码注册serviceworker，来达到对不同域接口的mock和proxy。

## 安装

``` sh
npm i http-mockjs-sw
```

## 使用

在使用http-mockjs启动mock服务或代理后，如果需要mock不同域请求，需要作如下操作：

1、在项目入口html文件同一目录下新建`mockServiceWorker.js`文件，文件内容为[serviceworker处理文件内容](https://unpkg.com/http-mockjs-sw/sw/mockServiceWorker.js)。（由于serviceworker安全机制，注册文件必须位于同一站点下。）

2、在开发环境注入客户端mock逻辑，传入需要匹配的跨域接口正则规则。（注册逻辑最好位于所有js最前面，防止加载顺序影响mock结果。）

支持umd的方式：

``` html
<script src="https://unpkg.com/http-mockjs-sw/dist/umd/index.umd.js"></script>
<script>
window.HttpMockJsSW({
    reg: /someotherdomain/gi
});
</script>
```

和import方式：

``` js
import mocker from "http-mockjs-sw";
mocker({
    reg:/other\.domain/ig
})
```

3、修改匹配路由规则。

满足跨域正则匹配到的路由，会进行`swmock`的模拟本地复写。

如果请求的是`https://github.com/api/v1/get.json`，则对应的匹配规则为`/swmock/github.com/api/v1/get.json`。

所以在配置跨域接口的路由时，需要注意，配置文件举例如下：

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

如此以来，跨域接口也能够正常mock了。

4、取消mock

由于serviceworker在客户端进行了拦截，所以http-mockjs配置文件中的ignore不再生效，如果要取消mock，自行修改匹配正则或注释客户端mock代码即可。