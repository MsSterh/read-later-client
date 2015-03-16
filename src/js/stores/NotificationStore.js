var Reflux = require('reflux');
var NotificationActions = require('../actions/NotificationActions');

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
  },

  onDestroy() {
    this.trigger({
      active: false
    });
  }
});

module.exports = NotificationStore;
