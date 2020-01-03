"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function sleep(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}
exports.sleep = sleep;
