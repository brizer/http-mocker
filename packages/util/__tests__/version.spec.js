const versionUtil = require('../version').default


describe('version util',()=>{
    //mock process.version
    beforeAll(()=>{
        Object.defineProperties(process,{
            'version':{
                value:'8.9.1'
            }
        })
    })
    test('isNodeVersionsupport success should return true',()=>{
        const isSupport = versionUtil.isNodeVersionsupport(">= 8.0.0")
        expect(isSupport).toBe(true)
    })

    test('isNodeVersionsupport success should return true',()=>{
        const isSupport = versionUtil.isNodeVersionsupport(">= 10.0.0")
        expect(isSupport).toBe(false)
    })
})