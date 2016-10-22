const webpack = require("webpack");
const path = require("path");

let outputFle, plugins = [], outputPath, target;
if (process.env.WEBPACK_ENV == "prod") {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      WEB: true
    }),
    new webpack.NoErrorsPlugin()
  );
  outputPath = path.resolve("dist");
  outputFle = "react-http.min.js";
  target = "web";

} else {
  outputPath = path.resolve("lib");
  outputFle = "react-http.js";
  plugins.push(
    new webpack.DefinePlugin({
      WEB: false
    })
  )
}

module.exports = {
  target: target,
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
      },
      {
        test: /\.json$/,
        loader: "json"
      }
    ]
  },
  plugins: plugins
}
