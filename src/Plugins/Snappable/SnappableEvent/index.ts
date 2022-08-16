import { DragEvent } from 'Draggable';

type SnappableEventDetail = {
  dragEvent: DragEvent;
  snappable: HTMLElement;
};

export class SnapEvent<
  T extends SnappableEventDetail = SnappableEventDetail
> extends CustomEvent<T> {
  constructor(
    eventInitDict?: CustomEventInit<T>,
    type: string = SnapEvent.type
  ) {
    super(type, eventInitDict);
  }

  get dragEvent() {
    return this.detail.dragEvent;
  }

  get snappable() {
    return this.detail.snappable;
  }

  clone = (detail: Partial<SnappableEventDetail>) =>
    new SnapEvent({ detail: { ...this.detail, ...detail } }, SnapEvent.type);

  static type = 'snap';
}

export class SnapInEvent extends SnapEvent {
  constructor(detail: SnappableEventDetail) {
    super({ detail, cancelable: SnapInEvent.cancelable }, SnapInEvent.type);
  }

  clone = (detail: Partial<SnappableEventDetail>) =>
    new SnapInEvent({ ...this.detail, ...detail });

  static type = 'snap:in';
  static cancelable = true;
}

export class SnapOutEvent extends SnapEvent {
  constructor(detail: SnappableEventDetail) {
    super({ detail, cancelable: SnapOutEvent.cancelable }, SnapOutEvent.type);
  }

  clone = (detail: Partial<SnappableEventDetail>) =>
    new SnapOutEvent({ ...this.detail, ...detail });

  static type = 'snap:out';
  static cancelable = true;
}
