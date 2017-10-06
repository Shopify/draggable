import AbstractEvent from 'shared/AbstractEvent';

export class DroppableEvent extends AbstractEvent {
  static type = 'droppable';

  get dragEvent() {
    return this.data.dragEvent;
  }

  get droppable() {
    return this.data.droppable;
  }
}

export class DroppableOverEvent extends DroppableEvent {
  static type = 'droppable:over';
}

export class DroppableOutEvent extends DroppableEvent {
  static type = 'droppable:out';
}
