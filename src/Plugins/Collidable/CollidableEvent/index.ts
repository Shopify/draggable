import AbstractEvent from '../../../shared/AbstractEvent';

export type CollidableEventData = {
  dragEvent: DragEvent;
};

export class CollidableEvent extends AbstractEvent {
  declare data: CollidableEventData;
  static type = 'collidable';

  get dragEvent(): DragEvent {
    return this.data.dragEvent;
  }

  clone(data: typeof this.data) {
    return new CollidableEvent({
      ...this.data,
      ...data,
    });
  }
}

export class CollidableInEvent extends CollidableEvent {
  declare data: CollidableEventData & {
    collidingElement: HTMLElement;
  };
  static type = 'collidable:in';

  get collidingElement() {
    return this.data.collidingElement;
  }

  clone(data: typeof this.data) {
    return new CollidableInEvent({
      ...this.data,
      ...data,
    });
  }
}

export class CollidableOutEvent extends CollidableEvent {
  declare data: CollidableEventData & {
    collidingElement: HTMLElement;
  };

  get collidingElement() {
    return this.data.collidingElement;
  }

  clone(data: typeof this.data) {
    return new CollidableOutEvent({
      ...this.data,
      ...data,
    });
  }

  static type = 'collidable:out';
}
