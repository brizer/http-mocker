"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cosmiconfig = require("cosmiconfig");
const jsonfile = require("jsonfile");
const defaultConf = require("./defaultConfig");
const deepmerge = require('deepmerge');
let configPath = '';
/**
 * Get config object
 * @param {string} dir - path
 * @return {object} finalConfig - config content
 */
const getConfig = (dir) => {
    const explorer = cosmiconfig('httpmock');
    const { config = {}, filepath = '' } = explorer.searchSync(dir) || {};
    configPath = filepath;
    const finalConfig = deepmerge(defaultConf.default, config);
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
    return jsonfile.writeFile(dir, configInfo, { spaces: 4 });
};
exports.default = getConfig;
