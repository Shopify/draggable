/**
 * All events fired by draggable inherit this class. You can call `cancel()` to
 * cancel a specific event or you can check if an event has been canceled by
 * calling `canceled()`.
 * @abstract
 * @class AbstractEvent
 * @module AbstractEvent
 */
export class AbstractEvent<T> {
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
   * Private instance variable to track canceled state
   * @private
   * @type {Boolean}
   */
  private _canceled = false;

  /**
   * AbstractEvent constructor.
   * @constructs AbstractEvent
   * @param {T} data - Event data
   */
  constructor(public data: T) {}

  /**
   * Read-only type
   * @abstract
   * @return {String}
   */
  get type() {
    return (this.constructor as typeof AbstractEvent).type;
  }

  /**
   * Read-only cancelable
   * @abstract
   * @return {Boolean}
   */
  get cancelable() {
    return (this.constructor as typeof AbstractEvent).cancelable;
  }

  /**
   * Cancels the event instance
   * @abstract
   */
  cancel() {
    this._canceled = true;
  }

  /**
   * Check if event has been canceled
   * @abstract
   * @return {Boolean}
   */
  canceled() {
    return this._canceled;
  }

  /**
   * Returns new event instance with existing event data.
   * This method allows for overriding of event data.
   * @param {T} data
   * @return {AbstractEvent}
   */
  clone(data: T) {
    return new (this.constructor as typeof AbstractEvent)({
      ...this.data,
      ...data,
    });
  }
}
