import AbstractEvent from 'shared/AbstractEvent';

export class SwappableEvent extends AbstractEvent {
  static type = 'swappable';

  get dragEvent() {
    return this.data.dragEvent;
  }

  clone(data) {
    return new SwappableEvent({
      ...this.data,
      ...data,
    });
  }
}

export class SwappableStartEvent extends SwappableEvent {
  static type = 'swappable:start';
  static cancelable = true;

  clone(data) {
    return new SwappableStartEvent({
      ...this.data,
      ...data,
    });
  }
}

export class SwappableSwapEvent extends SwappableEvent {
  static type = 'swappable:swap';
  static cancelable = true;

  get over() {
    return this.data.over;
  }

  get overContainer() {
    return this.data.overContainer;
  }

  clone(data) {
    return new SwappableSwapEvent({
      ...this.data,
      ...data,
    });
  }
}

export class SwappableSwappedEvent extends SwappableEvent {
  static type = 'swappable:swapped';

  get swappedElement() {
    return this.data.swappedElement;
  }

  clone(data) {
    return new SwappableSwappedEvent({
      ...this.data,
      ...data,
    });
  }
}

export class SwappableStopEvent extends SwappableEvent {
  static type = 'swappable:stop';

  clone(data) {
    return new SwappableStopEvent({
      ...this.data,
      ...data,
    });
  }
}
