import AbstractEvent from 'shared/AbstractEvent';

/**
 * Base droppable event
 * @class DroppableEvent
 * @module DroppableEvent
 * @extends AbstractEvent
 */
export class DroppableEvent extends AbstractEvent {
  static type = 'droppable';

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
 * Droppable start event
 * @class DroppableStartEvent
 * @module DroppableStartEvent
 * @extends DroppableEvent
 */
export class DroppableStartEvent extends DroppableEvent {
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

/**
 * Droppable dropped event
 * @class DroppableDroppedEvent
 * @module DroppableDroppedEvent
 * @extends DroppableEvent
 */
export class DroppableDroppedEvent extends DroppableEvent {
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

/**
 * Droppable returned event
 * @class DroppableReturnedEvent
 * @module DroppableReturnedEvent
 * @extends DroppableEvent
 */
export class DroppableReturnedEvent extends DroppableEvent {
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

/**
 * Droppable stop event
 * @class DroppableStopEvent
 * @module DroppableStopEvent
 * @extends DroppableEvent
 */
export class DroppableStopEvent extends DroppableEvent {
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
