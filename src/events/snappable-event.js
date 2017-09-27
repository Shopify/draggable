import AbstractEvent from './abstract-event';

export class SnapEvent extends AbstractEvent {
  get dragEvent() {
    return this.data.dragEvent;
  }
}

export class SnapInEvent extends SnapEvent {
  static type = 'snap:in';
}

export class SnapOutEvent extends SnapEvent {
  static type = 'snap:out';
}
