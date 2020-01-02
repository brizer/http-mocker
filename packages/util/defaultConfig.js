"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Default config object
 */
const config = {
    $schema: "http://json.schemastore.org/httpmockrc",
    mockFileName: "mocks",
    responseHeaders: {
        "Content-Type": "application/json",
        "X-Proxy-By": "http-mockjs"
    }
};
exports.fileName = ".httpmockrc.json";
exports.default = config;
