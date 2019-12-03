import getConfig from "http-mockjs-util/getConfig";
import proxy from "http-mockjs-proxy/lib/proxy";
import { Options } from "http-mockjs-util/declations";
import { Application } from "express";

const deepmerge = require("deepmerge");

const out = (app:Application, options: Options | unknown = {}) => {

  const config = getConfig(process.cwd());
  const proxyOptions = deepmerge(config, options);

  proxy(app, proxyOptions);
};

export const mocker = out;
