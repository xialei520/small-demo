const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "sub-main.js",
    path: path.resolve(__dirname, "dist"),
    // libraryTarget: "umd",
  },
  resolve: {
    // mainFields: ["exports"],
  },
  externals: {
    aaa: "AAA",
  },
  plugins: [],
  devServer: {
    compress: true,
    port: 9000,
    hot: true,
    open: true,
  },
};
