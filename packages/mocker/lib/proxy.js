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
const http = require("http");
const path = require("path");
const fs = require("fs");
const httpProxy = require("http-proxy");
const mock = require("mockjs");
const color_1 = require("http-mockjs-util/color");
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
    const serveProxy = httpProxy.createProxyServer({});
    const proxyLists = config.routes;
    let port = 8009;
    // try {
    //     //get an idle port
    //     port = await portfinder.getPortPromise()
    // } catch (error) {
    //     console.log(color(`${error}`).red)
    // }
    //print info
    printProxyInfo(config);
    //create a proxy server
    http.createServer((req, res) => {
        serveProxy.web(req, res, {
            target: `http://localhost:${config.port}`
        });
    }).listen(port);
    //filter configed api and map local
    app.all('/*', (req, res, next) => {
        const proxyURL = `${req.method} ${req.path}`;
        const proxyMatch = proxyLists[proxyURL];
        //if there is a request config in the config file
        if (proxyMatch) {
            const curPath = path.join(process.cwd(), config.mockFileName, proxyMatch.path);
            const responseBody = fs.readFileSync(curPath, 'utf-8');
            const result = mock.mock(responseBody);
            res.send(result);
            res.end();
        }
        else {
            next();
        }
    });
});
exports.default = proxy;
