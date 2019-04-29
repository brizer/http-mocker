import * as fs from 'fs'
import * as  path from 'path'
import * as http from 'http'
import * as semver from 'semver'
import color from 'http-mockjs-util/color'
import getConfig from './getConfig'
import proxy from './proxy'
import * as httpProxy from 'http-proxy'


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

  const config = getConfig(__dirname)

  const serveProxy = httpProxy.createProxyServer({})

  http.createServer((req,res)=>{
    serveProxy.web(req,res,{
      target:'http://localhost:9008'
    })
  }).listen(8008)

  http.createServer((req,res)=>{
    const proxyURL = `${req.method} ${req.url}`
    const proxyLists = config.routes;
    const proxyMatch = proxyLists[proxyURL]
    //if there is a request config in the config file
    if(proxyMatch){
      console.log(proxyURL)
      const curPath = path.join(process.cwd(),config.mockFileName, proxyMatch.path)
      const responseBody = fs.readFileSync(curPath,'utf-8')
      res.write(responseBody)
    }
    res.end()
  }).listen(9008)
}

export default out