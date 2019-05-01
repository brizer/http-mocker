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

``` json
  devServer:{
    before:(app)=>{
      mocker(app)
    }
  }
```


### 与express配合

直接将app对象传入即可

``` js
const app = express();

mocker(app)

app.listen(8002)

```