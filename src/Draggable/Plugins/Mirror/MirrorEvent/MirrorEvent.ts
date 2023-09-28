import AbstractEvent from 'shared/AbstractEvent';
import {FixMeAny} from 'shared/types';

import {DragEvent, DragEventData} from '../../../DragEvent';

interface MirrorEventData {
  source: HTMLElement;
  originalSource: HTMLElement;
  sourceContainer: HTMLElement;
  sensorEvent: FixMeAny;
  dragEvent: DragEvent<DragEventData>;
}

/**
 * Base mirror event
 * @class MirrorEvent
 * @module MirrorEvent
 * @extends AbstractEvent
 */
export class MirrorEvent<
  T extends MirrorEventData,
> extends AbstractEvent<MirrorEventData> {
  /**
   * MirrorEvent constructor.
   * @constructs MirrorEvent
   * @param {MirrorEventData} data - Event data
   */
  constructor(public data: T) {
    super(data);
  }

  /**
   * Draggables source element
   * @property source
   * @type {HTMLElement}
   * @readonly
   */
  get source() {
    return this.data.source;
  }

  /**
   * Draggables original source element
   * @property originalSource
   * @type {HTMLElement}
   * @readonly
   */
  get originalSource() {
    return this.data.originalSource;
  }

  /**
   * Draggables source container element
   * @property sourceContainer
   * @type {HTMLElement}
   * @readonly
   */
  get sourceContainer() {
    return this.data.sourceContainer;
  }

  /**
   * Sensor event
   * @property sensorEvent
   * @type {SensorEvent}
   * @readonly
   */
  get sensorEvent() {
    return this.data.sensorEvent;
  }

  /**
   * Drag event
   * @property dragEvent
   * @type {DragEvent}
   * @readonly
   */
  get dragEvent() {
    return this.data.dragEvent;
  }

  /**
   * Original event that triggered sensor event
   * @property originalEvent
   * @type {Event}
   * @readonly
   */
  get originalEvent() {
    if (this.sensorEvent) {
      return this.sensorEvent.originalEvent;
    }

    return null;
  }
}

/**
 * Mirror create event
 * @class MirrorCreateEvent
 * @module MirrorCreateEvent
 * @extends MirrorEvent
 */
export class MirrorCreateEvent extends MirrorEvent<MirrorEventData> {
  static type = 'mirror:create';
}

interface MirrorCreatedEventData extends MirrorEventData {
  mirror: HTMLElement;
}

/**
 * Mirror created event
 * @class MirrorCreatedEvent
 * @module MirrorCreatedEvent
 * @extends MirrorEvent
 */
export class MirrorCreatedEvent extends MirrorEvent<MirrorCreatedEventData> {
  static type = 'mirror:created';

  /**
   * Draggables mirror element
   * @property mirror
   * @type {HTMLElement}
   * @readonly
   */
  get mirror() {
    return this.data.mirror;
  }
}

interface MirrorAttachedEventData extends MirrorEventData {
  mirror: HTMLElement;
}

/**
 * Mirror attached event
 * @class MirrorAttachedEvent
 * @module MirrorAttachedEvent
 * @extends MirrorEvent
 */
export class MirrorAttachedEvent extends MirrorEvent<MirrorAttachedEventData> {
  static type = 'mirror:attached';

  /**
   * Draggables mirror element
   * @property mirror
   * @type {HTMLElement}
   * @readonly
   */
  get mirror() {
    return this.data.mirror;
  }
}

interface MirrorMoveEventData extends MirrorEventData {
  mirror: HTMLElement;
  passedThreshX: boolean;
  passedThreshY: boolean;
}

/**
 * Mirror move event
 * @class MirrorMoveEvent
 * @module MirrorMoveEvent
 * @extends MirrorEvent
 */
export class MirrorMoveEvent extends MirrorEvent<MirrorMoveEventData> {
  static type = 'mirror:move';
  static cancelable = true;

  /**
   * Draggables mirror element
   * @property mirror
   * @type {HTMLElement}
   * @readonly
   */
  get mirror() {
    return this.data.mirror;
  }

  /**
   * Sensor has exceeded mirror's threshold on x axis
   * @type {Boolean}
   * @readonly
   */
  get passedThreshX() {
    return this.data.passedThreshX;
  }

  /**
   * Sensor has exceeded mirror's threshold on y axis
   * @type {Boolean}
   * @readonly
   */
  get passedThreshY() {
    return this.data.passedThreshY;
  }
}

interface MirrorMovedEventData extends MirrorEventData {
  mirror: HTMLElement;
  passedThreshX: boolean;
  passedThreshY: boolean;
}

/**
 * Mirror moved event
 * @class MirrorMovedEvent
 * @module MirrorMovedEvent
 * @extends MirrorEvent
 */
export class MirrorMovedEvent extends MirrorEvent<MirrorMovedEventData> {
  static type = 'mirror:moved';

  /**
   * Draggables mirror element
   * @property mirror
   * @type {HTMLElement}
   * @readonly
   */
  get mirror() {
    return this.data.mirror;
  }

  /**
   * Sensor has exceeded mirror's threshold on x axis
   * @type {Boolean}
   * @readonly
   */
  get passedThreshX() {
    return this.data.passedThreshX;
  }

  /**
   * Sensor has exceeded mirror's threshold on y axis
   * @type {Boolean}
   * @readonly
   */
  get passedThreshY() {
    return this.data.passedThreshY;
  }
}

interface MirrorDestroyEventData extends MirrorEventData {
  mirror: HTMLElement;
}

/**
 * Mirror destroy event
 * @class MirrorDestroyEvent
 * @module MirrorDestroyEvent
 * @extends MirrorEvent
 */
export class MirrorDestroyEvent extends MirrorEvent<MirrorDestroyEventData> {
  static type = 'mirror:destroy';
  static cancelable = true;

  /**
   * Draggables mirror element
   * @property mirror
   * @type {HTMLElement}
   * @readonly
   */
  get mirror() {
    return this.data.mirror;
  }
}
