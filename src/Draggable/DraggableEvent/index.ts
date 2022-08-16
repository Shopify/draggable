import Draggable from '..';

export type DraggableEventDetail = {
  draggable: Draggable;
  source?: HTMLElement;
};

export class DraggableEvent extends CustomEvent<DraggableEventDetail> {
  constructor(
    eventInitDict?: CustomEventInit<DraggableEventDetail>,
    type: string = DraggableEvent.type
  ) {
    super(type, eventInitDict);
  }

  get draggable() {
    return this.detail.draggable;
  }

  get source() {
    return this.detail.source;
  }

  clone = (detail: Partial<DraggableEventDetail>) =>
    new DraggableEvent({ detail: { ...this.detail, ...detail } }, this.type);

  static type = 'draggable';
}

export class DraggableInitializedEvent extends DraggableEvent {
  static type = 'draggable:initialized';

  constructor(detail: DraggableEventDetail) {
    super({ detail }, DraggableInitializedEvent.type);
  }
}

export class DraggableDestroyEvent extends DraggableEvent {
  static type = 'draggable:destroy';

  constructor(detail: DraggableEventDetail) {
    super({ detail }, DraggableDestroyEvent.type);
  }
}
