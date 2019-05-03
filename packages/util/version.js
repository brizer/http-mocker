"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const process = require("process");
const semver = require("semver");
const color_1 = require("./color");
/**
 * judge current node verion
 * @param {string} requiredVersion - node version written in package.json engines.node
 * @return {boolean} - isSupport
 */
const isNodeVersionsupport = (requiredVersion) => {
    if (!semver.satisfies(process.version, requiredVersion)) {
        console.error(`${color_1.default('Error ').red} You are using Node ${process.version}, but http-mockjs ` +
            `requires Node ${requiredVersion}.\nPlease upgrade your Node version.`);
        return false;
    }
    return true;
};
exports.default = {
    isNodeVersionsupport
};
