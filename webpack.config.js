const webpack = require("webpack");
const path = require("path");

let outputFle;
if (process.env.WEBPACK_ENV == "prod") {
  outputFle = "react-http.min.js";
} else {
  outputFle = "react-http.js";
}

module.exports = {
  devtool: "source-map",
  context: path.resolve("lib"),
  entry: "./main.js",
  output: {
    path: path.resolve("dist"),
    filename: outputFle
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
