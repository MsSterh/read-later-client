var Reflux = require('reflux');

module.exports = Reflux.createActions([
  'receiveArticles',
  'removeArticle',
  'addArticle',
  'changeReadState',
  'filterChange'
]);
