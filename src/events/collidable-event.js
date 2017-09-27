import AbstractEvent from './abstract-event';

export class CollidableEvent extends AbstractEvent {
  static type = 'collidable';

  get dragEvent() {
    return this.data.dragEvent;
  }
}

export class CollidableInEvent extends CollidableEvent {
  static type = 'collidable:in';

  get collidingElement() {
    return this.data.collidingElement;
  }
}

export class CollidableOutEvent extends CollidableEvent {
  static type = 'collidable:out';

  get collidingElement() {
    return this.data.collidingElement;
  }
}
