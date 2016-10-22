const webpack = require("webpack");
const path = require("path");
const webpackMerge = require("webpack-merge");
const commonConfig = require("./webpack.common");

module.exports = webpackMerge(commonConfig, {
  target: "web",
  entry: "./browser.js",
  output: {
    path: path.resolve("dist"),
    filename: "react-http.min.js"
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        ENV: JSON.stringify("production")
      }
    }),
    new webpack.NoErrorsPlugin()
  );
  ]
});
