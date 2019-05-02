# http-mockjs

一个用来本地mock接口的工具。

它拥有以下功能：

1、通过配置文件.httpmockrc或者package.json文件中的httpmock字段来进行mock映射关系；

---

## 使用方式

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
        }
    }
}
```

#### mockFileName
mock文件存放的根路径

#### routes

对应接口的映射管理


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