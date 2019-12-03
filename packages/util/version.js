"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const process = __importStar(require("process"));
const semver = __importStar(require("semver"));
const color_1 = __importDefault(require("./color"));
/**
 * judge current node verion
 * @param {string} requiredVersion - node version written in package.json engines.node
 * @return {boolean} - isSupport
 */
const isNodeVersionsupport = (requiredVersion, packageName = 'http-mockjs') => {
    if (!semver.satisfies(process.version, requiredVersion)) {
        console.error(`${color_1.default('Error ').red} You are using Node ${process.version}, but ${packageName} ` +
            `requires Node ${requiredVersion}.\nPlease upgrade your Node version.`);
        return false;
    }
    return true;
};
exports.default = {
    isNodeVersionsupport
};
