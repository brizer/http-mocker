import semver from 'semver'
import getConfig from './getConfig'
import * as pkg from '../package.json'
const requiredVersion = pkg.engines.node

// judge the node version first
if (!semver.satisfies(process.version, requiredVersion)) {
    console.log(
      `You are using Node ${process.version}, but http-mockjs ` +
      `requires Node ${requiredVersion}.\nPlease upgrade your Node version.`
    )
    process.exit(1)
  }

const config = getConfig(__dirname)

export default 1