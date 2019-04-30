import * as semver from 'semver'
import color from 'http-mockjs-util/color'
import getConfig from './getConfig'
import proxy from './proxy'
import {Options} from '../declations/Index'

const deepmerge = require('deepmerge')
const pkg = require('../package.json')
const requiredVersion = pkg.engines.node

const out = (app,options:Options) => {
  // judge the node version first
  if (!semver.satisfies(process.version, requiredVersion)) {
    console.error(
      `${color('Error ').red} You are using Node ${process.version}, but http-mockjs ` +
      `requires Node ${requiredVersion}.\nPlease upgrade your Node version.`
    )
    process.exit(1)
  }

  const config = getConfig(process.cwd())
  const proxyOptions = deepmerge(config,options)

  proxy(app,proxyOptions)
}

export default out