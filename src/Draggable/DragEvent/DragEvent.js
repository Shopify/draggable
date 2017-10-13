import AbstractEvent from 'shared/AbstractEvent';

/**
 * Base drag event
 * @class DragEvent
 * @module DragEvent
 * @extends AbstractEvent
 */
export class DragEvent extends AbstractEvent {
  static type = 'drag';

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

  /**
   * Checks if mirror has been created
   * @return {Boolean}
   */
  hasMirror() {
    return Boolean(this.mirror);
  }
}

/**
 * Drag start event
 * @class DragStartEvent
 * @module DragStartEvent
 * @extends DragEvent
 */
export class DragStartEvent extends DragEvent {
  static type = 'drag:start';
  static cancelable = true;
}

/**
 * Drag move event
 * @class DragMoveEvent
 * @module DragMoveEvent
 * @extends DragEvent
 */
export class DragMoveEvent extends DragEvent {
  static type = 'drag:move';
}

/**
 * Drag over event
 * @class DragOverEvent
 * @module DragOverEvent
 * @extends DragEvent
 */
export class DragOverEvent extends DragEvent {
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

/**
 * Drag out event
 * @class DragOutEvent
 * @module DragOutEvent
 * @extends DragEvent
 */
export class DragOutEvent extends DragEvent {
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
 * Drag over container event
 * @class DragOverContainerEvent
 * @module DragOverContainerEvent
 * @extends DragEvent
 */
export class DragOverContainerEvent extends DragEvent {
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
 * Drag out container event
 * @class DragOutContainerEvent
 * @module DragOutContainerEvent
 * @extends DragEvent
 */
export class DragOutContainerEvent extends DragEvent {
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
 * Drag pressure event
 * @class DragPressureEvent
 * @module DragPressureEvent
 * @extends DragEvent
 */
export class DragPressureEvent extends DragEvent {
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
export class DragStopEvent extends DragEvent {
  static type = 'drag:stop';
}
