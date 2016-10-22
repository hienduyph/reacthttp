// Browser
if (typeof WEB !== "undefined" && WEB) module.exports = require("whatwg-fetch");

// Node
if (typeof WEB === "undefined")  module.exports = require("node-fetch");

// Build webpack
if (typeof WEB !== "undefined" && !WEB) module.exports = require("node-fetch");
