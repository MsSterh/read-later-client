var Reflux = require('reflux');
var FilterActions = require('../actions/FilterActions');

var FilterStore = Reflux.createStore({
  listenables: FilterActions,

  init() {
    this._filters = {
      showAll: false,
      search: ''
    }
  },

  onSearch(text) {
    this._filters.search = text;
    this.trigger(this._filters);
  },

  switchDisplayFilter(showAll) {
    this._filters.showAll = !this._filters.showAll;
    this.trigger(this.filters);
  },

  getDefaultState() {
    return this._filters;
  }
});

module.exports = FilterStore;
