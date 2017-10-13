import AbstractEvent from 'shared/AbstractEvent';

/**
 * Base collidable event
 * @class CollidableEvent
 * @module CollidableEvent
 * @extends AbstractEvent
 */
export class CollidableEvent extends AbstractEvent {
  static type = 'collidable';

  /**
   * Drag event that triggered this colliable event
   * @property dragEvent
   * @type {DragEvent}
   * @readonly
   */
  get dragEvent() {
    return this.data.dragEvent;
  }
}

/**
 * Collidable in event
 * @class CollidableInEvent
 * @module CollidableInEvent
 * @extends CollidableEvent
 */
export class CollidableInEvent extends CollidableEvent {
  static type = 'collidable:in';

  /**
   * Element you are currently colliding with
   * @property collidingElement
   * @type {HTMLElement}
   * @readonly
   */
  get collidingElement() {
    return this.data.collidingElement;
  }
}

/**
 * Collidable out event
 * @class CollidableOutEvent
 * @module CollidableOutEvent
 * @extends CollidableEvent
 */
export class CollidableOutEvent extends CollidableEvent {
  static type = 'collidable:out';

  /**
   * Element you were previously colliding with
   * @property collidingElement
   * @type {HTMLElement}
   * @readonly
   */
  get collidingElement() {
    return this.data.collidingElement;
  }
}
