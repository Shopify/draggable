import AbstractEvent from 'shared/AbstractEvent';

import {DragEvent, DragEventData} from '../../Draggable/DragEvent';

interface DroppableEventData {
  dragEvent: DragEvent<DragEventData>;
}

/**
 * Base droppable event
 * @class DroppableEvent
 * @module DroppableEvent
 * @extends AbstractEvent
 */
export class DroppableEvent<
  T extends DroppableEventData,
> extends AbstractEvent<DroppableEventData> {
  static type = 'droppable';

  /**
   * DroppableEvent constructor.
   * @constructs DroppableEvent
   * @param {DroppableEventData} data - Event data
   */
  constructor(public data: T) {
    super(data);
  }

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

interface DroppableStartEventData extends DroppableEventData {
  dropzone: HTMLElement;
}

/**
 * Droppable start event
 * @class DroppableStartEvent
 * @module DroppableStartEvent
 * @extends DroppableEvent
 */
export class DroppableStartEvent extends DroppableEvent<DroppableStartEventData> {
  static type = 'droppable:start';
  static cancelable = true;

  /**
   * The initial dropzone element of the currently dragging draggable element
   * @property dropzone
   * @type {HTMLElement}
   * @readonly
   */
  get dropzone() {
    return this.data.dropzone;
  }
}

interface DroppableDroppedEventData extends DroppableEventData {
  dropzone: HTMLElement;
}

/**
 * Droppable dropped event
 * @class DroppableDroppedEvent
 * @module DroppableDroppedEvent
 * @extends DroppableEvent
 */
export class DroppableDroppedEvent extends DroppableEvent<DroppableDroppedEventData> {
  static type = 'droppable:dropped';
  static cancelable = true;

  /**
   * The dropzone element you dropped the draggable element into
   * @property dropzone
   * @type {HTMLElement}
   * @readonly
   */
  get dropzone() {
    return this.data.dropzone;
  }
}

interface DroppableReturnedEventData extends DroppableEventData {
  dropzone: HTMLElement;
}

/**
 * Droppable returned event
 * @class DroppableReturnedEvent
 * @module DroppableReturnedEvent
 * @extends DroppableEvent
 */
export class DroppableReturnedEvent extends DroppableEvent<DroppableReturnedEventData> {
  static type = 'droppable:returned';
  static cancelable = true;

  /**
   * The dropzone element you dragged away from
   * @property dropzone
   * @type {HTMLElement}
   * @readonly
   */
  get dropzone() {
    return this.data.dropzone;
  }
}

interface DroppableStopEventData extends DroppableEventData {
  dropzone: HTMLElement;
}

/**
 * Droppable stop event
 * @class DroppableStopEvent
 * @module DroppableStopEvent
 * @extends DroppableEvent
 */
export class DroppableStopEvent extends DroppableEvent<DroppableStopEventData> {
  static type = 'droppable:stop';
  static cancelable = true;

  /**
   * The final dropzone element of the draggable element
   * @property dropzone
   * @type {HTMLElement}
   * @readonly
   */
  get dropzone() {
    return this.data.dropzone;
  }
}
