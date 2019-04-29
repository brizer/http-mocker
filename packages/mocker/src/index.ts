import * as semver from 'semver'
import * as express from 'express'
import color from 'http-mockjs-util/color'
import getConfig from './getConfig'
import proxy from './proxy'

const pkg = require('../package.json')
const requiredVersion = pkg.engines.node

const out = ()=>{
  // judge the node version first
  if (!semver.satisfies(process.version, requiredVersion)) {
    console.error(
      `${color('Error ').red} You are using Node ${process.version}, but http-mockjs ` +
      `requires Node ${requiredVersion}.\nPlease upgrade your Node version.`
    )
    process.exit(1)
  }

  const app = express()
  const config = getConfig(__dirname)

  app.get('/*',(req, res, next)=>{
    const proxyURL = `${req.method} ${req.path}`
    const proxyLists = config.routes;
    console.log(proxyLists)
  })
  console.log('hehe')
  app.listen(3000)
}

export default out