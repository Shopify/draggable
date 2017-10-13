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
 * Droppable over event
 * @class DroppableOverEvent
 * @module DroppableOverEvent
 * @extends DroppableEvent
 */
export class DroppableOverEvent extends DroppableEvent {
  static type = 'droppable:over';
  static cancelable = true;

  /**
   * The droppable element you are over
   * @property droppable
   * @type {HTMLElement}
   * @readonly
   */
  get droppable() {
    return this.data.droppable;
  }
}

/**
 * Droppable out event
 * @class DroppableOutEvent
 * @module DroppableOutEvent
 * @extends DroppableEvent
 */
export class DroppableOutEvent extends DroppableEvent {
  static type = 'droppable:out';
  static cancelable = true;

  /**
   * The droppable element you _were_ over
   * @property droppable
   * @type {HTMLElement}
   * @readonly
   */
  get droppable() {
    return this.data.droppable;
  }
}
