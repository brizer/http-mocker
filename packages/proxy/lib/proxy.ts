import * as path from "path";
import { IncomingMessage, ServerResponse } from "http";
import * as fs from "fs";
import * as mock from "mockjs";
import * as express from "express";
import { tableContent } from "@tomato-node/ui";
import { NodeVM } from "vm2";
import color from "http-mockjs-util/color";
import { forEach, isEmptyObject, isString } from "@tomato-js/shared";
import { getMatechedRoute } from "http-mockjs-util/matchRoute";
import { watch } from "chokidar";
import {
  getConfigPath,
  default as getConfig,
} from "http-mockjs-util/getConfig";
import { sleep } from "http-mockjs-util/delay";
import { Config, Routes } from "http-mockjs-util/declations";
import { Application } from "express";
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
  const tableInfo = [
    ["Matched Url(path-to-regexp style)", "Map local file path"],
  ];
  Object.keys(proxyLists).forEach((key) => {
    const proxyMatch = proxyLists[key];
    const mapLocalPath = path.join(
      process.cwd(),
      config.mockFileName,
      proxyMatch.path
    );
    tableInfo.push([key, mapLocalPath]);
  });
  const result = tableContent(tableInfo);
  console.log(color(`\nThe Request and Map Local by http-mockjs:`).green);
  console.log(`\n${result}\n`);
};

/**
 * Specific proxy operation
 * @param {object} app - app object
 * @param {object} config - user config info
 */
const proxy = (
  app: Application,
  config: Config,
  isMiddleware = false
) => {
  let proxyLists = config.routes;
  let responseHeaders = config.responseHeaders;
  let requestHeaders = config.requestHeaders;

  const vm = new NodeVM();
  //print info
  printProxyInfo(config);

  //watch config file changes
  const configPath: string = getConfigPath();
  const watcher = watch(configPath);
  watcher.on("all", (path) => {
    const config = getConfig(process.cwd());
    proxyLists = config.routes;
    responseHeaders = config.responseHeaders;
    requestHeaders = config.requestHeaders;
    console.log(
      color(" The content of http-mockjs'config file has changed").green
    );
  });
  // normal mode
  if (!isMiddleware) {
    app.use(express.json()); // for parsing application/json
    app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
    //filter configed api and map local
    app.all("/*", async (req, res, next) => {
      const proxyURL: string = `${req.method} ${req.originalUrl}`;
      const proxyMatch = getMatechedRoute(proxyLists, proxyURL);

      //if there is a request config in the config file
      if (proxyMatch && proxyMatch.ignore !== true) {
        const curPath = path.join(
          process.cwd(),
          config.mockFileName,
          proxyMatch.path
        );
        if (proxyMatch.delay && typeof proxyMatch.delay === "number") {
          await sleep(proxyMatch.delay);
        }
        // handle strict validate body
        if (proxyMatch.validate && !isEmptyObject(proxyMatch.validate)) {
          const { body } = req;
          forEach(body, (bodyK, bodyV) => {
            if (
              !(bodyK in proxyMatch.validate) ||
              typeof bodyV !== proxyMatch.validate[bodyK]
            ) {
              res
                .status(400)
                .send("Error:ValidateBody Failed, Please checke body params");
              res.end();
            }
          });
        }
        let responseBody;
        // handle js
        if (/js$/gi.test(curPath)) {
          const jsContent = fs.readFileSync(curPath, "utf-8");
          const vmFun = vm.run(jsContent);
          responseBody = vmFun(req);
          // const jsRule = require(curPath);
          // responseBody = jsRule(req);
        } else {
          // handle json
          responseBody = fs.readFileSync(curPath, "utf-8");
        }
        // transform string to json for mockjs
        // only json file will parse
        responseBody =
          isString(responseBody) && /json$/gi.test(curPath)
            ? JSON.parse(responseBody)
            : responseBody;
        const result = mock.mock(responseBody);
        // set custom response headers
        res.set(responseHeaders);
        res.send(result);
        res.end();
      } else {
        // add custom requestHeaders to matched items.
        const proxyHeaders = Object.assign({}, req.headers, requestHeaders);
        req.headers = proxyHeaders;
        next();
      }
    });
  } else {
    // middleware mode
    return (req: IncomingMessage, res: ServerResponse, next: Function) => {
      const proxyURL: string = `${req.method} ${req.url}`;
      const proxyMatch = getMatechedRoute(proxyLists, proxyURL);

      //if there is a request config in the config file
      if (proxyMatch && proxyMatch.ignore !== true) {
        const curPath = path.join(
          process.cwd(),
          config.mockFileName,
          proxyMatch.path
        );
        // can not async , so sleep can not use
        // can not get body, so validate can not use
        let responseBody;
        // handle js
        if (/js$/gi.test(curPath)) {
          const jsContent = fs.readFileSync(curPath, "utf-8");
          const vmFun = vm.run(jsContent);
          responseBody = vmFun(req);
          // const jsRule = require(curPath);
          // responseBody = jsRule(req);
        } else {
          // handle json
          responseBody = fs.readFileSync(curPath, "utf-8");
        }
        // transform string to json for mockjs
        // only json file will parse
        responseBody =
          isString(responseBody) && /json$/gi.test(curPath)
            ? JSON.parse(responseBody)
            : responseBody;
        const result = mock.mock(responseBody);
        // can not set headers
        res.end(isString(result)?result:JSON.stringify(result));
      } else {
        // add custom requestHeaders to matched items.
        const proxyHeaders = Object.assign({}, req.headers, requestHeaders);
        req.headers = proxyHeaders;
        next();
      }
    };
  }
};

export default proxy;
