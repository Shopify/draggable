import AbstractEvent from 'shared/AbstractEvent';

import {DragEvent, DragEventData} from '../../../Draggable/DragEvent';

interface CollidableEventData {
  dragEvent: DragEvent<DragEventData>;
}

/**
 * Base collidable event
 * @class CollidableEvent
 * @module CollidableEvent
 * @extends AbstractEvent
 */
export class CollidableEvent<
  T extends CollidableEventData,
> extends AbstractEvent<CollidableEventData> {
  static type = 'collidable';

  /**
   * CollidableEvent constructor.
   * @constructs CollidableEvent
   * @param {CollidableEventData} data - Event data
   */
  constructor(public data: T) {
    super(data);
  }

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

interface CollidableInEventData extends CollidableEventData {
  collidingElement: HTMLElement;
}

/**
 * Collidable in event
 * @class CollidableInEvent
 * @module CollidableInEvent
 * @extends CollidableEvent
 */
export class CollidableInEvent extends CollidableEvent<CollidableInEventData> {
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

interface CollidableOutEventData extends CollidableEventData {
  collidingElement: HTMLElement;
}

/**
 * Collidable out event
 * @class CollidableOutEvent
 * @module CollidableOutEvent
 * @extends CollidableEvent
 */
export class CollidableOutEvent extends CollidableEvent<CollidableOutEventData> {
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
