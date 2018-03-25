/**
 * The Emitter is a simple emitter class that provides you with `on()`, `off()` and `trigger()` methods
 * @class Emitter
 * @module Emitter
 */
export default class Emitter {
  constructor() {
    this.callbacks = {};
  }

  /**
   * Registers callback by event name
   * @param {String} type
   * @param {Function} callback
   */
  on(type, ...callbacks) {
    let options = {capture: true};

    if (typeof callbacks[callbacks.length - 1] === 'object') {
      options = callbacks.pop();
    }

    if (!this.callbacks[type]) {
      this.callbacks[type] = {
        capture: [],
        bubble: [],
      };
    }

    const phase = options.capture ? 'capture' : 'bubble';

    this.callbacks[type][phase].push(...callbacks);

    return this;
  }

  /**
   * Unregisters callbacks by event name
   * @param {String} type
   * @param {Function} callback
   */
  off(type, callback, {capture = true} = {}) {
    if (!this.callbacks[type]) {
      return null;
    }

    const phase = capture ? 'capture' : 'bubble';

    this.callbacks[type][phase] = [
      ...this.callbacks[type][phase].filter((currentCallback) => callback !== currentCallback),
    ];

    return this;
  }

  /**
   * Triggers event callbacks by event object
   * @param {AbstractEvent} event
   */
  trigger(event) {
    if (!this.callbacks[event.type]) {
      return null;
    }

    const caughtErrors = [];

    const captureCallbacks = this.callbacks[event.type].capture;
    const bubbleCallbacks = this.callbacks[event.type].bubble;

    captureCallbacks.reverse().forEach(invoke);
    bubbleCallbacks.reverse().forEach(invoke);

    function invoke(callback) {
      try {
        callback(event);
      } catch (error) {
        caughtErrors.push(error);
      }
    }

    if (caughtErrors.length) {
      /* eslint-disable no-console */
      console.error(`Draggable caught errors while triggering '${event.type}'`, caughtErrors);
      /* eslint-disable no-console */
    }

    return this;
  }
}
