import AbstractEvent from 'shared/AbstractEvent';

import Emitter from '../Emitter';

class TestEvent extends AbstractEvent {}

describe('Emitter', () => {
  let emitter;

  beforeEach(() => {
    emitter = new Emitter();
  });

  describe('#on', () => {
    it('registers a callback by event type', () => {
      const callback = jest.fn();

      emitter.on('event', callback);

      expect(emitter.callbacks.event).toContain(callback);
    });

    it('registers multiple callbacks by event type', () => {
      const callbacks = [jest.fn(), jest.fn()];

      emitter.on('event', ...callbacks);

      expect(emitter.callbacks.event[0]).toStrictEqual(callbacks[0]);
      expect(emitter.callbacks.event[1]).toStrictEqual(callbacks[1]);
    });
  });

  describe('#off', () => {
    it('removes a callback by event type', () => {
      const callbacks = [jest.fn(), jest.fn()];

      emitter.on('event', callbacks[0]);
      emitter.on('event2', callbacks[1]);

      expect(emitter.callbacks.event).toContain(callbacks[0]);
      expect(emitter.callbacks.event2).toContain(callbacks[1]);

      emitter.off('event', callbacks[0]);

      expect(emitter.callbacks.event).not.toContain(callbacks[0]);
      expect(emitter.callbacks.event2).toContain(callbacks[1]);
    });

    it('removes multiple callbacks of event type', () => {
      const callback = jest.fn();

      emitter.on('event', callback, callback);

      expect(emitter.callbacks.event).toContain(callback);

      emitter.off('event', callback);

      expect(emitter.callbacks.event).not.toContain(callback);
    });
  });

  describe('#trigger', () => {
    it('triggers callbacks on event with test event', () => {
      const testEvent = new TestEvent({});
      const callback = jest.fn();

      emitter.on('event', callback);
      emitter.trigger(testEvent);

      expect(callback).toHaveBeenCalled();
      expect(callback).toHaveBeenCalledWith(testEvent);
    });

    it('catches errors from listeners and re-throws at the end of the trigger phase', () => {
      const consoleErrorSpy = jest.fn();

      const testEvent = new TestEvent({});
      const error = new Error('Error');
      const callbacks = [
        jest.fn(),
        () => {
          throw error;
        },
        jest.fn(),
      ];

      /* eslint-disable no-console */
      console.error = consoleErrorSpy;
      /* eslint-enable no-console */

      emitter.on('event', ...callbacks);

      emitter.trigger(testEvent);

      expect(consoleErrorSpy).toHaveBeenCalled();
      expect(consoleErrorSpy).toHaveBeenCalledWith("Draggable caught errors while triggering 'event'", [error]);

      expect(callbacks[0]).toHaveBeenCalled();
      expect(callbacks[2]).toHaveBeenCalled();
    });
  });
});
