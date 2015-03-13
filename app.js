var path = require('path');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var compression = require('compression');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());

app.use(function (req, res, next) {
  if (path.extname(req.path).length > 0) {
    next();
  } else {
    req.url = '/index.html';
    next();
  }
});

app.use(express.static(__dirname));

module.exports = app;
