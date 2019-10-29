const { getMatechedRoute } = require('../matchRoute')


describe('matchRoute util',()=>{
    let proxyList;
    //mock process.version
    beforeAll(()=>{
        proxyList = {
            "GET /get.json": {
                "path": "/api/get.json"
            },
            "PUT /put.json": {
                "path": "/api/put.json"
            },
            "GET /user/:id":{
                "path": "/api/user.json"
            },
            "GET /users/:id+":{
                "path": "/api/info.json"
            },
            "GET /j/new": {
                "path": "/api/info.json"
            },
            "GET /j/new?id=123": {
                "path": "/api/123.json"
            }
        }
    })
    test('get of methods can be matched',()=>{
        const { path } = getMatechedRoute(proxyList,'GET /get.json');
        expect(path).toBe('/api/get.json')
    })
})