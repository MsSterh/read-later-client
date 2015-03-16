var Reflux = require('reflux');
var NotificationActions = require('../actions/NotificationActions');

var DURATION = 3000;

var NotificationStore = Reflux.createStore({
  listenables: NotificationActions,

  onCreate(type, text) {
    if (arguments.length === 1) {
      text = type;
      type = 'notice';
    }

    this.trigger({
      active: true,
      type: type,
      text: text
    });

    setTimeout(NotificationActions.destroy, DURATION);
  },

  onDestroy() {
    this.trigger({
      active: false
    });
  },

  getDefaultState() {
    return {
      active: false,
      text: '',
      type: ''
    }
  }
});

module.exports = NotificationStore;
