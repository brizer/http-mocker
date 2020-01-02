"use strict";

const fs = require("fs");
const path = require("path");

let testConf = {
  httpmock: {
    mockFileName: "customFile"
  }
};
const getConfig = require("../getConfig").default;
describe("getConfig", () => {
  test.only("with no config, should return default", () => {
    const config = getConfig(path.join(__dirname, "../../"));
    console.warn(config);
    expect(config).toEqual({
      $schema: "http://json.schemastore.org/httpmockrc",
      mockFileName: "mocks",
      responseHeaders: {
        "Content-Type": "application/json",
        "X-Proxy-By": "http-mockjs"
      }
    });
  });

  test("with config in package.json, should return the result", () => {
    const dir = __dirname;
    fs.writeFileSync(path.join(dir, "package.json"), JSON.stringify(testConf));
    const config = getConfig(dir);

    expect(config.mockFileName).toEqual(testConf.httpmock.mockFileName);
  });

  test("with config in .httpmockrc, should return the result", () => {
    const config = getConfig(path.join(__dirname, "../"));
    expect(config.mockFileName).toEqual("mymocks");
  });
});
