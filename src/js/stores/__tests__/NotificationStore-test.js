jest.dontMock('./helpers');
jest.dontMock('../NotificationStore');
jest.dontMock('../../actions/NotificationActions');

import { invokeSync } from './helpers';
import NotificationStore from '../NotificationStore';
import NotificationActions from '../../actions/NotificationActions';

describe('NotificationStore', () => {
  it('is initialized with empty notification values', () => {
    expect(NotificationStore.getNotification()).toEqual({
      active: false,
      text: '',
      type: ''
    });
  });

  describe('create', () => {
    it('changes notification state', () => {
      invokeSync(() => NotificationActions.create('warning', 'ho hey'));

      expect(NotificationStore.getNotification()).toEqual({
        active: true,
        type: 'warning',
        text: 'ho hey'
      });
    });

    it('triggers with new notification state', () => {
      var listener = jest.genMockFunction();

      NotificationStore.listen(listener);
      invokeSync(() => NotificationActions.create('warning', 'ho hey'));

      expect(listener.mock.calls[0][0]).toEqual({
        active: true,
        type: 'warning',
        text: 'ho hey'
      });
    });

    it('uses "notice" as notification default type', () => {
      invokeSync(() => NotificationActions.create('ho hey'));

      expect(NotificationStore.getNotification()).toEqual({
        active: true,
        type: 'notice',
        text: 'ho hey'
      });
    });

    it('schedules destroy after 3 seconds', () => {
      invokeSync(() => NotificationActions.create('ho hey'));
      expect(setTimeout).toBeCalledWith(NotificationActions.destroy, 3000);
    });
  });

  describe('destroy', () => {
    beforeEach(() => {
      NotificationStore._notification = {
        active: true,
        type: 'notice',
        text: 'ho hey'
      }
    });

    it('changes notification state', () => {
      invokeSync(() => NotificationActions.destroy());
      expect(NotificationStore.getNotification().active).toEqual(false);
    });

    it('triggers with new notification state', () => {
      var listener = jest.genMockFunction();

      NotificationStore.listen(listener);
      invokeSync(() => NotificationActions.destroy());

      expect(listener.mock.calls[0][0].active).toEqual(false);
    });
  });
});
