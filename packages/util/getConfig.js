"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cosmiconfig_1 = __importDefault(require("cosmiconfig"));
const jsonfile_1 = __importDefault(require("jsonfile"));
const defaultConfig_1 = __importDefault(require("./defaultConfig"));
const deepmerge = require('deepmerge');
let configPath = '';
/**
 * Get config object
 * @param {string} dir - path
 * @return {object} finalConfig - config content
 */
const getConfig = (dir) => {
    const explorer = cosmiconfig_1.default('httpmock');
    const { config = {}, filepath = '' } = explorer.searchSync(dir) || {};
    configPath = filepath;
    const finalConfig = deepmerge(defaultConfig_1.default, config);
    return finalConfig;
};
exports.getConfigPath = () => {
    return configPath;
};
/**
 * set config info into config file
 * @param {object} configInfo configInfo
 */
exports.setConfig = (configInfo) => {
    const dir = exports.getConfigPath();
    return jsonfile_1.default.writeFile(dir, configInfo, { spaces: 4 });
};
exports.default = getConfig;
