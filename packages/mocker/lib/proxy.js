"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs");
const mock = require("mockjs");
const color_1 = require("http-mockjs-util/color");
const matchRoute_1 = require("http-mockjs-util/matchRoute");
const chokidar_1 = require("chokidar");
const getConfig_1 = require("./getConfig");
/**
 * Print proxy init info
 * @param {object} config - config info
 */
const printProxyInfo = (config) => {
    const proxyLists = config.routes;
    //init proxy output:
    if (!proxyLists) {
        console.log(color_1.default(`Please set some matching rules to routes`).red);
    }
    Object.keys(proxyLists).forEach(key => {
        const proxyMatch = proxyLists[key];
        const mapLocalPath = path.join(process.cwd(), config.mockFileName, proxyMatch.path);
        console.log(`${color_1.default(key).green} ${color_1.default('has been map local to').black} ${color_1.default(mapLocalPath).yellow}`);
    });
};
/**
 * Specific proxy operation
 * @param {object} app - app object
 * @param {object} config - user config info
 */
const proxy = (app, config) => __awaiter(this, void 0, void 0, function* () {
    let proxyLists = config.routes;
    //print info
    printProxyInfo(config);
    //watch config file changes
    const configPath = getConfig_1.getConfigPath();
    const watcher = chokidar_1.watch(configPath);
    watcher.on('all', path => {
        const config = getConfig_1.default(process.cwd());
        proxyLists = config.routes;
        console.log(color_1.default('config file content has changed').green);
    });
    // app.use(function (req, res, next) {
    //     res.set('Content-type','application/json');
    //     next();
    //   });
    //filter configed api and map local
    app.all('/*', (req, res, next) => {
        const proxyURL = `${req.method} ${req.originalUrl}`;
        const proxyMatch = matchRoute_1.getMatechedRoute(proxyLists, proxyURL);
        // let proxyMatch:Routes = proxyLists[proxyURL];
        // //to adapte express router url style such as user/:id and so on:
        // Object.keys(proxyLists).forEach((key)=>{
        //     const re = pathToRegexp(key)
        //     if(re.exec(proxyURL)){
        //         proxyMatch = proxyLists[key]
        //     } else if(proxyURL.includes('?')) {
        //         // if some url with params have not be defined in routers
        //         // handle /api/user?otherParam=true to /api/user.
        //         const key = proxyURL.substr(0,proxyURL.indexOf('?'));
        //         if(key in proxyLists){
        //             proxyMatch = proxyLists[key];
        //         }
        //     }
        // })
        //if there is a request config in the config file
        if (proxyMatch && proxyMatch.ignore !== true) {
            const curPath = path.join(process.cwd(), config.mockFileName, proxyMatch.path);
            const responseBody = fs.readFileSync(curPath, 'utf-8');
            const result = mock.mock(responseBody);
            res.set(config.responseHeaders);
            res.send(result);
            res.end();
        }
        else {
            next();
        }
    });
});
exports.default = proxy;
