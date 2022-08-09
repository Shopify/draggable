import AbstractEvent from '../../../shared/AbstractEvent';

type SnappableEventData = {
  dragEvent: DragEvent;
  snappable: HTMLElement;
};

export class SnapEvent extends AbstractEvent {
  declare data: SnappableEventData;

  constructor(data?: SnappableEventData) {
    super(data);
  }

  get dragEvent() {
    return this.data.dragEvent;
  }

  get snappable() {
    return this.data.snappable;
  }

  clone(data: SnappableEventData) {
    return new SnapEvent({
      ...this.data,
      ...data,
    });
  }

  static type = 'snap';
}

export class SnapInEvent extends SnapEvent {
  static type = 'snap:in';
  static cancelable = true;

  clone(data: SnappableEventData) {
    return new SnapInEvent({
      ...this.data,
      ...data,
    });
  }
}

export class SnapOutEvent extends SnapEvent {
  static type = 'snap:out';
  static cancelable = true;

  clone(data: SnappableEventData) {
    return new SnapOutEvent({
      ...this.data,
      ...data,
    });
  }
}
