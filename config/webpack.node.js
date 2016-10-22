const webpack = require("webpack");
const path = require("path");
const fs = require("fs");
const webpackMerge = require("webpack-merge");
const commonConfig = require("./webpack.common");

let nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    if (mod !== "node-fetch") {
      nodeModules[mod] = 'commonjs ' + mod;
    }
  });

module.exports = webpackMerge(commonConfig, {
  target: "node",
  entry: "./main.js",
  output: {
    path: path.resolve("lib"),
    filename: "main.js"
  },
  externals: nodeModules,
});
