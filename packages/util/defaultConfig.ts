import { Config } from "./declations";

/**
 * Default config object
 */
const config: Config = {
  $schema: "http://json.schemastore.org/httpmockrc",
  mockFileName: "mocks",
  responseHeaders: {
    "Content-Type": "application/json",
    "X-Proxy-By": "http-mockjs"
  },
  routes: {}
};

export const fileName = ".httpmockrc.json";
export default config;
