# http-mockjs

一个用来本地mock接口或代理远程的工具。

它拥有以下功能：

1、通过配置文件.httpmockrc.json或者package.json文件中的httpmock字段来进行mock映射关系；

2、支持[mockjs](https://www.npmjs.com/package/mockjs)语法,灵活配置动态化的mock返回值;

3、基于[path-to-regexp](https://www.npmjs.com/package/path-to-regexp)识别express风格的url

4、基于[http-mockjs-ui](https://www.npmjs.com/package/http-mockjs-ui)，通过可视化的方式管理配置文件和mock文件内容，提高效率。

5、方便的初始化和GUI编辑体验。

6、支持mock和proxy跨域的接口，通过[service worker](./packages/worker/README_ZH.md)

7、支持js定制复杂的规则。

8、支持对body参数的校验。

---

## 安装

在工程目录下

``` sh 
npm install --save-dev http-mockjs
```

或者全局安装

``` sh
npm install -g http-mockjs
```

## 初始化配置文件

根据当前目录下的`.httpmockrc.json`文件来完成路由映射，所以第一次下载需要生成默认配置文件：

``` sh
http-mockjs init
```

会在当前文件夹下产生配置文件`.httpmockrc.json`，文件内容如下：

``` json
{
    "mockFileName": "mocks",
    "responseHeaders": {
        "Content-Type": "application/json"
    }
}

```

配置文件如何书写，[请看这里](#配置文件字段说明)


## 可视化界面

可视化管理配置文件和mock内容。[更多详情](./packages/editor/readme_zh.md)

![](https://raw.githubusercontent.com/brizer/graph-bed/master/img/20190605142856.png)

使用方式：

``` sh
http-mockjs ui
```

## 支持跨域接口

通过引入serviceworker对客户端进行拦截，支持跨域mock。
具体使用方式请查看[http-mockjs-sw](./packages/worker/README_ZH.md)

## 使用方式


目前已经更新到版本4了。如果你使用的是3.x，文档请[查看此处](https://github.com/brizer/http-mocker/tree/v3.x)。

新版本只需要一个包，就可以实现可视化管理和初始化功能。

### 和webpack一起，将app对象传入

``` js
const { mocker } = require('http-mockjs')

devServer:{
  port:'8002',
  before:(app)=>{
    mocker(app)
  }
}
```

[参考例子](https://github.com/brizer/http-mocker/tree/dev/packages/examples/webpack-dev-server)


### 与express配合

直接将app对象传入即可

``` js
const app = express();
const { mocker } = require('http-mockjs')

mocker(app)

app.listen(8002)

```


### 与http-server等命令行工具使用：

通过代理http-server，将请求代理到httpmock启动的代理服务器上。
``` json
  "scripts": {
    "serve": "http-server -p 8008 -P http://localhost:8001/",
    "mock": "http-mockjs server -p 8001"
  }
```

[参考例子](https://github.com/brizer/http-mocker/tree/dev/packages/examples/http-server)

### 更多例子

所有例子可以[参考](https://github.com/brizer/http-mocker/tree/dev/packages/examples)


## 配置文件字段说明

### mockFileName 接口的mock返回值在哪个文件夹下去读取

### responseHeaders 自定义的响应头

### requestHeaders 自定义的请求头

在不使用mock，走代码到远程服务的时候可以启用，自定义cookie和token来模拟登录相关

### routes 具体的映射关系

#### routes.path 文件路径

一般情况下使用*.json文件作为返回值的mock，也可以通过javascript文件来满足复杂情况下的定制化数据mock。比如：

``` json
  "GET /info":{
            "path": "/api/info.js"
        },
```

js文件书写格式如下，其中req对象和[express的req](https://expressjs.com/en/4x/api.html#req)保持一致：

``` js
module.exports = function (req) {
    const { query,params } = req;
    const { type } = query;
    if(type == 1){
        return {
            name:'This is from js and type 1'
        }
    }else{
        return {
            name:'This is from js and type 2'
        }
    }
}
```

#### routes.delay 延迟返回

某些特定场景，需要模拟异步顺序时，可以用到。

#### routes.ignore 是否跳过匹配.

有时候你想要保留该配置，但是又不希望其生效，比如说某个接口需要直接调用远端而不是本地mock的结果时，可以用上它。

#### routes.validate 对body进行严格校验

对body参数进行key和type校验：

``` json
"POST /j/validate.json": {
    "path": "/api/validate.json",
    "ignore": false,
    "validate": {
        "param1": "string",
        "param2": "number",
        "param3": "object"
    }
}
```


这里给出一个完整的配置文件例子：

``` json
{
    "mockFileName": "mocks",
    "responseHeaders": {
        "Content-Type": "application/json",
        "X-Proxy-By": "http-mockjs"
    },
    "requestHeaders": {
        "cookie":"Token=123ssfsfesfe"
    },
    "routes":{
        "GET /j/getSomeData.json":
        {
            "path": "/api/get.json"
        },
        "POST /p/postData.do":
        {
            "path": "/api/post.json"
        },
        "GET /user/:id":{
            "path": "/api/user.json"
        },
        "GET /users/:id+":{
            "path": "/api/info.json",
            "ignore": true
        },
        "GET /users/user?id=123":{
            "path": "/api/user/123.json",
            "ignore": true,
            "delay": 1000
        },
         "GET /j/fromjs": {
            "path": "/api/from.js",
            "ignore": false,
            "delay": 900,
            "validate": {}
        },
        "POST /j/validate.json": {
            "path": "/api/validate.json",
            "ignore": false,
            "validate": {
                "param1": "string",
                "param2": "number",
                "param3": "object"
            }
        }
    }
}

```

指向的文件请在`mockFileName`指定的文件夹下创建。

返回文件内容demo如下，可以使用mockjs风格


``` json
{
    "code":0,
    "message":"success",
    "result":{
        "content":true,
        "name":"brizer123",
        "domain":"@domain()",
        "otherUrl":"@url()",
        "desciption":"@cparagraph(1, 3)",
        "date":"@date('yyyy-MM-dd')"
    }
}
```

