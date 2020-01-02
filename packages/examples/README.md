# `examples`

Examples for http-mocker

## use

### http-server

1. Use custom folder named `mymocks`;

2. Configure in package.json instead of configuration file;

3. Build parameters using mockjs's syntax;

4. Start the service proxy mode for mock by specify the port and cooperate with http-server,

Configuration method:

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

The content of `get.json` is in the style of mockjs:

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

1. Used with webpack-dev-server

2. Using a configuration file named `.httpmockrc.json`

3. Using ui tool to improve editing efficiency

webpack configuration script:

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

Start command:

``` json
{
  "scripts": {
    "server": "webpack-dev-server",
    "mock:ui": "http-mockjs ui"
  }
}

```