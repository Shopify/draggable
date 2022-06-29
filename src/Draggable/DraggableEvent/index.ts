import Draggable from '..';
import AbstractEvent from '../../shared/AbstractEvent';

export class DraggableEvent extends AbstractEvent {
  static type = 'draggable';
  declare data: {
    draggable: Draggable;
    source: HTMLElement;
  };

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

export class DraggableInitializedEvent extends DraggableEvent {
  static type = 'draggable:initialize';

  clone(data) {
    return new DraggableInitializedEvent({
      ...this.data,
      ...data,
    });
  }
}

export class DraggableDestroyEvent extends DraggableEvent {
  static type = 'draggable:destroy';

  clone(data) {
    return new DraggableDestroyEvent({
      ...this.data,
      ...data,
    });
  }
}
