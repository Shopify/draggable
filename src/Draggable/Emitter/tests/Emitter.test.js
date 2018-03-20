import AbstractEvent from 'shared/AbstractEvent';
import Emitter from '../Emitter';

class TestEvent extends AbstractEvent {}

describe('Emitter', () => {
  let emitter;

  beforeEach(() => {
    emitter = new Emitter();
  });

  describe('#on', () => {
    test('registers a callback by event type', () => {
      const callback = jest.fn();

      emitter.on('event', callback);

      expect(emitter.callbacks.event).toContain(callback);
    });

    test('registers multiple callbacks by event type', () => {
      const callbacks = [jest.fn(), jest.fn()];

      emitter.on('event', ...callbacks);

      expect(emitter.callbacks.event[0]).toEqual(callbacks[0]);
      expect(emitter.callbacks.event[1]).toEqual(callbacks[1]);
    });
  });

  describe('#off', () => {
    test('removes a callback by event type', () => {
      const callback = jest.fn();

      emitter.on('event', callback);

      expect(emitter.callbacks.event).toContain(callback);

      emitter.off('event', callback);

      expect(emitter.callbacks.event).not.toContain(callback);
    });
  });

  describe('#trigger', () => {
    test('triggers callbacks on event with test event', () => {
      const testEvent = new TestEvent({});
      const callback = jest.fn();

      emitter.on('event', callback);
      emitter.trigger(testEvent);

      expect(callback).toHaveBeenCalled();
      expect(callback).toHaveBeenCalledWith(testEvent);
    });

    test('catches errors from listeners and re-throws at the end of the trigger phase', () => {
      const testEvent = new TestEvent({});
      const callbacks = [
        jest.fn(),
        () => { throw new Error('Error'); },
        jest.fn(),
      ];

      emitter.on('event', ...callbacks);

      expect(() => {
        emitter.trigger(testEvent);
      }).toThrow(Error);

      expect(callbacks[0]).toHaveBeenCalled();
      expect(callbacks[2]).toHaveBeenCalled();
    });
  });
});
