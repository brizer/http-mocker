import getConfig from './getConfig'
import proxy from './proxy'
import {Options} from '../declations/Index'
import version from 'http-mockjs-util/version';

const deepmerge = require('deepmerge')
const pkg = require('../package.json')
const requiredVersion = pkg.engines.node

const out = (app,options:Options|any) => {
  // judge the node version first
  options = options||{}
  if(!version.isNodeVersionsupport(requiredVersion)){
    process.exit(1)
  }

  const config = getConfig(process.cwd())
  const proxyOptions = deepmerge(config,options)

  proxy(app,proxyOptions)
}

export const mocker =  out