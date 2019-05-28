import * as cosmiconfig from 'cosmiconfig';
import { Config } from '../declations/Config';
import * as defaultConf from './defaultConfig'
import { fileURLToPath } from 'url';

const deepmerge = require('deepmerge')
let configPath:string = '';

/**
 * Get config object
 * @param {string} dir - path
 * @return {object} finalConfig - config content
 */
const getConfig = (dir: string): Config => {
    const explorer = cosmiconfig('httpmock')
    const {
        config = {},
        filepath = ''
    } = explorer.searchSync(dir) || {}

    configPath = filepath

    const finalConfig = deepmerge(defaultConf.default, config)
    return finalConfig
}

export const getConfigPath = ()=>{
    return configPath
}

export default getConfig