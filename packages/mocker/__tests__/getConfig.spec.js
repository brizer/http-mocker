'use strict';

const fs = require('fs')
const path = require('path')

let testConf = {
    httpmock : {
        mockFileName : 'customFile'
    }
}
const getConfig = require('../lib/getConfig').default;
describe('getConfig', () => {
    test('with no config, should return default', () => {
        const config = getConfig(path.join(__dirname,'../../'))
        expect(config).toEqual({
            'mockFileName':'mocks'
        })
    })

    test('with config in package.json, should return the result', () => {
        const dir = __dirname
        fs.writeFileSync(
            path.join(dir,'package.json'),
            JSON.stringify(testConf)
        )
        const config = getConfig(dir)

        expect(config.mockFileName).toEqual(testConf.httpmock.mockFileName)
    })

    test('with config in .httpmockrc, should return the result', () => {
        const config = getConfig(path.join(__dirname,'../'))
        expect(config.mockFileName).toEqual('mymocks')
    })

});
