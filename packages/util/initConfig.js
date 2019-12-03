"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fs_1 = __importDefault(require("fs"));
const jsonfile_1 = __importDefault(require("jsonfile"));
const color_1 = __importDefault(require("./color"));
const defaultConfig_1 = __importStar(require("./defaultConfig"));
function createConfigFile(content) {
    try {
        fs_1.default.readFileSync(path_1.join(process.cwd(), `./${defaultConfig_1.fileName}`));
        console.log(color_1.default(` config file is already exist`).yellow);
        process.exit(0);
    }
    catch (error) { }
    const filePath = path_1.join(process.cwd(), `./${defaultConfig_1.fileName}`);
    return jsonfile_1.default.writeFile(filePath, defaultConfig_1.default, { spaces: 4 });
}
exports.createConfigFile = createConfigFile;
