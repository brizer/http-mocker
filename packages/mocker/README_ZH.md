# http-mockjs

一个用来本地mock接口或代理远程的工具。

它拥有以下功能：

1、通过配置文件.httpmockrc或者package.json文件中的httpmock字段来进行mock映射关系；

2、支持[mockjs](https://www.npmjs.com/package/mockjs)语法,灵活配置动态化的mock返回值;

3、基于[path-to-regexp](https://www.npmjs.com/package/path-to-regexp)识别express风格的url

4、基于[http-mockjs-ui](https://www.npmjs.com/package/http-mockjs-ui)，通过可视化的方式管理配置文件和mock文件内容，提高效率。

5、方便的初始化和GUI编辑体验。

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

根据当前目录下的`.httpmockrc`文件来完成路由映射，所以第一次下载需要生成默认配置文件：

``` sh
http-mockjs init
```

会在当前文件夹下产生配置文件`.httpmockrc`，文件内容如下：

``` json
{
    "mockFileName": "mocks",
    "responseHeaders": {
        "Content-Type": "application/json",
        "X-Proxy-By": "http-mockjs"
    }
}

```

配置文件如何书写，[请看这里](#配置文件字段说明)


## 可视化界面

可视化管理配置文件和mock内容。[更多详情](https://github.com/brizer/http-mocker/blob/dev/packages/editor/readme_zh.md)

![](https://raw.githubusercontent.com/brizer/graph-bed/master/img/20190605142856.png)

使用方式：

``` sh
http-mockjs ui
```


## 使用方式


目前已经更新到版本4了。如果你使用的是3.x，文档请[查看此处](https://github.com/brizer/http-mocker/tree/v3.x)。

新版本只需要一个包，就可以实现可视化管理和初始化功能。


### 直接作为代理服务器，从命令行中运行

``` sh
http-mockjs server -p 8008
```

[参考例子](https://github.com/brizer/http-mocker/tree/dev/packages/mocker/examples/basic)

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

[参考例子](https://github.com/brizer/http-mocker/tree/dev/packages/mocker/examples/webpack)


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

[参考例子](https://github.com/brizer/http-mocker/tree/dev/packages/mocker/examples/commander)


## 配置文件字段说明

### mockFileName 接口的mock返回值在哪个文件夹下去读取

### responseHeaders 自定义的响应头

### routes 具体的映射关系

#### routes.path 文件路径

#### routes.ignore 是否跳过匹配.

有时候你想要保留该配置，但是又不希望其生效，比如说某个接口需要直接调用远端而不是本地mock的结果时，可以用上它。

这里给出一个完整的配置文件例子：

``` json
{
    "mockFileName": "mocks",
    "responseHeaders": {
        "Content-Type": "application/json",
        "X-Proxy-By": "http-mockjs"
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
            "ignore": true
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

