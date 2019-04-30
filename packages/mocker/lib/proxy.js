"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const httpProxy = require("http-proxy");
exports.default = (req, res, options = {}) => {
    const proxy = httpProxy.createProxyServer({});
    console.log();
    return proxy.web(req, res, options);
};
