var Reflux = require('reflux');
var FilterActions = require('../actions/FilterActions');

var FilterStore = Reflux.createStore({
  listenables: FilterActions,

  init() {
    this._filters = {
      unreadOnly: true,
      search: ''
    }
  },

  onSearch(text) {
    this._filters.search = text;
    this.trigger(this._filters);
  },

  onSwitchDisplayFilter(unreadOnly) {
    this._filters.unreadOnly = !this._filters.unreadOnly;
    this.trigger(this._filters);
  },

  getDefaultState() {
    return this._filters;
  }
});

module.exports = FilterStore;
