const webpack = require("webpack");
const path = require("path");
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

let outputFle, plugins = [], outputPath;
if (process.env.WEBPACK_ENV == "prod") {
  plugins.push(new UglifyJsPlugin({ minimize: true }));
  outputPath = path.resolve("dist");
  outputFle = "react-http.min.js";
} else {
  outputPath = path.resolve("lib");
  outputFle = "react-http.js";
}

module.exports = {
  devtool: "source-map",
  context: path.resolve("src"),
  entry: "./index.js",
  output: {
    path: outputPath,
    filename: outputFle,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel' // 'babel-loader' is also a valid name to reference
      }
    ]
  },
  plugins: plugins
}
