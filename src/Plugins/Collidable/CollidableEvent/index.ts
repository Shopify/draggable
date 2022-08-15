import { DragEvent } from 'Draggable';

export type CollidableEventData = {
  dragEvent: DragEvent;
};

export class CollidableEvent<
  T extends CollidableEventData = CollidableEventData
> extends CustomEvent<T> {
  constructor(
    eventInitDict?: CustomEventInit<T>,
    type: string = CollidableEvent.type
  ) {
    super(type, eventInitDict);
  }

  get dragEvent(): DragEvent {
    return this.detail.dragEvent;
  }

  static type = 'collidable';
}

export type CollidableInEventDetail = CollidableEventData & {
  collidingElement: HTMLElement;
};

export class CollidableInEvent extends CollidableEvent<CollidableInEventDetail> {
  constructor(detail: CollidableInEventDetail) {
    super({ detail }, CollidableInEvent.type);
  }

  get collidingElement() {
    return this.detail.collidingElement;
  }

  static type = 'collidable:in';
}

export type CollidableOutEventDetail = CollidableEventData & {
  collidingElement: HTMLElement;
};

export class CollidableOutEvent extends CollidableEvent<CollidableOutEventDetail> {
  constructor(detail: CollidableOutEventDetail) {
    super({ detail }, CollidableOutEvent.type);
  }

  get collidingElement() {
    return this.detail.collidingElement;
  }

  static type = 'collidable:out';
}
