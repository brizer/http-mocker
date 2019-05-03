import * as process from 'process'
import * as semver from 'semver'
import color from './color'

/**
 * judge current node verion
 * @param {string} requiredVersion - node version written in package.json engines.node
 * @return {boolean} - isSupport
 */
const isNodeVersionsupport = (requiredVersion:string,packageName:string='http-mockjs'):boolean=>{
    if (!semver.satisfies(process.version, requiredVersion)) {
        console.error(
          `${color('Error ').red} You are using Node ${process.version}, but ${packageName} ` +
          `requires Node ${requiredVersion}.\nPlease upgrade your Node version.`
        )
        return false
    }
    return true;
}

export default {
    isNodeVersionsupport
}