import AbstractEvent from 'shared/AbstractEvent';

export class CollidableEvent extends AbstractEvent {
  static type = 'collidable';

  get dragEvent() {
    return this.data.dragEvent;
  }

  clone(data) {
    return new CollidableEvent({
      ...this.data,
      ...data,
    });
  }
}

export class CollidableInEvent extends CollidableEvent {
  static type = 'collidable:in';

  get collidingElement() {
    return this.data.collidingElement;
  }

  clone(data) {
    return new CollidableInEvent({
      ...this.data,
      ...data,
    });
  }
}

export class CollidableOutEvent extends CollidableEvent {
  static type = 'collidable:out';

  get collidingElement() {
    return this.data.collidingElement;
  }

  clone(data) {
    return new CollidableOutEvent({
      ...this.data,
      ...data,
    });
  }
}
