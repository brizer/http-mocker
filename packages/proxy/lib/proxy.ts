import * as path from "path";
import * as fs from "fs";
import * as mock from "mockjs";
import color from "http-mockjs-util/color";
import { getMatechedRoute } from "http-mockjs-util/matchRoute";
import { watch } from "chokidar";
import {
  getConfigPath,
  default as getConfig
} from "http-mockjs-util/getConfig";
import { sleep } from "http-mockjs-util/delay";
import { Config, Routes } from "http-mockjs-util/declations";
import { Application } from 'express';
/**
 * Print proxy init info
 * @param {object} config - config info
 */
const printProxyInfo = (config: Config) => {
  const proxyLists = config.routes;
  //init proxy output:
  if (!proxyLists) {
    console.log(color(` Please set some matching rules to routes`).red);
    process.exit(0);
  }
  Object.keys(proxyLists).forEach(key => {
    const proxyMatch = proxyLists[key];
    const mapLocalPath = path.join(
      process.cwd(),
      config.mockFileName,
      proxyMatch.path
    );
    console.log(
      `${color(key).green} ${color("has been map local to").red} ${
        color(mapLocalPath).yellow
      }`
    );
  });
};
/**
 * Specific proxy operation
 * @param {object} app - app object
 * @param {object} config - user config info
 */
const proxy = async (app:Application, config: Config) => {
  let proxyLists = config.routes;
  let responseHeaders = config.responseHeaders;
  let requestHeaders = config.requestHeaders;

  //print info
  printProxyInfo(config);

  //watch config file changes
  const configPath: string = getConfigPath();
  const watcher = watch(configPath);
  watcher.on("all", path => {
    const config = getConfig(process.cwd());
    proxyLists = config.routes;
    responseHeaders = config.responseHeaders;
    requestHeaders = config.requestHeaders;
    console.log(color(" The content of http-mockjs'config file has changed").green);
  });
  //filter configed api and map local
  app.all("/*",async (req, res, next) => {
    const proxyURL: string = `${req.method} ${req.originalUrl}`;
    const proxyMatch = getMatechedRoute(proxyLists, proxyURL);

    //if there is a request config in the config file
    if (proxyMatch && proxyMatch.ignore !== true) {
      const curPath = path.join(
        process.cwd(),
        config.mockFileName,
        proxyMatch.path
      );
      if(proxyMatch.delay && typeof proxyMatch.delay === 'number'){
        await sleep(proxyMatch.delay)
      }
      const responseBody = fs.readFileSync(curPath, "utf-8");
      const result = mock.mock(responseBody);
      // set custom response headers
      res.set(responseHeaders);
      res.send(result);
      res.end();
    } else {
      // add custom requestHeaders to matched items.
      const proxyHeaders = Object.assign({},req.headers,requestHeaders);
      req.headers = proxyHeaders;
      next();
    }
  });
};

export default proxy;
