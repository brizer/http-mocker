"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const http = require("http");
const semver = require("semver");
const color_1 = require("http-mockjs-util/color");
const getConfig_1 = require("./getConfig");
const httpProxy = require("http-proxy");
const pkg = require('../package.json');
const requiredVersion = pkg.engines.node;
const out = (app) => {
    // judge the node version first
    if (!semver.satisfies(process.version, requiredVersion)) {
        console.error(`${color_1.default('Error ').red} You are using Node ${process.version}, but http-mockjs ` +
            `requires Node ${requiredVersion}.\nPlease upgrade your Node version.`);
        process.exit(1);
    }
    const config = getConfig_1.default(process.cwd());
    const serveProxy = httpProxy.createProxyServer({});
    http.createServer((req, res) => {
        serveProxy.web(req, res, {
            target: 'http://localhost:8080'
        });
    }).listen(8009);
    app.all('/*', (req, res, next) => {
        const proxyURL = `${req.method} ${req.path}`;
        const proxyLists = config.routes;
        console.log(process.cwd());
        console.log(proxyURL);
        console.log(proxyLists);
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
};
exports.default = out;
