import Reflux from 'reflux';
import FilterActions from '../actions/FilterActions';

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

  onSwitchDisplayFilter() {
    this._filters.unreadOnly = !this._filters.unreadOnly;
    this.trigger(this._filters);
  },

  getFilters() {
    return this._filters;
  }
});

export default FilterStore;
