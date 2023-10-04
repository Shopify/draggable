import AbstractEvent from 'shared/AbstractEvent';

import {DragEvent, DragEventData} from '../../Draggable/DragEvent';

interface SwappableEventData {
  dragEvent: DragEvent<DragEventData>;
}

/**
 * Base swappable event
 * @class SwappableEvent
 * @module SwappableEvent
 * @extends AbstractEvent
 */
export class SwappableEvent<
  T extends SwappableEventData,
> extends AbstractEvent<SwappableEventData> {
  static type = 'swappable';

  /**
   * SwappableEvent constructor.
   * @constructs SwappableEvent
   * @param {SwappableEventData} data - Event data
   */
  constructor(public data: T) {
    super(data);
  }

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
export class SwappableStartEvent extends SwappableEvent<SwappableEventData> {
  static type = 'swappable:start';
  static cancelable = true;
}

interface SwappableSwapEventData extends SwappableEventData {
  over: HTMLElement;
  overContainer: HTMLElement;
}

/**
 * Swappable swap event
 * @class SwappableSwapEvent
 * @module SwappableSwapEvent
 * @extends SwappableEvent
 */
export class SwappableSwapEvent extends SwappableEvent<SwappableSwapEventData> {
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

interface SwappableSwappedEventData extends SwappableEventData {
  swappedElement: HTMLElement;
}

/**
 * Swappable swapped event
 * @class SwappableSwappedEvent
 * @module SwappableSwappedEvent
 * @extends SwappableEvent
 */
export class SwappableSwappedEvent extends SwappableEvent<SwappableSwappedEventData> {
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
export class SwappableStopEvent extends SwappableEvent<SwappableEventData> {
  static type = 'swappable:stop';
}
