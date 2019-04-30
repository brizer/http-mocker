"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const semver = require("semver");
const color_1 = require("http-mockjs-util/color");
const getConfig_1 = require("./getConfig");
const proxy_1 = require("./proxy");
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
    proxy_1.default(app, config);
};
exports.default = out;
