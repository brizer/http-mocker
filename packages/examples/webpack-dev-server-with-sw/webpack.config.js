const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { mocker } = require('../../mocker/lib/index')

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
    publicPath: '/public/',
    before:(app)=>{
      mocker(app)
    }
    // proxy: {
    //   '*': 'http://localhost:8000'
    // }
  }
};