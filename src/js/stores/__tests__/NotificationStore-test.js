jest.dontMock('../NotificationStore');
jest.dontMock('../../actions/NotificationActions');

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
      NotificationActions.create('warning', 'ho hey');
      jest.runOnlyPendingTimers();

      expect(NotificationStore.getNotification()).toEqual({
        active: true,
        type: 'warning',
        text: 'ho hey'
      });
    });

    it('triggers with new notification state', () => {
      var listener = jest.genMockFunction();

      NotificationStore.listen(listener);

      NotificationActions.create('warning', 'ho hey');
      jest.runOnlyPendingTimers();

      expect(listener.mock.calls[0][0]).toEqual({
        active: true,
        type: 'warning',
        text: 'ho hey'
      });
    });

    it('uses "notice" as notification default type', () => {
      NotificationActions.create('ho hey');
      jest.runOnlyPendingTimers();

      expect(NotificationStore.getNotification()).toEqual({
        active: true,
        type: 'notice',
        text: 'ho hey'
      });
    });

    it('schedules destroy after 3 seconds', () => {
      NotificationActions.create('ho hey');
      jest.runOnlyPendingTimers();

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
      NotificationActions.destroy();
      jest.runOnlyPendingTimers();

      expect(NotificationStore.getNotification().active).toEqual(false);
    });

    it('triggers with new notification state', () => {
      var listener = jest.genMockFunction();

      NotificationStore.listen(listener);
      NotificationActions.destroy();
      jest.runOnlyPendingTimers();

      expect(listener.mock.calls[0][0].active).toEqual(false);
    });
  });
});
