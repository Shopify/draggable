import AbstractEvent from './abstract-event';

export class SwappableEvent extends AbstractEvent {
  get dragEvent() {
    return this.data.dragEvent;
  }
}

export class SwappableStartEvent extends SwappableEvent {
  static type = 'swappable:start';
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
