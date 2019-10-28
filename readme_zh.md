# http-mockjs

一个用来本地mock接口的工具。

它拥有以下功能：

1、通过配置文件.httpmockrc或者package.json文件中的httpmock字段来进行mock映射关系；

2、支持[mockjs](https://www.npmjs.com/package/mockjs)语法,灵活配置动态化的mock返回值;

3、基于[path-to-regexp](https://www.npmjs.com/package/path-to-regexp)识别express风格的url

4、基于[http-mockjs-ui](https://www.npmjs.com/package/http-mockjs-ui)，通过可视化的方式管理配置文件和mock文件内容，提高效率。[详细可见](./packages/editor/readme_zh.md)

---

## 使用方式

### 可视化界面

可视化管理配置文件和mock内容.[更多详情](./packages/editor/readme_zh.md)

![](https://raw.githubusercontent.com/brizer/graph-bed/master/img/20190605142856.png)

### 配置文件含义

以一个配置文件.httpmockrc为例：

``` json
{
    "mockFileName":"mymocks",
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
            "ignore": true
        }
    }
}
```

支持自定义响应头responseHeaders，默认的Content-Type为application/json：

``` json
{
    "mockFileName":"mymocks",
    "responseHeaders":{
      "Content-Type":"application/json",
      "xixi":"hah"
    }
}
```


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

#### mockFileName
mock文件存放的根路径，默认是`mocks`

#### routes

对应接口的映射管理


##### path

映射对应的本地mock文件的路径 

##### ignore

如果设置为true，则跳过该匹配规则.

有时候你想要保留该配置，但是又不希望其生效，比如说某个接口需要直接调用远端而不是本地mock的结果时。可以用上它。



#### port

开启mockserver的端口，默认是8009

#### responseHeaders

自定义响应头.


### 与webpack-dev-server配合

在devServer参数中设置：

``` js
  devServer:{
    before:(app)=>{
      mocker(app)
    }
  }
```

[demo](https://github.com/brizer/http-mocker/blob/dev/packages/mocker/examples/webpack/package.json)


### 与express配合

直接将app对象传入即可

``` js
const app = express();
const {mocker} = require('http-mockjs')

mocker(app)

app.listen(8002)

```


### 与http-server等命令行工具使用：

通过代理http-server，将请求代理到httpmock启动的代理服务器上。
``` json
  "scripts": {
    "serve": "http-server -p 8008 -P http://localhost:8001/",
    "mock": "httpmock 8001"
  },
```

[demo](https://github.com/brizer/http-mocker/blob/dev/packages/mocker/examples/commander/package.json)