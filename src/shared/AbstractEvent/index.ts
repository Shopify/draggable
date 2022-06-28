const canceled = Symbol('canceled');

/**
 * All events fired by draggable inherit this class. You can call `cancel()` to
 * cancel a specific event or you can check if an event has been canceled by
 * calling `canceled()`.
 */

export default class AbstractEvent {
  protected data;

  constructor(data?: Record<string, unknown>) {
    this[canceled] = false;
    this.data = data;
  }

  get type() {
    return (<typeof AbstractEvent>this.constructor).type;
  }

  get cancelable() {
    return (<typeof AbstractEvent>this.constructor).cancelable;
  }

  cancel() {
    this[canceled] = true;
  }

  canceled() {
    return Boolean(this[canceled]);
  }

  clone(data) {
    return new AbstractEvent({
      ...this.data,
      ...data,
    });
  }

  static type: string = 'event';
  static cancelable: boolean = false;
}
