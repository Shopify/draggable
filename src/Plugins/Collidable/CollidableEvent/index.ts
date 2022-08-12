import AbstractEvent from '../../../shared/AbstractEvent';

export type CollidableEventData = {
  dragEvent: DragEvent;
};

export class CollidableEvent extends AbstractEvent {
  declare data: CollidableEventData;

  get dragEvent(): DragEvent {
    return this.data.dragEvent;
  }

  static type = 'collidable';
}

export class CollidableInEvent extends CollidableEvent {
  declare data: CollidableEventData & {
    collidingElement: HTMLElement;
  };

  get collidingElement() {
    return this.data.collidingElement;
  }

  static type = 'collidable:in';
}

export class CollidableOutEvent extends CollidableEvent {
  declare data: CollidableEventData & {
    collidingElement: HTMLElement;
  };

  get collidingElement() {
    return this.data.collidingElement;
  }

  static type = 'collidable:out';
}
