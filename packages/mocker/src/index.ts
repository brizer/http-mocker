import * as semver from 'semver'
import color from 'http-mockjs-util/color'
import getConfig from './getConfig'
import proxy from './proxy'


const pkg = require('../package.json')
const requiredVersion = pkg.engines.node

const out = (app) => {
  // judge the node version first
  if (!semver.satisfies(process.version, requiredVersion)) {
    console.error(
      `${color('Error ').red} You are using Node ${process.version}, but http-mockjs ` +
      `requires Node ${requiredVersion}.\nPlease upgrade your Node version.`
    )
    process.exit(1)
  }

  const config = getConfig(process.cwd())

  proxy(app,config)
}

export default out