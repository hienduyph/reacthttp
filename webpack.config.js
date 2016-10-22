const webpack = require("webpack");
const path = require("path");

module.exports = {
  target: "web",
  context: path.resolve("lib"),
  entry: "./main.js",
  output: {
    path: path.resolve("dist"),
    filename: "react-http.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel' // 'babel-loader' is also a valid name to reference
      }
    ]
  }
}