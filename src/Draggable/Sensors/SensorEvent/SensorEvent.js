import AbstractEvent from 'shared/AbstractEvent';

/**
 * Base sensor event
 * @class SensorEvent
 * @module SensorEvent
 * @extends AbstractEvent
 */
export class SensorEvent extends AbstractEvent {
  /**
   * Original browser event that triggered a sensor
   * @property originalEvent
   * @type {Event}
   * @readonly
   */
  get originalEvent() {
    return this.data.originalEvent;
  }

  /**
   * Normalized target for both touch and mouse events
   * Returns the element that is behind cursor or touch pointer
   * @property target
   * @type {HTMLElement}
   * @readonly
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
}

/**
 * Keyboard based sensor event with key codes
 * @class KeyboardSensorEvent
 * @module KeyboardSensorEvent
 * @extends SensorEvent
 */
export class KeyboardSensorEvent extends SensorEvent {
  /**
   * Key code for space key
   * @property SPACE
   * @type {Number}
   * @readonly
   * @static
   */
  static SPACE = 32;

  /**
   * Key code for down key
   * @property DOWN
   * @type {Number}
   * @readonly
   * @static
   */
  static DOWN = 40;

  /**
   * Key code for right key
   * @property RIGHT
   * @type {Number}
   * @readonly
   * @static
   */
  static RIGHT = 39;

  /**
   * Key code for up key
   * @property UP
   * @type {Number}
   * @readonly
   * @static
   */
  static UP = 38;

  /**
   * Key code for left key
   * @property LEFT
   * @type {Number}
   * @readonly
   * @static
   */
  static LEFT = 37;

  /**
   * Key code of keyboard event
   * @property keyCode
   * @type {Number}
   * @readonly
   */
  get keyCode() {
    return this.data.keyCode;
  }

  /**
   * Returns true if space key was pressed
   * @property space
   * @type {Boolean}
   * @readonly
   */
  get space() {
    return this.keyCode === KeyboardSensorEvent.SPACE;
  }

  /**
   * Returns true if down key was pressed
   * @property down
   * @type {Boolean}
   * @readonly
   */
  get down() {
    return this.keyCode === KeyboardSensorEvent.DOWN;
  }

  /**
   * Returns true if right key was pressed
   * @property right
   * @type {Boolean}
   * @readonly
   */
  get right() {
    return this.keyCode === KeyboardSensorEvent.RIGHT;
  }

  /**
   * Returns true if up key was pressed
   * @property up
   * @type {Boolean}
   * @readonly
   */
  get up() {
    return this.keyCode === KeyboardSensorEvent.UP;
  }

  /**
   * Returns true if left key was pressed
   * @property left
   * @type {Boolean}
   * @readonly
   */
  get left() {
    return this.keyCode === KeyboardSensorEvent.LEFT;
  }
}

/**
 * Drag start sensor event
 * @class DragKeyboardStartSensorEvent
 * @module DragKeyboardStartSensorEvent
 * @extends KeyboardSensorEvent
 */
export class DragKeyboardStartSensorEvent extends KeyboardSensorEvent {
  static type = 'drag:keyboard:start';
}

/**
 * Drag next sensor event
 * @class DragKeyboardNextSensorEvent
 * @module DragKeyboardNextSensorEvent
 * @extends KeyboardSensorEvent
 */
export class DragKeyboardNextSensorEvent extends KeyboardSensorEvent {
  static type = 'drag:keyboard:next';
}

/**
 * Drag previous sensor event
 * @class DragKeyboardPreviousSensorEvent
 * @module DragKeyboardPreviousSensorEvent
 * @extends KeyboardSensorEvent
 */
export class DragKeyboardPreviousSensorEvent extends KeyboardSensorEvent {
  static type = 'drag:keyboard:previous';
}

/**
 * Drag stop sensor event
 * @class DragKeyboardStopSensorEvent
 * @module DragKeyboardStopSensorEvent
 * @extends KeyboardSensorEvent
 */
export class DragKeyboardStopSensorEvent extends KeyboardSensorEvent {
  static type = 'drag:keyboard:stop';
}

/**
 * Pointer based sensor event with coordinates
 * @class PointerSensorEvent
 * @module PointerSensorEvent
 * @extends SensorEvent
 */
export class PointerSensorEvent extends SensorEvent {
  /**
   * Normalized clientX for both touch and mouse events
   * @property clientX
   * @type {Number}
   * @readonly
   */
  get clientX() {
    return this.data.clientX;
  }

  /**
   * Normalized clientY for both touch and mouse events
   * @property clientY
   * @type {Number}
   * @readonly
   */
  get clientY() {
    return this.data.clientY;
  }
}

/**
 * Drag start sensor event
 * @class DragPointerStartSensorEvent
 * @module DragPointerStartSensorEvent
 * @extends PointerSensorEvent
 */
export class DragPointerStartSensorEvent extends PointerSensorEvent {
  static type = 'drag:pointer:start';
}

/**
 * Drag move sensor event
 * @class DragPointerMoveSensorEvent
 * @module DragPointerMoveSensorEvent
 * @extends PointerSensorEvent
 */
export class DragPointerMoveSensorEvent extends PointerSensorEvent {
  static type = 'drag:pointer:move';
}

/**
 * Drag stop sensor event
 * @class DragPointerStopSensorEvent
 * @module DragPointerStopSensorEvent
 * @extends PointerSensorEvent
 */
export class DragPointerStopSensorEvent extends PointerSensorEvent {
  static type = 'drag:pointer:stop';
}

/**
 * Drag pressure sensor event
 * @class DragPointerPressureSensorEvent
 * @module DragPointerPressureSensorEvent
 * @extends PointerSensorEvent
 */
export class DragPointerPressureSensorEvent extends PointerSensorEvent {
  static type = 'drag:pointer:pressure';

  /**
   * Trackpad pressure
   * @property pressure
   * @type {Number}
   * @readonly
   */
  get pressure() {
    return this.data.pressure;
  }
}
