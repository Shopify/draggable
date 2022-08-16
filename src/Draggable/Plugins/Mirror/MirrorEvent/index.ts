import { DragEvent } from 'Draggable/DragEvent';

import { SensorEvent } from '../../../Sensors';

export type MirrorEventDetail = {
  dragEvent: DragEvent;
  sensorEvent: SensorEvent;
  originalEvent?: Event;
  target?: HTMLElement;
  container?: HTMLElement;
  source: HTMLElement;
  sourceContainer: HTMLElement;
  originalSource?: HTMLElement;
  pressure?: number;
};

export class MirrorEvent<T extends MirrorEventDetail> extends CustomEvent<T> {
  constructor(eventInitDict?: CustomEventInit<T>, type = MirrorEvent.type) {
    super(type, eventInitDict);
  }

  get source() {
    return this.detail.source;
  }

  get originalSource() {
    return this.detail.originalSource;
  }

  get sourceContainer() {
    return this.detail.sourceContainer;
  }

  get sensorEvent() {
    return this.detail.sensorEvent;
  }

  get dragEvent() {
    return this.detail.dragEvent;
  }

  get originalEvent() {
    return this.sensorEvent ? this.sensorEvent.originalEvent : null;
  }

  clone = (detail: Partial<T>) =>
    new MirrorEvent(
      { cancelable: this.cancelable, detail: { ...this.detail, ...detail } },
      this.type
    );

  static type = 'mirror';
}

export class MirrorCreateEvent extends MirrorEvent<MirrorEventDetail> {
  constructor(detail: MirrorEventDetail) {
    super(
      { detail, cancelable: MirrorCreateEvent.cancelable },
      MirrorCreateEvent.type
    );
  }

  static type = 'mirror:create';
  static cancelable = true;
}

export type MirrorCreatedEventDetail = MirrorEventDetail & {
  mirror: HTMLElement;
};

export class MirrorCreatedEvent extends MirrorEvent<MirrorCreatedEventDetail> {
  constructor(detail: MirrorCreatedEventDetail) {
    super({ detail }, MirrorCreatedEvent.type);
  }

  /*** Draggables mirror element */
  get mirror() {
    return this.detail.mirror;
  }

  static type = 'mirror:created';
}

export type MirrorAttachedEventDetail = MirrorEventDetail & {
  mirror: HTMLElement;
};

export class MirrorAttachedEvent extends MirrorEvent<MirrorAttachedEventDetail> {
  constructor(detail: MirrorAttachedEventDetail) {
    super({ detail }, MirrorAttachedEvent.type);
  }

  get mirror() {
    return this.detail.mirror;
  }

  static type = 'mirror:attached';
}

export type MirrorMoveEventDetail = MirrorEventDetail & {
  mirror: HTMLElement;
  passedThreshX: boolean;
  passedThreshY: boolean;
};

export class MirrorMoveEvent extends MirrorEvent<MirrorMoveEventDetail> {
  constructor(detail: MirrorMoveEventDetail) {
    super(
      { detail, cancelable: MirrorMoveEvent.cancelable },
      MirrorMoveEvent.type
    );
  }

  get mirror() {
    return this.detail.mirror;
  }

  /*** Sensor has exceeded mirror's threshold on x axis */
  get passedThreshX() {
    return this.detail.passedThreshX;
  }

  /*** Sensor has exceeded mirror's threshold on y axis */
  get passedThreshY() {
    return this.detail.passedThreshY;
  }

  static type = 'mirror:move';
  static cancelable = true;
}

/**
 * (Added in: v1.0.0-beta.13)
 *
 * Mirror moved event
 * @class MirrorMovedEvent
 * @module MirrorMovedEvent
 * @extends MirrorEvent
 */

export type MirrorMovedEventDetail = MirrorEventDetail & {
  mirror: HTMLElement;
  passedThreshX: boolean;
  passedThreshY: boolean;
};

export class MirrorMovedEvent extends MirrorEvent<MirrorMovedEventDetail> {
  constructor(detail: MirrorMovedEventDetail) {
    super({ detail }, MirrorMovedEvent.type);
  }

  /*** Draggables mirror element */
  get mirror() {
    return this.detail.mirror;
  }

  /*** Sensor has exceeded mirror's threshold on x axis */
  get passedThreshX() {
    return this.detail.passedThreshX;
  }

  /*** Sensor has exceeded mirror's threshold on y axis */
  get passedThreshY() {
    return this.detail.passedThreshY;
  }

  static type = 'mirror:moved';
}

/**
 * Mirror destroy event
 * @class MirrorDestroyEvent
 * @module MirrorDestroyEvent
 * @extends MirrorEvent
 */

export type MirrorDestroyEventDetail = MirrorEventDetail & {
  mirror: HTMLElement;
};

export class MirrorDestroyEvent extends MirrorEvent<MirrorDestroyEventDetail> {
  constructor(detail: MirrorDestroyEventDetail) {
    super(
      { detail, cancelable: MirrorDestroyEvent.cancelable },
      MirrorDestroyEvent.type
    );
  }

  /*** Draggables mirror element */
  get mirror() {
    return this.detail.mirror;
  }

  static type = 'mirror:destroy';
  static cancelable = true;
}
