import AbstractEvent from './abstract-event';

export class MirrorEvent extends AbstractEvent {
  get source() {
    return this.data.source;
  }

  get mirror() {
    return this.data.mirror;
  }

  get sourceContainer() {
    return this.data.sourceContainer;
  }

  get sensorEvent() {
    return this.data.sensorEvent;
  }

  get originalEvent() {
    if (this.sensorEvent) {
      return this.sensorEvent.originalEvent;
    }

    return null;
  }
}

export class MirrorCreatedEvent extends MirrorEvent {
  static type = 'mirror:created';
}

export class MirrorAttachedEvent extends MirrorEvent {
  static type = 'mirror:attached';
}

export class MirrorMoveEvent extends MirrorEvent {
  static type = 'mirror:move';
}

export class MirrorDestroyEvent extends MirrorEvent {
  static type = 'mirror:destroy';
}
