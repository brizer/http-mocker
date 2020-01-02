# `examples`

> Examples for http-mocker

## 使用

### http-server

1、使用自定义文件夹mymocks；

2、在package.json中配置，而不是配置文件；

3、使用mockjs语法构建参数

4、指定端口，配合http-server，启动服务代理方式进行mock

配置方式：


``` json
{
  "scripts": {
    "start": "npm run mock | npm run serve",
    "serve": "http-server -p 8008 -P http://localhost:8001/",
    "mock": "http-mockjs server -p 8001"
  },
  "httpmock": {
    "mockFileName": "mymocks",
    "routes": {
      "GET /getsomething.do": {
        "path": "/get.json"
      },
      "POST /postsomething.do": {
        "path": "/post.json"
      }
    }
  }
}
```

其中mockjs风格的get.json内容为：

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


### webpack-dev-server

1、和webpack-dev-server配合使用

2、采用配置文件的方式

3、启动ui工具，提高编辑效率

webpack配置脚本：

``` js
const { mocker } = require('http-mockjs')

module.exports = {
  devServer:{
    port:'8002',
    before:(app)=>{
      mocker(app)
    }
    // proxy: {
    //   '*': 'http://localhost:8000'
    // }
  }
};
```

启动命令：

``` json
{
  "scripts": {
    "server": "webpack-dev-server",
    "mock:ui": "http-mockjs ui"
  }
}

```