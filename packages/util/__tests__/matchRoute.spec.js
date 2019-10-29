const { getMatechedRoute } = require('../matchRoute')


describe('matchRoute util',()=>{
    let proxyList;
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
            "GET /user/332":{
                "path": "/api/user/332.json"
            },
            "GET /user/:id/get.json":{
                "path": "/api/user/get.json"
            },
            "GET /user/332/get":{
                "path": "/api/user/332/get.json"
            },
            "GET /user/:id?id=123":{
                "path": "/api/user/123.json"
            },
            "GET /user/345?id=123":{
                "path": "/api/user/345.json"
            }
        }
    })
    test('get of methods can be matched',()=>{
        const { path } = getMatechedRoute(proxyList,'GET /get.json');
        expect(path).toBe('/api/get.json')
    })
    test('put of methods can be matched',()=>{
        const { path } = getMatechedRoute(proxyList,'PUT /put.json');
        expect(path).toBe('/api/put.json')
    })
    test('random params in path',()=>{
        const { path } = getMatechedRoute(proxyList,'GET /user/343');
        expect(path).toBe('/api/user.json')
    })
    test('special params in path',()=>{
        const { path } = getMatechedRoute(proxyList,'GET /user/332');
        expect(path).toBe('/api/user/332.json')
    })
    test('random params in path and have child path',()=>{
        const { path } = getMatechedRoute(proxyList,'GET /user/343/get.json');
        expect(path).toBe('/api/user/get.json')
    })
    test('specials params in path and have child path',()=>{
        const { path } = getMatechedRoute(proxyList,'GET /user/332/get');
        expect(path).toBe('/api/user/332/get.json')
    })
    test('random params in path with some special query',()=>{
        const { path } = getMatechedRoute(proxyList,'GET /user/12345?id=123');
        expect(path).toBe('/api/user/123.json')
    })
    test('special params in path with some special query',()=>{
        const { path } = getMatechedRoute(proxyList,'GET /user/345?id=123');
        expect(path).toBe('/api/user/345.json')
    })
    test('special params in path with some special query but not in list',()=>{
        const { path } = getMatechedRoute(proxyList,'GET /user/345?id=1234');
        expect(path).toBe('/api/user.json')
    })
})