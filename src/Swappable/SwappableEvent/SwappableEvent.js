import AbstractEvent from 'shared/AbstractEvent';

export class SwappableEvent extends AbstractEvent {
  get dragEvent() {
    return this.data.dragEvent;
  }
}

export class SwappableStartEvent extends SwappableEvent {
  static type = 'swappable:start';
}

export class SwappableSwapEvent extends SwappableEvent {
  static type = 'swappable:swap';

  get over() {
    return this.data.over;
  }

  get overContainer() {
    return this.data.overContainer;
  }
}

export class SwappableSwappedEvent extends SwappableEvent {
  static type = 'swappable:swapped';

  get swappedElement() {
    return this.data.swappedElement;
  }
}

export class SwappableStopEvent extends SwappableEvent {
  static type = 'swappable:stop';
}
