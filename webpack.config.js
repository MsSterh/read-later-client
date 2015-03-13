var webpack = require('webpack');

module.exports = {
  entry: __dirname + "/src/js/main",
  devtool: 'source-map',
  output: {
    path: __dirname + "/public",
    filename: "main.js",
    publicPath: "./public/",
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}
    ]
  }//,
  //plugins: [
    //new webpack.optimize.UglifyJsPlugin({minimize: true})
  //]
}
