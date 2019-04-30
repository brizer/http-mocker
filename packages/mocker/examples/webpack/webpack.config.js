const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const mocker = require('http-mockjs').default

module.exports = {
  mode: 'development',
  entry: {
    app: './src/index.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve('./public/index.html'),
      title: 'development'
    })
  ],
  devServer:{
    port:'8002',
    before:(app)=>{
      mocker(app)
    }
  }
};