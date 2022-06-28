import { SensorEvent } from 'Draggable/Sensors';
import AbstractEvent from 'shared/AbstractEvent';

interface MirrorEventData {
  dragEvent?: DragEvent;
  sensorEvent?: SensorEvent;
  originalEvent?: Event;
  source?: HTMLElement;
  target?: HTMLElement;
  container?: HTMLElement;
  sourceContainer?: HTMLElement;
  originalSource?: HTMLElement;
  pressure?: number;
}

export class MirrorEvent extends AbstractEvent {
  declare data: MirrorEventData;

  get source() {
    return this.data.source;
  }

  get originalSource() {
    return this.data.originalSource;
  }

  get sourceContainer() {
    return this.data.sourceContainer;
  }

  get sensorEvent() {
    return this.data.sensorEvent;
  }

  get dragEvent() {
    return this.data.dragEvent;
  }

  get originalEvent() {
    return this.sensorEvent ? this.sensorEvent.originalEvent : null;
  }

  clone(data) {
    return new MirrorEvent({
      ...this.data,
      ...data,
    });
  }
}

export class MirrorCreateEvent extends MirrorEvent {
  static type = 'mirror:create';

  clone(data) {
    return new MirrorCreateEvent({
      ...this.data,
      ...data,
    });
  }
}

export class MirrorCreatedEvent extends MirrorEvent {
  static type = 'mirror:created';
  declare data: MirrorEventData & {
    mirror: HTMLElement;
  };

  /*** Draggables mirror element */
  get mirror() {
    return this.data.mirror;
  }

  clone(data) {
    return new MirrorCreatedEvent({
      ...this.data,
      ...data,
    });
  }
}

export class MirrorAttachedEvent extends MirrorEvent {
  static type = 'mirror:attached';

  declare data: MirrorEventData & {
    mirror: HTMLElement;
  };

  get mirror() {
    return this.data.mirror;
  }

  clone(data) {
    return new MirrorAttachedEvent({
      ...this.data,
      ...data,
    });
  }
}

export class MirrorMoveEvent extends MirrorEvent {
  declare data: MirrorEventData & {
    mirror: HTMLElement;
    passedThreshX: boolean;
    passedThreshY: boolean;
  };

  get mirror() {
    return this.data.mirror;
  }

  /*** Sensor has exceeded mirror's threshold on x axis */
  get passedThreshX() {
    return this.data.passedThreshX;
  }

  /*** Sensor has exceeded mirror's threshold on y axis */
  get passedThreshY() {
    return this.data.passedThreshY;
  }

  static type = 'mirror:move';
  static cancelable = true;

  clone(data) {
    return new MirrorMoveEvent({
      ...this.data,
      ...data,
    });
  }
}

/**
 * (Added in: v1.0.0-beta.13)
 *
 * Mirror moved event
 * @class MirrorMovedEvent
 * @module MirrorMovedEvent
 * @extends MirrorEvent
 */
export class MirrorMovedEvent extends MirrorEvent {
  static type = 'mirror:moved';

  declare data: MirrorEventData & {
    mirror: HTMLElement;
    passedThreshX: boolean;
    passedThreshY: boolean;
  };

  /*** Draggables mirror element */
  get mirror() {
    return this.data.mirror;
  }

  /*** Sensor has exceeded mirror's threshold on x axis */
  get passedThreshX() {
    return this.data.passedThreshX;
  }

  /*** Sensor has exceeded mirror's threshold on y axis */
  get passedThreshY() {
    return this.data.passedThreshY;
  }

  clone(data) {
    return new MirrorMovedEvent({
      ...this.data,
      ...data,
    });
  }
}

/**
 * Mirror destroy event
 * @class MirrorDestroyEvent
 * @module MirrorDestroyEvent
 * @extends MirrorEvent
 */
export class MirrorDestroyEvent extends MirrorEvent {
  static type = 'mirror:destroy';
  static cancelable = true;

  declare data: MirrorEventData & {
    mirror: HTMLElement;
  };

  /*** Draggables mirror element */
  get mirror() {
    return this.data.mirror;
  }

  clone(data) {
    return new MirrorDestroyEvent({
      ...this.data,
      ...data,
    });
  }
}
