import AbstractEvent from './abstract-event';

export class DraggableEvent extends AbstractEvent {
  static type = 'draggable';

  get draggable() {
    return this.data.draggable;
  }
}

export class DraggableInitializedEvent extends DraggableEvent {
  static type = 'draggable:initialize';
}

export class DraggableDestroyEvent extends DraggableEvent {
  static type = 'draggable:destroy';
}
