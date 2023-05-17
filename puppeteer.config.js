const { join } = require("node:path");
const os = require("node:os");
const { Configuration } = require("puppeteer");

/** @type {Configuration} */
module.exports = {
  cacheDirectory: join(os.homedir(), ".cache", "puppeteer")
}
