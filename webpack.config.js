var webpack = require('webpack'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  path = require('path');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: './app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'ng-annotate!babel?presets[]=es2015'
      },
      {test: /\.css$/, loader: 'style-loader!css-loader?minimize'},
      {
        test: /\.html$/,
        loader: 'ng-cache?prefix=[dir]/[dir]',
        exclude: /index\.html/
      }
    ]
  },
  watchOptions: {
    aggregateTimeout: 100
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      mangle: false
    }),
    new HtmlWebpackPlugin({
      template: 'index.html',
      inject: 'body',
      favicon: 'favicon.png'
    }),
  ],
  devtool: "source-map",
  devServer: {
    inline: true,
  }
};