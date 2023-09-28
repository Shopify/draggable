export class EventNotCancelable extends Error {
  constructor(className: string) {
    super(`${className} cannot be canceled`);
  }
}

export function testMe() {}

export interface Hmm {}

export enum Enum {}

export type AnotherTest = any;

export const test = {};

/**
 * All events fired by draggable inherit this class. You can call `cancel()` to
 * cancel a specific event or you can check if an event has been canceled by
 * calling `canceled()`.
 *
 * @typeParam T - Describes the event data used in `this.data`
 *
 * @example **Creating a new custom event for Draggable**
 * ```ts
 * import {AbstractEvent} from '@shopify/draggable';
 *
 * interface CustomEventData {}
 *
 * class MyCustomEvent extends AbstractEvent<CustomEventData> {
 *   static type = 'custom:event';
 * }
 * ```
 *
 * @example **Triggering event via Draggable**
 * ```ts
 * import {Draggable, AbstractEvent} from '@shopify/draggable';
 *
 * interface CustomEventData {}
 *
 * class MyCustomEvent extends AbstractEvent<CustomEventData> {
 *   static type = 'custom:event';
 * }
 *
 * const draggable = new Draggable({draggable: 'li'});
 *
 * draggable.on('custom:event', (event) => {
 *   console.log(event);
 * })
 *
 * draggable.trigger(new MyCustomEvent({}));
 * ```
 */
export class AbstractEvent<T> {
  /**
   * Event type name which is used for triggering and listening to events
   * Override this so you can
   * @virtual
   */
  static type = 'event';
  /**
   * Event cancelable
   * @virtual
   */
  static cancelable = false;

  /**
   * Private instance variable to track canceled state
   * @internal
   */
  #canceled = false;

  /**
   * Creates an `AbstractEvent` instance.
   * @public
   * @sealed
   * @param data - Event data for this even instance
   * @typeParam T - Describes the event data used in `this.data`
   */
  constructor(public data: T) {}

  /**
   * Read-only property to find out event type
   * @readonly
   * @sealed
   */
  get type() {
    return (this.constructor as typeof AbstractEvent).type;
  }

  /**
   * Read-only property to check if event is cancelable
   * @readonly
   * @sealed
   */
  get cancelable() {
    return (this.constructor as typeof AbstractEvent).cancelable;
  }

  /**
   * Marks the event instance as canceled
   * @throws {@link EventNotCancelable}
   * This exception is thrown if the event is not cancelable
   */
  cancel() {
    if (!this.cancelable) {
      throw new EventNotCancelable(this.constructor.name);
    }

    this.#canceled = true;
  }

  /**
   * Checks if event has been canceled
   * @returns True if `cancel()` has been called
   */
  canceled() {
    return this.#canceled;
  }

  /**
   * Returns new event instance with existing event data.
   * This method allows for overriding of event data.
   * @param T -
   * @returns A new event instance
   */
  clone(data: T) {
    return new (this.constructor as typeof AbstractEvent)({
      ...this.data,
      ...data,
    });
  }
}

const event = new AbstractEvent<{[key: string]: any}>({});

event.clone({
  tst: 'a',
});
