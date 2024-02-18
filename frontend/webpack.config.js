const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");
const webpack = require('webpack');


module.exports = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: "ts-loader",
          options: {
            transpileOnly: true,
          },
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      },
    ],
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".json", ".mjs", ".wasm"],
  },
  plugins: [
    new HTMLPlugin({
      template: path.join(__dirname, "src/index.html"),
    }),
    new webpack.DefinePlugin({
      process: {env: {}}
    })
  ],
  devServer: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: "all",
    hot: "only",

  },
};
