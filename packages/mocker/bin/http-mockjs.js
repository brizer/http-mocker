#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = __importDefault(require("commander"));
const version_1 = __importDefault(require("http-mockjs-util/version"));
const commands_1 = require("../commands");
const bootstrap = () => {
    const program = commander_1.default;
    const pkg = require("../package.json");
    const requiredVersion = pkg.engines.node;
    if (!version_1.default.isNodeVersionsupport(requiredVersion)) {
        process.exit(1);
    }
    program.version(pkg.version).usage("<command> [options]");
    commands_1.CommandLoader.load(program);
    commander_1.default.parse(process.argv);
    // default show help
    if (!program.args.length) {
        program.outputHelp();
    }
};
bootstrap();
