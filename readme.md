# http-mockjs

[中文文档](./readme_zh.md)

A tool for mock local requests or proxy remote requests.

It has the following functions:

1. Mock the mapping relationship through the httpmock field in the configuration file `.httpmockrc.json` or `package.json` file;

2. Support [mockjs](https://www.npmjs.com/package/mockjs) syntax, flexible configuration of dynamic mocker.

3. Identify express-style URLs based on [path-to-regexp](https://www.npmjs.com/package/path-to-regexp).

4. Based on [http-mockjs-ui](https://www.npmjs.com/package/http-mockjs-ui), manage configuration file by GUI to improve efficiency.

5. Convenient initialization and GUI editing experience.

6. Support for cross domain mock and proxy by [service worker](./packages/worker/README.md)


7. Support js config for complex rules.

8. Support for validating body by key and typeof value.

---

## Installation

Under the project directory

```sh
npm install --save-dev http-mockjs
```

Or global installation

```sh
npm install -g http-mockjs
```

## Initialize the configuration file

The mock process is according to the `.httpmockrc.json` file in the current directory, so the newer needs to generate the default configuration file:

```sh
http-mockjs init
```

A configuration file `.httpmockrc.json` will be generated in the current folder with the following contents:

```json
{
  "mockFileName": "mocks",
  "responseHeaders": {
    "Content-Type": "application/json",
    "X-Proxy-By": "http-mockjs"
  }
}
```

If you want to know how to write the configuration file. Please see at the bottom of the document.

## Visual GUI

Manage configuration files and mock content in GUI visualy [More details](./packages/editor/readme_zh.md)

![](https://raw.githubusercontent.com/brizer/graph-bed/master/img/20190605142856.png)

How to launch GUI:

```sh
http-mockjs ui
```


## Support cross domain interfaces

By introducing serviceworker to intercept clients, cross-domain mocking is supported.

For specific usage, please see [http-mockjs-sw](./packages/worker/README_ZH.md)

## Usage

It has been updated to version 4. If you are using 3.x, the documentation is [see here](https://github.com/brizer/http-mocker/tree/v3.x).

The new version requires only one package to implement visual management and initialization functions.

### Work with wepback by passing app object

```js
const {mocker} = require('http-mockjs')

devServer: {
  port: '8002',
  before:(app)=>{
    mocker(app)
  }
}
```

[Reference example](https://github.com/brizer/http-mocker/tree/dev/packages/examples/webpack-dev-server)

### Work with express

Just pass in the app object

```js
const app = express();
const { mocker } = require("http-mockjs");

mocker(app);

app.listen(8002);
```


### Work as middleware for express and connect

Support connect and express，some feature such as sleep, validate, custom header is limit.

``` js
const express = require("express");
const { mockerMiddleware } = require("http-mockjs");

const app = express();
const port = 3000;
app.use(mockerMiddleware);
//
//...
```



### Work with http-server and other command line tools:

By proxying the http-server, the request is proxyed to the proxy server started by `http-mockjs server`.

``` json
  "scripts": {
    "serve": "http-server -p 8008 -P http://localhost:8001/",
    "mock": "http-mockjs server -p 8001"
  }
```

[Reference example](https://github.com/brizer/http-mocker/tree/dev/packages/examples/http-server)

### More examples

[Here is more examples](https://github.com/brizer/http-mocker/tree/dev/packages/examples)

## Configuration file field description

### mockFileName

Where to load mock result

### responseHeaders

custom response headers

### requestHeaders 

custom request headers

When you do n’t use mocks and go to remote services, It's useful to customize cookies and tokens to simulate login.

### routes

Specific mapping

#### routes.path

file path

we use `*.json` file for mock result in general，but we can also support js file for complex mock rules:

``` json
  "GET /info":{
            "path": "/api/info.js"
        },
```

The req is same as [req in express](https://expressjs.com/en/4x/api.html#req):

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

#### routes.delay 

Delayed fetch resule.

It can be used in some specific scenarios when you need to simulate an asynchronous sequence of fetches.

#### routes.ignore

whether to skip matches.

Sometimes you want to keep the configuration, but you don't want it to take effect. For example, if a request needs to directly call the result of the remote instead of the local mock, you can use it.


#### routes.validate 

You have to set `parseBody:true` first:

``` json
{
    "parseBody": true
}
```

validate params in body by key and typeof value:

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

Here is an example of a complete configuration file:

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
    "parseBody": true,
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

The file pointed to is created in the folder specified by `mockFileName`.

The demo of the returned file is as follows, you can use mockjs style

```json
{
  "code": 0,
  "message": "success",
  "result": {
    "content": true,
    "name": "brizer123",
    "domain": "@domain()",
    "otherUrl": "@url()",
    "desciption": "@cparagraph(1,3)",
    "date": "@date('yyyy-MM-dd')"
  }
}
```
