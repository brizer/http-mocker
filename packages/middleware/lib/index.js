"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_mockjs_1 = require("http-mockjs");
const middle = (options = {}) => {
    return (req, res, next) => {
        http_mockjs_1.default(req.app, options);
    };
};
exports.default = middle;
