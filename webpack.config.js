'use strict';
var webpack = require('webpack'),
  path = require('path');

require('baggage-loader')

module.exports = {
  context: __dirname,
  entry: {
    app: ['./app.js']
  },
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel', include: __dirname }
    ]
  }
};