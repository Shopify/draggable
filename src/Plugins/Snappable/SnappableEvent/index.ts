import AbstractEvent from 'shared/AbstractEvent';

export class SnapEvent extends AbstractEvent {
  static type = 'snap';

  get dragEvent() {
    return this.data.dragEvent;
  }

  get snappable() {
    return this.data.snappable;
  }

  clone(data) {
    return new SnapEvent({
      ...this.data,
      ...data,
    });
  }
}

export class SnapInEvent extends SnapEvent {
  static type = 'snap:in';
  static cancelable = true;

  clone(data) {
    return new SnapInEvent({
      ...this.data,
      ...data,
    });
  }
}

export class SnapOutEvent extends SnapEvent {
  static type = 'snap:out';
  static cancelable = true;

  clone(data) {
    return new SnapOutEvent({
      ...this.data,
      ...data,
    });
  }
}
