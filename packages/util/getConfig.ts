import cosmiconfig from 'cosmiconfig';
import jsonfile from 'jsonfile'
import { Config } from './declations';
import defaultConf from './defaultConfig'

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

    const finalConfig = deepmerge(defaultConf, config)
    return finalConfig
}

export const getConfigPath = ()=>{
    return configPath
}
/**
 * set config info into config file
 * @param {object} configInfo configInfo
 */
export const setConfig = (configInfo:any)=> {
    const dir = getConfigPath()
    return jsonfile.writeFile(dir,configInfo,{spaces:4})
}

export default getConfig