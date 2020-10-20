import getConfig from "http-mockjs-util/getConfig";
import proxy from "http-mockjs-proxy/lib/proxy";
import { Options } from "http-mockjs-util/declations";
import { Application } from "express";

const deepmerge = require("deepmerge");

const out = (app:Application, options: Options | unknown = {}, isMiddleware?:boolean) => {

  const config = getConfig(process.cwd());
  const proxyOptions = deepmerge(config, options);
  if(isMiddleware){
    return proxy(app, proxyOptions, isMiddleware);
  }
  proxy(app, proxyOptions, isMiddleware);
};

export const mocker = out;
export const mockerMiddleware = ()=>out(undefined,{},true);