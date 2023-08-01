const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    // libraryTarget: "umd",
  },
  resolve: {
    // mainFields: ["exports"],
  },
  module: {
    rules: [
      {
        test: require.resolve("aaa"), //判断如果代码中引入了jquery
        loader: "expose-loader", //就使用expose-loader 将jQuery输出成$并绑定在window上
        options: {
          exposes: ["AAA"],
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "index.html",
      inject: true,
    }),

    // new webpack.ProvidePlugin({
    //   //将jquery在每个模块都注入成 $
    //   AAA: "aaa",
    // }),
  ],
  devServer: {
    compress: true,
    port: 9000,
    hot: true,
    open: true,
  },
};
