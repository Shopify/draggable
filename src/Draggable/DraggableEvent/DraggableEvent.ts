import AbstractEvent from 'shared/AbstractEvent';
import {FixMeAny} from 'shared/types';

/**
 * DraggableEventData
 * @interface DraggableEventData
 */
interface DraggableEventData {
  draggable: FixMeAny;
}

/**
 * Base draggable event
 * @class DraggableEvent
 * @module DraggableEvent
 * @extends AbstractEvent
 */
export class DraggableEvent extends AbstractEvent<DraggableEventData> {
  static type = 'draggable';

  /**
   * Draggable instance
   * @property draggable
   * @type {Draggable}
   * @readonly
   */
  get draggable() {
    return this.data.draggable;
  }
}

/**
 * Draggable initialized event
 * @class DraggableInitializedEvent
 * @module DraggableInitializedEvent
 * @extends DraggableEvent
 */
export class DraggableInitializedEvent extends DraggableEvent {
  static type = 'draggable:initialize';
}

/**
 * Draggable destory event
 * @class DraggableInitializedEvent
 * @module DraggableDestroyEvent
 * @extends DraggableDestroyEvent
 */
export class DraggableDestroyEvent extends DraggableEvent {
  static type = 'draggable:destroy';
}
