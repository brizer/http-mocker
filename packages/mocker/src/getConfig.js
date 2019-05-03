"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cosmiconfig = require("cosmiconfig");
const defaultConf = require("./defaultConfig");
const deepmerge = require('deepmerge');
/**
 * Get config object
 * @param {string} dir - path
 * @return {object} finalConfig - config content
 */
const getConfig = (dir) => {
    const explorer = cosmiconfig('httpmock');
    const { config = {} } = explorer.searchSync(dir) || {};
    const finalConfig = deepmerge(defaultConf.default, config);
    return finalConfig;
};
exports.default = getConfig;
