import AbstractEvent from 'shared/AbstractEvent';

/**
 * Base pannable event
 * @class PannableEvent
 * @module PannableEvent
 * @extends AbstractEvent
 */
export class PannableEvent extends AbstractEvent {
  static type = 'pannable';

  /**
   * Original drag event that triggered this droppable event
   * @property dragEvent
   * @type {DragEvent}
   * @readonly
   */
  get dragEvent() {
    return this.data.dragEvent;
  }
}

/**
 * Pannable start event
 * @class PannableStartEvent
 * @module PannableStartEvent
 * @extends PannableEvent
 */
export class PannableStartEvent extends PannableEvent {
  static type = 'pannable:start';
  static cancelable = true;
}

/**
 * Pannable pan event
 * @class PannablePanEvent
 * @module PannablePanEvent
 * @extends PannableEvent
 */
export class PannablePanEvent extends PannableEvent {
  static type = 'pannable:pan';
  static cancelable = true;
}

/**
 * Pannable stop event
 * @class PannableStopEvent
 * @module PannableStopEvent
 * @extends PannableEvent
 */
export class PannableStopEvent extends PannableEvent {
  static type = 'pannable:stop';
}
