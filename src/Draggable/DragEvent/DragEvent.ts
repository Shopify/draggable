import AbstractEvent from 'shared/AbstractEvent';
import {FixMeAny} from 'shared/types';

/**
 * DragEventData
 * @interface DragEventData
 */
export interface DragEventData {
  source: HTMLElement;
  originalSource: HTMLElement;
  mirror: HTMLElement;
  sourceContainer: HTMLElement;
  sensorEvent: FixMeAny;
}

/**
 * Base drag event
 * @class DragEvent
 * @module DragEvent
 * @extends AbstractEvent
 */
export class DragEvent<
  T extends DragEventData,
> extends AbstractEvent<DragEventData> {
  static type = 'drag';

  /**
   * DragEvent constructor.
   * @constructs DragEvent
   * @param {DragEventData} data - Event data
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
   * Draggables mirror element
   * @property mirror
   * @type {HTMLElement}
   * @readonly
   */
  get mirror() {
    return this.data.mirror;
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
 * Drag start event
 * @class DragStartEvent
 * @module DragStartEvent
 * @extends DragEvent
 */
export class DragStartEvent extends DragEvent<DragEventData> {
  static type = 'drag:start';
  static cancelable = true;
}

/**
 * Drag move event
 * @class DragMoveEvent
 * @module DragMoveEvent
 * @extends DragEvent
 */
export class DragMoveEvent extends DragEvent<DragEventData> {
  static type = 'drag:move';
}

/**
 * DragOverEventData
 * @interface DragOverEventData
 */
interface DragOverEventData extends DragEventData {
  overContainer: HTMLElement;
  over: HTMLElement;
}

/**
 * Drag over event
 * @class DragOverEvent
 * @module DragOverEvent
 * @extends DragEvent
 */
export class DragOverEvent extends DragEvent<DragOverEventData> {
  static type = 'drag:over';
  static cancelable = true;

  /**
   * Draggable container you are over
   * @property overContainer
   * @type {HTMLElement}
   * @readonly
   */
  get overContainer() {
    return this.data.overContainer;
  }

  /**
   * Draggable element you are over
   * @property over
   * @type {HTMLElement}
   * @readonly
   */
  get over() {
    return this.data.over;
  }
}

export function isDragOverEvent(
  event: AbstractEvent<unknown>,
): event is DragOverEvent {
  return event.type === DragOverEvent.type;
}

/**
 * DragOutEventData
 * @interface DragOutEventData
 */
interface DragOutEventData extends DragEventData {
  overContainer: HTMLElement;
  over: HTMLElement;
}

/**
 * Drag out event
 * @class DragOutEvent
 * @module DragOutEvent
 * @extends DragEvent
 */
export class DragOutEvent extends DragEvent<DragOutEventData> {
  static type = 'drag:out';

  /**
   * Draggable container you are over
   * @property overContainer
   * @type {HTMLElement}
   * @readonly
   */
  get overContainer() {
    return this.data.overContainer;
  }

  /**
   * Draggable element you left
   * @property over
   * @type {HTMLElement}
   * @readonly
   */
  get over() {
    return this.data.over;
  }
}

/**
 * DragOverContainerEventData
 * @interface DragOverContainerEventData
 */
interface DragOverContainerEventData extends DragEventData {
  overContainer: HTMLElement;
}

/**
 * Drag over container event
 * @class DragOverContainerEvent
 * @module DragOverContainerEvent
 * @extends DragEvent
 */
export class DragOverContainerEvent extends DragEvent<DragOverContainerEventData> {
  static type = 'drag:over:container';

  /**
   * Draggable container you are over
   * @property overContainer
   * @type {HTMLElement}
   * @readonly
   */
  get overContainer() {
    return this.data.overContainer;
  }
}

/**
 * DragOutContainerEventData
 * @interface DragOutContainerEventData
 */
interface DragOutContainerEventData extends DragEventData {
  overContainer: HTMLElement;
}

/**
 * Drag out container event
 * @class DragOutContainerEvent
 * @module DragOutContainerEvent
 * @extends DragEvent
 */
export class DragOutContainerEvent extends DragEvent<DragOutContainerEventData> {
  static type = 'drag:out:container';

  /**
   * Draggable container you left
   * @property overContainer
   * @type {HTMLElement}
   * @readonly
   */
  get overContainer() {
    return this.data.overContainer;
  }
}

/**
 * DragPressureEventData
 * @interface DragPressureEventData
 */
interface DragPressureEventData extends DragEventData {
  pressure: number;
}

/**
 * Drag pressure event
 * @class DragPressureEvent
 * @module DragPressureEvent
 * @extends DragEvent
 */
export class DragPressureEvent extends DragEvent<DragPressureEventData> {
  static type = 'drag:pressure';

  /**
   * Pressure applied on draggable element
   * @property pressure
   * @type {Number}
   * @readonly
   */
  get pressure() {
    return this.data.pressure;
  }
}

/**
 * Drag stop event
 * @class DragStopEvent
 * @module DragStopEvent
 * @extends DragEvent
 */
export class DragStopEvent extends DragEvent<DragEventData> {
  static type = 'drag:stop';
  static cancelable = true;
}

/**
 * Drag stopped event
 * @class DragStoppedEvent
 * @module DragStoppedEvent
 * @extends DragEvent
 */
export class DragStoppedEvent extends DragEvent<DragEventData> {
  static type = 'drag:stopped';
}
