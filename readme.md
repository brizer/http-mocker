# http-mockjs[![npm](https://img.shields.io/npm/v/http-mockjs.svg?maxAge=2592000)](https://www.npmjs.com/package/http-mockjs)

[中文文档](./readme_zh.md)


A tool for the local mock interface.

It has the following features:

1. Perform the mock mapping relationship through the httpmock field in the package.json , or configuration file .httpmockrc.
2. Support [mockjs](https://www.npmjs.com/package/mockjs) syntax, flexible configuration of dynamic mock return value;
3. Identify express-style urls based on [path-to-regexp](https://www.npmjs.com/package/path-to-regexp)


---

## Usage

### Configuration

Take a configuration file `.httpmockrc` as an example:

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
            "path": "/api/info.json"
        }
    }
}
```

Return the file content demo as follows, you can use the mockjs style:

```
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
The root path where the mock file is stored, default is `mocks`

#### routes

Mapping management of the corresponding interface

#### port

Which port to start mock server, default is 8009


### working with webpack-dev-server

Config in `devServer.before`

``` js
  devServer:{
    before:(app)=>{
      mocker(app)
    }
  }
```


[demo](https://github.com/brizer/http-mocker/blob/dev/packages/mocker/examples/webpack/package.json)


### working with express

set app into mocker:

``` js
const app = express();
const {mocker} = require('http-mockjs')

mocker(app)

app.listen(8002)

```


### working with command line tools such as http-server

Proxy the request to the proxy server started by httpmock through the proxy http-server.

``` json
  "scripts": {
    "serve": "http-server -p 8008 -P http://localhost:8001/",
    "mock": "httpmock 8001"
  }
```

[demo](https://github.com/brizer/http-mocker/blob/dev/packages/mocker/examples/commander/package.json)

