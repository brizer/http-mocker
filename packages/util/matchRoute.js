"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_to_regexp_1 = __importDefault(require("path-to-regexp"));
function getMatechedRoute(proxyLists, proxyURL) {
    let proxyMatch = proxyLists[proxyURL];
    //to adapte express router url style such as user/:id and so on:
    Object.keys(proxyLists).forEach((key) => {
        const re = path_to_regexp_1.default(key);
        if (re.exec(proxyURL)) {
            proxyMatch = proxyLists[key];
        }
        else if (proxyURL.includes('?')) {
            // if some url with params have not be defined in routers
            // handle /api/user?otherParam=true to /api/user.
            const key = proxyURL.substr(0, proxyURL.indexOf('?'));
            if (key in proxyLists) {
                proxyMatch = proxyLists[key];
            }
        }
    });
    return proxyMatch;
}
exports.getMatechedRoute = getMatechedRoute;
