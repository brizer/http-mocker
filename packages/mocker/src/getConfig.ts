import cosmiconfig from 'cosmiconfig'
import { Config } from '../declations/Config';
import * as defaultConf from './defaultConfig'

const deepmerge = require('deepmerge')

/**
 * Get config object
 * @param {string} dir - path
 * @return {object} finalConfig - config content
 */
const getConfig = (dir: string): Config => {
    const explorer = cosmiconfig('httpmock')
    const {
        config = {}
    } = explorer.searchSync(dir) || {}

    const finalConfig = deepmerge(defaultConf.default, config)
    return finalConfig
}

export default getConfig