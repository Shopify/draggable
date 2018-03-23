const canceled = Symbol('canceled');

/**
 * All events fired by draggable inherit this class. You can call `cancel()` to
 * cancel a specific event or you can check if an event has been canceled by
 * calling `canceled()`.
 * @abstract
 * @class AbstractEvent
 * @module AbstractEvent
 */
export default class AbstractEvent {
  /**
   * Event type
   * @static
   * @abstract
   * @property type
   * @type {String}
   */
  static type = 'event';

  /**
   * Event cancelable
   * @static
   * @abstract
   * @property cancelable
   * @type {Boolean}
   */
  static cancelable = false;

  /**
   * AbstractEvent constructor.
   * @constructs AbstractEvent
   * @param {object} data - Event data
   */
  constructor(data) {
    this[canceled] = false;
    this.data = data;
  }

  /**
   * Read-only type
   * @abstract
   * @return {String}
   */
  get type() {
    return this.constructor.type;
  }

  /**
   * Read-only cancelable
   * @abstract
   * @return {Boolean}
   */
  get cancelable() {
    return this.constructor.cancelable;
  }

  /**
   * Cancels the event instance
   * @abstract
   */
  cancel() {
    this[canceled] = true;
  }

  /**
   * Check if event has been canceled
   * @abstract
   * @return {Boolean}
   */
  canceled() {
    return Boolean(this[canceled]);
  }
}
