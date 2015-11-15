'use strict';

var webpack = require('webpack'),
  ngAnnotatePlugin = require('ng-annotate-webpack-plugin');

module.exports = {
  entry: './app.js',
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel?presets[]=es2015',
        include: __dirname
      }
    ]
  },
  plugins: [
    new ngAnnotatePlugin({}),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      mangle: false
    })
  ],
  watch: true
};