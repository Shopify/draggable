import AbstractEvent from 'shared/AbstractEvent';

/**
 * Base sensor event
 */
export class SensorEvent extends AbstractEvent {
  declare data: {
    originalEvent?: Event;
    clientX?: number;
    clientY?: number;
    target?: HTMLElement;
    container?: HTMLElement;
    originalSource?: HTMLElement;
    pressure?: number;
  };

  /**
   * Original browser event that triggered a sensor
   */
  get originalEvent() {
    return this.data.originalEvent;
  }

  /**
   * Normalized clientX for both touch and mouse events
   */
  get clientX() {
    return this.data.clientX;
  }

  /**
   * Normalized clientY for both touch and mouse events
   */
  get clientY() {
    return this.data.clientY;
  }

  /**
   * Normalized target for both touch and mouse events
   * Returns the element that is behind cursor or touch pointer
   */
  get target() {
    return this.data.target;
  }

  /**
   * Container that initiated the sensor
   * @property container
   * @type {HTMLElement}
   * @readonly
   */
  get container() {
    return this.data.container;
  }

  /**
   * Draggables original source element
   */
  get originalSource() {
    return this.data.originalSource;
  }

  /**
   * Trackpad pressure
   */
  get pressure() {
    return this.data.pressure;
  }
}

/**
 * Drag start sensor event
 */
export class DragStartSensorEvent extends SensorEvent {
  static type = 'drag:start';
}

/**
 * Drag move sensor event
 */
export class DragMoveSensorEvent extends SensorEvent {
  static type = 'drag:move';
}

/**
 * Drag stop sensor event
 */
export class DragStopSensorEvent extends SensorEvent {
  static type = 'drag:stop';
}

/**
 * Drag pressure sensor event
 */
export class DragPressureSensorEvent extends SensorEvent {
  static type = 'drag:pressure';
}
