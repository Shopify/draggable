import {SensorEvent} from 'Draggable/Sensors';
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

  /*** Draggables source element */
  get source() {
    return this.data.source;
  }

  /*** Draggables original source element */
  get originalSource() {
    return this.data.originalSource;
  }

  /*** Draggables source container element */
  get sourceContainer() {
    return this.data.sourceContainer;
  }

  /*** Sensor event */
  get sensorEvent() {
    return this.data.sensorEvent;
  }

  /*** Drag event */
  get dragEvent() {
    return this.data.dragEvent;
  }

  /*** Original event that triggered sensor event */
  get originalEvent() {
    return this.sensorEvent ? this.sensorEvent.originalEvent : null;
  }
}

/**
 * Mirror create event
 * @class MirrorCreateEvent
 * @module MirrorCreateEvent
 * @extends MirrorEvent
 */
export class MirrorCreateEvent extends MirrorEvent {
  static type = 'mirror:create';
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
}

export class MirrorAttachedEvent extends MirrorEvent {
  static type = 'mirror:attached';

  declare data: MirrorEventData & {
    mirror: HTMLElement;
  };

  get mirror() {
    return this.data.mirror;
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
}
