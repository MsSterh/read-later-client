import Reflux from 'reflux';
import NotificationActions from '../actions/NotificationActions';

var DURATION = 5000;

var NotificationStore = Reflux.createStore({
  listenables: NotificationActions,

  init() {
    this._notification = {
      active: false,
      text: '',
      type: ''
    }
  },

  onCreate(type, text) {
    if (arguments.length === 1) {
      text = type;
      type = 'notice';
    }

    this._notification = {
      active: true,
      type: type,
      text: text
    };

    this.trigger(this._notification);

    setTimeout(NotificationActions.destroy, DURATION);
  },

  onDestroy() {
    this._notification.active = false;
    this.trigger(this._notification);
  },

  getNotification() {
    return this._notification;
  }
});

export default NotificationStore;
