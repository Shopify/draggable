import AbstractEvent from 'shared/AbstractEvent';

/**
 * Base snap event
 * @class SnapEvent
 * @module SnapEvent
 * @extends AbstractEvent
 */
export class SnapEvent extends AbstractEvent {
  static type = 'snap';

  /**
   * Drag event that triggered this snap event
   * @property dragEvent
   * @type {DragEvent}
   * @readonly
   */
  get dragEvent() {
    return this.data.dragEvent;
  }

  /**
   * Snappable element
   * @property snappable
   * @type {HTMLElement}
   * @readonly
   */
  get snappable() {
    return this.data.snappable;
  }
}

/**
 * Snap in event
 * @class SnapInEvent
 * @module SnapInEvent
 * @extends SnapEvent
 */
export class SnapInEvent extends SnapEvent {
  static type = 'snap:in';
  static cancelable = true;
}

/**
 * Snap out event
 * @class SnapOutEvent
 * @module SnapOutEvent
 * @extends SnapEvent
 */
export class SnapOutEvent extends SnapEvent {
  static type = 'snap:out';
  static cancelable = true;
}
