#!/usr/bin/env node
import commander, { CommanderStatic } from "commander";
import version from "http-mockjs-util/version";
import { CommandLoader } from "../commands";

const bootstrap = () => {
  const program: CommanderStatic = commander;
  const pkg: any = require("../package.json");

  const requiredVersion: string = pkg.engines.node;
  if (!version.isNodeVersionsupport(requiredVersion)) {
    process.exit(1);
  }

  program.version(pkg.version).usage("<command> [options]");
  CommandLoader.load(program);
  commander.parse(process.argv);
  // default show help
  if (!program.args.length) {
    program.outputHelp();
  }
};

bootstrap();
