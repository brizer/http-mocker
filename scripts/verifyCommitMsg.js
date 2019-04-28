"use strict";
// const color = require('../packages/util/lib/color');
// const msgPath = process.env.HUSKY_GIT_PARAMS
// const msg = require('fs').readFileSync(msgPath, 'utf-8').trim()
exports.__esModule = true;
var fs = require("fs");
var color_1 = require("../packages/util/lib/color");
var msgPath = process.env.HUSKY_GIT_PARAMS;
var msg = fs.readFileSync(msgPath, 'utf-8').trim();
console.log('123');
console.log(msg);
var commitRE = /^(v\d+\.\d+\.\d+(-(alpha|beta|rc.\d+))?$)|((revert: )?(feat|fix|docs|style|refactor|perf|test|workflow|ci|chore|types|build)(\(.+\))?: .{1,50})/;
if (!commitRE.test(msg)) {
    console.log();
    console.error("  " + color_1["default"](' ERROR ').bgRed + " " + color_1["default"]("invalid commit message format.").red + "\n\n" +
        color_1["default"]("  Proper commit message format is required for automated changelog generation. Examples:\n\n").red +
        ("    " + color_1["default"]("feat(compiler): add 'comments' option").green + "\n") +
        ("    " + color_1["default"]("fix(v-model): handle events on blur (close #28)").green + "\n\n") +
        color_1["default"]("  See .github/COMMIT_CONVENTION.md for more details.\n").red +
        color_1["default"]("  You can also use " + color_1["default"]("npm run commit").cyan + " to interactively generate a commit message.\n").red);
    process.exit(1);
}
