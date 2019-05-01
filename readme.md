# http-mockjs

[中文文档](./README_ZH.md)


A tool for the local mock interface.

It has the following features:

1. Perform the mock mapping relationship through the httpmock field in the package.json , or configuration file .httpmockrc.


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
        }
    }
}
```

#### mockFileName
The root path where the mock file is stored

#### routes

Mapping management of the corresponding interface


### working with webpack-dev-server

Config in `devServer.before`

``` json
  devServer:{
    before:(app)=>{
      mocker(app)
    }
  }
```


### working with express

set app into mocker:

``` js
const app = express();

mocker(app)

app.listen(8002)

```