import * as fs from 'fs'
import * as  path from 'path'
import * as http from 'http'
import * as semver from 'semver'
import * as express from 'express'
import color from 'http-mockjs-util/color'
import getConfig from './getConfig'
import proxy from './proxy'
import * as httpProxy from 'http-proxy'


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

  const serveProxy = httpProxy.createProxyServer({})
  http.createServer((req, res) => {
    serveProxy.web(req, res, {
      target: 'http://localhost:8080'
    })
  }).listen(8009)


  app.all('/*', (req, res, next) => {
    const proxyURL = `${req.method} ${req.path}`;
    const proxyLists = config.routes;
    console.log(process.cwd())
    console.log(proxyURL);
    console.log(proxyLists)
    const proxyMatch = proxyLists[proxyURL];
    //if there is a request config in the config file
    if (proxyMatch) {
      const curPath = path.join(process.cwd(), config.mockFileName, proxyMatch.path);
      const responseBody = fs.readFileSync(curPath, 'utf-8');
      res.send(responseBody);
      res.end();
    }
    else {
      next();
    }
  });
}

export default out