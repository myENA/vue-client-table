const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const pkg = require('./package.json');
const merge = require('webpack-merge');

var config = {
  mode: 'production',
  output: {
    path: path.resolve(__dirname + '/dist/'),
  },
  module: {
    rules: [{
      test: /\.vue$/,
      use: 'vue-loader'
    }, {
      test: /\.js$/,
      use: 'babel-loader',
      exclude: /(node_modules)/,
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
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
    }]
  },
  externals: [],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          safe: true // without this it changes z-index-es
        }
      })
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ]
};

module.exports = [
  merge(config, {
    entry: path.resolve(__dirname + '/src/index.js'),
    output: {
      filename: 'vue-client-table.min.js',
      libraryTarget: 'window',
      library: 'VueClientTable',
    }
  }),
  merge(config, {
    entry: path.resolve(__dirname + '/src/client-table.vue'),
    output: {
      filename: 'vue-client-table.js',
      libraryTarget: 'umd',
      library: 'vue-client-table',
      umdNamedDefine: true
    }
  })
];