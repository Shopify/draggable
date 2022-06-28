import Draggable from 'Draggable/Draggable';
import AbstractEvent from 'shared/AbstractEvent';

/**
 * Base draggable event
 * @class DraggableEvent
 * @module DraggableEvent
 * @extends AbstractEvent
 */
export class DraggableEvent extends AbstractEvent {
  static type = 'draggable';
  declare data: {
    draggable: Draggable;
  };
  /**
   * Draggable instance
   * @property draggable
   * @type {Draggable}
   * @readonly
   */
  get draggable() {
    return this.data.draggable;
  }

  clone(data) {
    return new DraggableEvent({
      ...this.data,
      ...data,
    });
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

  clone(data) {
    return new DraggableInitializedEvent({
      ...this.data,
      ...data,
    });
  }
}

/**
 * Draggable destory event
 * @class DraggableInitializedEvent
 * @module DraggableDestroyEvent
 * @extends DraggableDestroyEvent
 */
export class DraggableDestroyEvent extends DraggableEvent {
  static type = 'draggable:destroy';

  clone(data) {
    return new DraggableDestroyEvent({
      ...this.data,
      ...data,
    });
  }
}
