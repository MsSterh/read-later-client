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
      { test: /\.css/, loader: "style!css?root=." },
      { test: /\.jpg/, loader: "url?limit=1000&mimetype=image/jpg" },
      { test: /\.png/, loader: "url?limit=1000&mimetype=image/png" },
      { test: /\.txt/, loader: "raw" },
      { test: /config\.js$/, loader: "envify" },
      { test: /\.json$/, loader: 'json' },
      { test: /\.jsx$/, loader: 'babel' },
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel' }
    ]
  }
}
