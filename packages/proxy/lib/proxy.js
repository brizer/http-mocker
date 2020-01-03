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
const getConfig_1 = require("http-mockjs-util/getConfig");
const delay_1 = require("http-mockjs-util/delay");
/**
 * Print proxy init info
 * @param {object} config - config info
 */
const printProxyInfo = (config) => {
    const proxyLists = config.routes;
    //init proxy output:
    if (!proxyLists) {
        console.log(color_1.default(` Please set some matching rules to routes`).red);
        process.exit(0);
    }
    Object.keys(proxyLists).forEach(key => {
        const proxyMatch = proxyLists[key];
        const mapLocalPath = path.join(process.cwd(), config.mockFileName, proxyMatch.path);
        console.log(`${color_1.default(key).green} ${color_1.default("has been map local to").red} ${color_1.default(mapLocalPath).yellow}`);
    });
};
/**
 * Specific proxy operation
 * @param {object} app - app object
 * @param {object} config - user config info
 */
const proxy = (app, config) => __awaiter(this, void 0, void 0, function* () {
    let proxyLists = config.routes;
    let responseHeaders = config.responseHeaders;
    let requestHeaders = config.requestHeaders;
    //print info
    printProxyInfo(config);
    //watch config file changes
    const configPath = getConfig_1.getConfigPath();
    const watcher = chokidar_1.watch(configPath);
    watcher.on("all", path => {
        const config = getConfig_1.default(process.cwd());
        proxyLists = config.routes;
        responseHeaders = config.responseHeaders;
        requestHeaders = config.requestHeaders;
        console.log(color_1.default(" The content of http-mockjs'config file has changed").green);
    });
    //filter configed api and map local
    app.all("/*", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        const proxyURL = `${req.method} ${req.originalUrl}`;
        const proxyMatch = matchRoute_1.getMatechedRoute(proxyLists, proxyURL);
        //if there is a request config in the config file
        if (proxyMatch && proxyMatch.ignore !== true) {
            const curPath = path.join(process.cwd(), config.mockFileName, proxyMatch.path);
            if (proxyMatch.delay && typeof proxyMatch.delay === 'number') {
                yield delay_1.sleep(proxyMatch.delay);
            }
            const responseBody = fs.readFileSync(curPath, "utf-8");
            const result = mock.mock(responseBody);
            // set custom response headers
            res.set(responseHeaders);
            res.send(result);
            res.end();
        }
        else {
            // add custom requestHeaders to matched items.
            const proxyHeaders = Object.assign({}, req.headers, requestHeaders);
            req.headers = proxyHeaders;
            next();
        }
    }));
});
exports.default = proxy;
