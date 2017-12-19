const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const extractLESS = new ExtractTextPlugin('[name].css');
const pkg = require('./package.json');

module.exports = {
  entry: './src/index.js',
  devtool: 'source-map',
  module: {
    rules: [{
      test: /\.js$/,
      use: 'babel-loader',
      exclude: /(node_modules)/,
    }, {
      test: /\.jst$/,
      use: {
        loader: 'underscore-template-loader'
      }
    }, {
      test: /\.(png|jpg|gif|ico)$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 10000, // Convert images < 10kb to base64 strings
          name: 'img/[name].[ext]'
        }
      }]
    }, {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      use: {
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml',
        options: {
          limit: 10000, // Convert images < 10kb to base64 strings
          mimetype: 'image/svg+xml'
        }
      }
    }, {
      test: /\.less$/,
      use: extractLESS.extract([ 'css-loader', 'less-loader' ])
    }]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    library: pkg.name,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  externals: [],
  plugins: [
    new UglifyJsPlugin({ minimize: true }),
    extractLESS
  ]
};
