import AbstractEvent from 'shared/AbstractEvent';

/**
 * Base swappable event
 * @class SwappableEvent
 * @module SwappableEvent
 * @extends AbstractEvent
 */
export class SwappableEvent extends AbstractEvent {
  static type = 'swappable';

  /**
   * Original drag event that triggered this swappable event
   * @property dragEvent
   * @type {DragEvent}
   * @readonly
   */
  get dragEvent() {
    return this.data.dragEvent;
  }
}

/**
 * Swappable start event
 * @class SwappableStartEvent
 * @module SwappableStartEvent
 * @extends SwappableEvent
 */
export class SwappableStartEvent extends SwappableEvent {
  static type = 'swappable:start';
  static cancelable = true;
}

/**
 * Swappable swap event
 * @class SwappableSwapEvent
 * @module SwappableSwapEvent
 * @extends SwappableEvent
 */
export class SwappableSwapEvent extends SwappableEvent {
  static type = 'swappable:swap';
  static cancelable = true;

  /**
   * Draggable element you are over
   * @property over
   * @type {HTMLElement}
   * @readonly
   */
  get over() {
    return this.data.over;
  }

  /**
   * Draggable container you are over
   * @property overContainer
   * @type {HTMLElement}
   * @readonly
   */
  get overContainer() {
    return this.data.overContainer;
  }
}

/**
 * Swappable swapped event
 * @class SwappableSwappedEvent
 * @module SwappableSwappedEvent
 * @extends SwappableEvent
 */
export class SwappableSwappedEvent extends SwappableEvent {
  static type = 'swappable:swapped';

  /**
   * The draggable element that you swapped with
   * @property swappedElement
   * @type {HTMLElement}
   * @readonly
   */
  get swappedElement() {
    return this.data.swappedElement;
  }
}

/**
 * Swappable stop event
 * @class SwappableStopEvent
 * @module SwappableStopEvent
 * @extends SwappableEvent
 */
export class SwappableStopEvent extends SwappableEvent {
  static type = 'swappable:stop';
}
