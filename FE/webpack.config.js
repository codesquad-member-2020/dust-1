const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: ["@babel/polyfill", "./src/js/main.js", "./src/scss/main.scss"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, "src/js")],
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-class-properties"],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [new MiniCssExtractPlugin({ filename: "css/style.css" }), new HtmlWebpackPlugin({ template: "./src/index.html" })],
  devServer: {
    host: "127.0.0.1",
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    hot: true,
    inline: true,
    port: 9000,
    open: true,
  },
};
