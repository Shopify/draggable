import AbstractEvent from 'shared/AbstractEvent';

type CallbackFunction = (event: AbstractEvent<unknown>) => void;

interface Callback {
  [key: string]: CallbackFunction[];
}

/**
 * The Emitter is a simple emitter class that provides you with `on()`, `off()` and `trigger()` methods
 * @class Emitter
 * @module Emitter
 */
export default class Emitter {
  public callbacks: Callback = {};

  /**
   * Registers callbacks by event name
   * @param {String} type
   * @param {...Function} callbacks
   */
  on(type: string, ...callbacks: CallbackFunction[]) {
    if (!this.callbacks[type]) {
      this.callbacks[type] = [];
    }

    this.callbacks[type].push(...callbacks);

    return this;
  }

  /**
   * Unregisters callbacks by event name
   * @param {String} type
   * @param {Function} callback
   */
  off(type: string, callback: CallbackFunction) {
    if (!this.callbacks[type]) {
      return null;
    }

    const copy = this.callbacks[type].slice(0);

    for (let i = 0; i < copy.length; i++) {
      if (callback === copy[i]) {
        this.callbacks[type].splice(i, 1);
      }
    }

    return this;
  }

  /**
   * Triggers event callbacks by event object
   * @param {AbstractEvent} event
   */
  trigger(event: AbstractEvent<unknown>) {
    if (!this.callbacks[event.type]) {
      return null;
    }

    const callbacks = [...this.callbacks[event.type]];
    const caughtErrors = [];

    for (let i = callbacks.length - 1; i >= 0; i--) {
      const callback = callbacks[i];

      try {
        callback(event);
      } catch (error) {
        caughtErrors.push(error);
      }
    }

    if (caughtErrors.length) {
      /* eslint-disable no-console */
      console.error(
        `Draggable caught errors while triggering '${event.type}'`,
        caughtErrors,
      );
      /* eslint-enable no-console */
    }

    return this;
  }
}
