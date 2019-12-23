"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Default config object
 */
const config = {
    mockFileName: "mocks",
    responseHeaders: {
        "Content-Type": "application/json",
        "X-Proxy-By": "http-mockjs"
    }
};
exports.fileName = ".httpmockrc";
exports.default = config;
