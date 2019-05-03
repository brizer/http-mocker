"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getConfig_1 = require("./getConfig");
const proxy_1 = require("./proxy");
const version_1 = require("http-mockjs-util/version");
const deepmerge = require('deepmerge');
const pkg = require('../package.json');
const requiredVersion = pkg.engines.node;
const out = (app, options) => {
    // judge the node version first
    options = options || {};
    if (!version_1.default.isNodeVersionsupport(requiredVersion)) {
        process.exit(1);
    }
    const config = getConfig_1.default(process.cwd());
    const proxyOptions = deepmerge(config, options);
    proxy_1.default(app, proxyOptions);
};
exports.default = out;
