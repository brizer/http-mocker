"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getConfig_1 = __importDefault(require("http-mockjs-util/getConfig"));
const proxy_1 = __importDefault(require("http-mockjs-proxy/lib/proxy"));
const deepmerge = require("deepmerge");
const out = (app, options = {}, isMiddleware) => {
    const config = getConfig_1.default(process.cwd());
    const proxyOptions = deepmerge(config, options);
    if (isMiddleware) {
        return proxy_1.default(app, proxyOptions, isMiddleware);
    }
    proxy_1.default(app, proxyOptions, isMiddleware);
};
exports.mocker = out;
exports.mockerMiddleware = () => out(undefined, {}, true);
