var path = require('path');

module.exports = {
  devtool: 'source-map',
  resolve: {
    root: __dirname + '/source'
  },
  entry: [
    './source/__mySource/index'
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'index.js',
    publicPath: '/static/'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      //include: path.join(__dirname, 'source'),
      query: {
        presets: ['es2015', 'stage-2', 'react']
      }
    },
      { test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
        loader: "file" }
    ]
  }
};
