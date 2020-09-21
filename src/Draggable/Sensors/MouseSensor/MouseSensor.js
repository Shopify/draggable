import {closest, distance as euclideanDistance} from 'shared/utils';
import Sensor from '../Sensor';
import {DragStartSensorEvent, DragMoveSensorEvent, DragStopSensorEvent} from '../SensorEvent';

const onContextMenuWhileDragging = Symbol('onContextMenuWhileDragging');
const onMouseDown = Symbol('onMouseDown');
const onMouseMove = Symbol('onMouseMove');
const onMouseUp = Symbol('onMouseUp');
const startDrag = Symbol('startDrag');
const onDistanceChange = Symbol('onDistanceChange');

/**
 * This sensor picks up native browser mouse events and dictates drag operations
 * @class MouseSensor
 * @module MouseSensor
 * @extends Sensor
 */
export default class MouseSensor extends Sensor {
  /**
   * MouseSensor constructor.
   * @constructs MouseSensor
   * @param {HTMLElement[]|NodeList|HTMLElement} containers - Containers
   * @param {Object} options - Options
   */
  constructor(containers = [], options = {}) {
    super(containers, options);

    /**
     * Mouse down timer which will end up triggering the drag start operation
     * @property mouseDownTimeout
     * @type {Number}
     */
    this.mouseDownTimeout = null;

    /**
     * Save pageX coordinates for delay drag
     * @property {Numbre} pageX
     * @private
     */
    this.pageX = null;

    /**
     * Save pageY coordinates for delay drag
     * @property {Numbre} pageY
     * @private
     */
    this.pageY = null;

    this[onContextMenuWhileDragging] = this[onContextMenuWhileDragging].bind(this);
    this[onMouseDown] = this[onMouseDown].bind(this);
    this[onMouseMove] = this[onMouseMove].bind(this);
    this[onMouseUp] = this[onMouseUp].bind(this);
    this[startDrag] = this[startDrag].bind(this);
    this[onDistanceChange] = this[onDistanceChange].bind(this);
  }

  /**
   * Attaches sensors event listeners to the DOM
   */
  attach() {
    document.addEventListener('mousedown', this[onMouseDown], true);
  }

  /**
   * Detaches sensors event listeners to the DOM
   */
  detach() {
    document.removeEventListener('mousedown', this[onMouseDown], true);
  }

  /**
   * Mouse down handler
   * @private
   * @param {Event} event - Mouse down event
   */
  [onMouseDown](event) {
    if (event.button !== 0 || event.ctrlKey || event.metaKey) {
      return;
    }
    const container = closest(event.target, this.containers);

    if (!container) {
      return;
    }

    const {delay} = this;
    const {pageX, pageY} = event;

    Object.assign(this, {pageX, pageY});
    this.onMouseDownAt = Date.now();
    this.startEvent = event;

    this.currentContainer = container;
    document.addEventListener('mouseup', this[onMouseUp]);
    document.addEventListener('dragstart', preventNativeDragStart);
    document.addEventListener('mousemove', this[onDistanceChange]);

    this.mouseDownTimeout = window.setTimeout(() => {
      this[onDistanceChange]({pageX: this.pageX, pageY: this.pageY});
    }, delay.mouse);
  }

  /**
   * Start the drag
   * @private
   */
  [startDrag]() {
    const startEvent = this.startEvent;
    const container = this.currentContainer;

    const dragStartEvent = new DragStartSensorEvent({
      pageX: startEvent.pageX,
      pageY: startEvent.pageY,
      clientX: startEvent.clientX,
      clientY: startEvent.clientY,
      target: startEvent.target,
      container,
      originalEvent: startEvent,
    });

    this.trigger(this.currentContainer, dragStartEvent);

    this.dragging = !dragStartEvent.canceled();

    if (this.dragging) {
      document.addEventListener('contextmenu', this[onContextMenuWhileDragging], true);
      document.addEventListener('mousemove', this[onMouseMove]);
    }
  }

  /**
   * Detect change in distance, starting drag when both
   * delay and distance requirements are met
   * @private
   * @param {Event} event - Mouse move event
   */
  [onDistanceChange](event) {
    const {pageX, pageY} = event;
    const {distance} = this.options;
    const {startEvent, delay} = this;

    Object.assign(this, {pageX, pageY});

    if (!this.currentContainer) {
      return;
    }

    const timeElapsed = Date.now() - this.onMouseDownAt;
    const distanceTravelled = euclideanDistance(startEvent.pageX, startEvent.pageY, pageX, pageY) || 0;

    clearTimeout(this.mouseDownTimeout);

    if (timeElapsed < delay.mouse) {
      // moved during delay
      document.removeEventListener('mousemove', this[onDistanceChange]);
    } else if (distanceTravelled >= distance) {
      document.removeEventListener('mousemove', this[onDistanceChange]);
      this[startDrag]();
    }
  }

  /**
   * Mouse move handler
   * @private
   * @param {Event} event - Mouse move event
   */
  [onMouseMove](event) {
    if (!this.dragging) {
      return;
    }

    const target = document.elementFromPoint(event.clientX, event.clientY);

    const dragMoveEvent = new DragMoveSensorEvent({
      pageX: event.pageX,
      pageY: event.pageY,
      clientX: event.clientX,
      clientY: event.clientY,
      target,
      container: this.currentContainer,
      originalEvent: event,
    });

    this.trigger(this.currentContainer, dragMoveEvent);
  }

  /**
   * Mouse up handler
   * @private
   * @param {Event} event - Mouse up event
   */
  [onMouseUp](event) {
    clearTimeout(this.mouseDownTimeout);

    if (event.button !== 0) {
      return;
    }

    document.removeEventListener('mouseup', this[onMouseUp]);
    document.removeEventListener('dragstart', preventNativeDragStart);
    document.removeEventListener('mousemove', this[onDistanceChange]);

    if (!this.dragging) {
      return;
    }

    const target = document.elementFromPoint(event.clientX, event.clientY);

    const dragStopEvent = new DragStopSensorEvent({
      pageX: event.pageX,
      pageY: event.pageY,
      clientX: event.clientX,
      clientY: event.clientY,
      target,
      container: this.currentContainer,
      originalEvent: event,
    });

    this.trigger(this.currentContainer, dragStopEvent);

    document.removeEventListener('contextmenu', this[onContextMenuWhileDragging], true);
    document.removeEventListener('mousemove', this[onMouseMove]);

    this.currentContainer = null;
    this.dragging = false;
    this.startEvent = null;
  }

  /**
   * Context menu handler
   * @private
   * @param {Event} event - Context menu event
   */
  [onContextMenuWhileDragging](event) {
    event.preventDefault();
  }
}

function preventNativeDragStart(event) {
  event.preventDefault();
}
