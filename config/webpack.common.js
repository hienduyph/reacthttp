const webpack = require("webpack");
const path = require("path");

module.exports = {
  devtool: "source-map",
  context: path.resolve("src"),
  module: {
    loaders: [
      {
        test: /\.ts$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'ts'
      },
      {
        test: /\.json$/,
        loader: "json"
      }
    ]
  }
}
