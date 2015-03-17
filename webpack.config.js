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
      { test: /\.css/, loader: "style!css" },
      { test: /config\.js$/, loader: "envify" },
      { test: /\.json$/, loader: 'json' },
      { test: /\.jsx$/, loader: 'babel' },
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel' }
    ]
  }
}
