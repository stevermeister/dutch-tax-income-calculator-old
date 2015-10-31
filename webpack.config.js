'use strict';
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
  }
};