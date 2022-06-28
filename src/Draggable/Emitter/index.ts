import AbstractEvent from 'shared/AbstractEvent';

/**
 * The Emitter is a simple emitter class that provides you with `on()`, `off()` and `trigger()` methods
 * @class Emitter
 * @module Emitter
 */

type EmitterEventCallback = (event?: AbstractEvent) => void;

export default class Emitter {
  callbacks: Record<string, Array<EmitterEventCallback>>;

  constructor() {
    this.callbacks = {};
  }

  /**
   * Registers callbacks by event name
   * @param {String} type
   * @param {...Function} callbacks
   */
  on(type: string, ...callbacks: Array<EmitterEventCallback>) {
    if (!this.callbacks[type]) {
      this.callbacks[type] = [];
    }

    this.callbacks[type].push(...callbacks);

    return this;
  }

  off(type: string, callback: EmitterEventCallback) {
    if (!this.callbacks[type]) return null;
    const copy = [...this.callbacks[type]];

    copy.forEach((copyCallback, index) => {
      if (callback === copyCallback) this.callbacks[type].splice(index, 1);
    });

    return this;
  }

  /**
   * Triggers event callbacks by event object
   */
  trigger(event: AbstractEvent) {
    if (!this.callbacks[event.type]) return null;

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
        caughtErrors
      );
      /* eslint-disable no-console */
    }

    return this;
  }
}
