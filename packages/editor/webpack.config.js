const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require("webpack");
const path = require("path");

module.exports = env => ({
  entry: "./ui/index.tsx",
  mode: process.env.NODE_ENV,
  output: {
    path: path.resolve(__dirname, "./dist/ui"),
    filename: "ui.bundle.js"
  },
  resolve: {
    extensions: [ ".tsx",".ts", ".js", ".jsx"]
  },
  devServer: {
    contentBase: path.resolve(__dirname, "../dist/ui"),
    hot: true,
    port: 9000,
    proxy: {
      '/api': {
        target:'http://localhost:4000',
        changeOrigin:true,
        secure:false
      }
    }
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /(node_modules)/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //     template: path.resolve('./ui/index.html')
    // }),
    new CopyPlugin([
      {from:'ui/locales',to:'locales'}
    ]),
    new webpack.HotModuleReplacementPlugin()
  ]
});
