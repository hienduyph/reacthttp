const webpack = require("webpack");
const path = require("path");
const webpackMerge = require("webpack-merge");
const commonConfig = require("./webpack.common");

module.exports = webpackMerge(commonConfig, {
  target: "web",
  entry: "./browser.js",
  output: {
    path: path.resolve("lib"),
    filename: "browser.js"
  }
});
