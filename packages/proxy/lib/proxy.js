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
const express = require("express");
const ui_1 = require("@tomato-node/ui");
const vm2_1 = require("vm2");
const color_1 = require("http-mockjs-util/color");
const shared_1 = require("@tomato-js/shared");
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
    const tableInfo = [
        ["Matched Url(path-to-regexp style)", "Map local file path"],
    ];
    Object.keys(proxyLists).forEach((key) => {
        const proxyMatch = proxyLists[key];
        const mapLocalPath = path.join(process.cwd(), config.mockFileName, proxyMatch.path);
        tableInfo.push([key, mapLocalPath]);
    });
    const result = ui_1.tableContent(tableInfo);
    console.log(color_1.default(`\nThe Request and Map Local by http-mockjs:`).green);
    console.log(`\n${result}\n`);
};
/**
 * Specific proxy operation
 * @param {object} app - app object
 * @param {object} config - user config info
 */
const proxy = (app, config, isMiddleware = false) => {
    let proxyLists = config.routes;
    let responseHeaders = config.responseHeaders;
    let requestHeaders = config.requestHeaders;
    let isParseBody = false;
    const vm = new vm2_1.NodeVM();
    //print info
    printProxyInfo(config);
    //watch config file changes
    const configPath = getConfig_1.getConfigPath();
    const watcher = chokidar_1.watch(configPath);
    watcher.on("all", (path) => {
        const config = getConfig_1.default(process.cwd());
        proxyLists = config.routes;
        responseHeaders = config.responseHeaders;
        requestHeaders = config.requestHeaders;
        isParseBody = config.parseBody;
        console.log(color_1.default(" The content of http-mockjs'config file has changed").green);
    });
    // normal mode
    if (!isMiddleware) {
        if (isParseBody) {
            app.use(express.json()); // for parsing application/json
            app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
        }
        //filter configed api and map local
        app.all("/*", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const proxyURL = `${req.method} ${req.originalUrl}`;
            const proxyMatch = matchRoute_1.getMatechedRoute(proxyLists, proxyURL);
            //if there is a request config in the config file
            if (proxyMatch && proxyMatch.ignore !== true) {
                const curPath = path.join(process.cwd(), config.mockFileName, proxyMatch.path);
                if (proxyMatch.delay && typeof proxyMatch.delay === "number") {
                    yield delay_1.sleep(proxyMatch.delay);
                }
                // handle strict validate body
                if (isParseBody && proxyMatch.validate && !shared_1.isEmptyObject(proxyMatch.validate)) {
                    const { body } = req;
                    shared_1.forEach(body, (bodyK, bodyV) => {
                        if (!(bodyK in proxyMatch.validate) ||
                            typeof bodyV !== proxyMatch.validate[bodyK]) {
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
                }
                else {
                    // handle json
                    responseBody = fs.readFileSync(curPath, "utf-8");
                }
                // transform string to json for mockjs
                // only json file will parse
                responseBody =
                    shared_1.isString(responseBody) && /json$/gi.test(curPath)
                        ? JSON.parse(responseBody)
                        : responseBody;
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
    }
    else {
        // middleware mode
        return (req, res, next) => {
            const proxyURL = `${req.method} ${req.url}`;
            const proxyMatch = matchRoute_1.getMatechedRoute(proxyLists, proxyURL);
            //if there is a request config in the config file
            if (proxyMatch && proxyMatch.ignore !== true) {
                const curPath = path.join(process.cwd(), config.mockFileName, proxyMatch.path);
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
                }
                else {
                    // handle json
                    responseBody = fs.readFileSync(curPath, "utf-8");
                }
                // transform string to json for mockjs
                // only json file will parse
                responseBody =
                    shared_1.isString(responseBody) && /json$/gi.test(curPath)
                        ? JSON.parse(responseBody)
                        : responseBody;
                const result = mock.mock(responseBody);
                // can not set headers
                res.end(shared_1.isString(result) ? result : JSON.stringify(result));
            }
            else {
                // add custom requestHeaders to matched items.
                const proxyHeaders = Object.assign({}, req.headers, requestHeaders);
                req.headers = proxyHeaders;
                next();
            }
        };
    }
};
exports.default = proxy;
