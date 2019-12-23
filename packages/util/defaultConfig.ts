import { Config } from "./declations";

/**
 * Default config object
 */
const config: Config = {
  mockFileName: "mocks",
  responseHeaders: {
    "Content-Type": "application/json",
    "X-Proxy-By": "http-mockjs"
  }
};

export const fileName = ".httpmockrc";
export default config;
