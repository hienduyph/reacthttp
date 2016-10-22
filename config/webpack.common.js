const webpack = require("webpack");
const path = require("path");

module.exports = {
  devtool: "source-map",
  context: path.resolve("src"),
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
  }
}
