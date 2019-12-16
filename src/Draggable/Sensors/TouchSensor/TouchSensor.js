import {closest, distance as euclideanDistance, touchCoords} from 'shared/utils';
import Sensor from '../Sensor';
import {DragStartSensorEvent, DragMoveSensorEvent, DragStopSensorEvent} from '../SensorEvent';

const onTouchStart = Symbol('onTouchStart');
const onTouchEnd = Symbol('onTouchEnd');
const onTouchMove = Symbol('onTouchMove');
const startDrag = Symbol('startDrag');
const onDistanceChange = Symbol('onDistanceChange');

/**
 * Prevents scrolling when set to true
 * @var {Boolean} preventScrolling
 */
let preventScrolling = false;

// WebKit requires cancelable `touchmove` events to be added as early as possible
window.addEventListener(
  'touchmove',
  (event) => {
    if (!preventScrolling) {
      return;
    }

    // Prevent scrolling
    event.preventDefault();
  },
  {passive: false},
);

/**
 * This sensor picks up native browser touch events and dictates drag operations
 * @class TouchSensor
 * @module TouchSensor
 * @extends Sensor
 */
export default class TouchSensor extends Sensor {
  /**
   * TouchSensor constructor.
   * @constructs TouchSensor
   * @param {HTMLElement[]|NodeList|HTMLElement} containers - Containers
   * @param {Object} options - Options
   */
  constructor(containers = [], options = {}) {
    super(containers, options);

    /**
     * Closest scrollable container so accidental scroll can cancel long touch
     * @property currentScrollableParent
     * @type {HTMLElement}
     */
    this.currentScrollableParent = null;

    /**
     * TimeoutID for managing delay
     * @property tapTimeout
     * @type {Number}
     */
    this.tapTimeout = null;

    /**
     * touchMoved indicates if touch has moved during tapTimeout
     * @property touchMoved
     * @type {Boolean}
     */
    this.touchMoved = false;

    this[onTouchStart] = this[onTouchStart].bind(this);
    this[onTouchEnd] = this[onTouchEnd].bind(this);
    this[onTouchMove] = this[onTouchMove].bind(this);
    this[startDrag] = this[startDrag].bind(this);
    this[onDistanceChange] = this[onDistanceChange].bind(this);
  }

  /**
   * Attaches sensors event listeners to the DOM
   */
  attach() {
    document.addEventListener('touchstart', this[onTouchStart]);
  }

  /**
   * Detaches sensors event listeners to the DOM
   */
  detach() {
    document.removeEventListener('touchstart', this[onTouchStart]);
  }

  /**
   * Touch start handler
   * @private
   * @param {Event} event - Touch start event
   */
  [onTouchStart](event) {
    const container = closest(event.target, this.containers);

    if (!container) {
      return;
    }
    const {distance = 0, delay = 0} = this.options;
    const {pageX, pageY} = touchCoords(event);

    Object.assign(this, {pageX, pageY});
    this.onTouchStartAt = Date.now();
    this.startEvent = event;
    this.currentContainer = container;

    document.addEventListener('touchend', this[onTouchEnd]);
    document.addEventListener('touchcancel', this[onTouchEnd]);
    document.addEventListener('touchmove', this[onDistanceChange]);
    container.addEventListener('contextmenu', onContextMenu);

    if (distance) {
      preventScrolling = true;
    }

    this.tapTimeout = window.setTimeout(() => {
      this[onDistanceChange]({touches: [{pageX: this.pageX, pageY: this.pageY}]});
    }, delay);
  }

  /**
   * Start the drag
   * @private
   */
  [startDrag]() {
    const startEvent = this.startEvent;
    const container = this.currentContainer;
    const touch = touchCoords(startEvent);

    const dragStartEvent = new DragStartSensorEvent({
      clientX: touch.pageX,
      clientY: touch.pageY,
      target: startEvent.target,
      container,
      originalEvent: startEvent,
    });

    this.trigger(this.currentContainer, dragStartEvent);

    this.dragging = !dragStartEvent.canceled();

    if (this.dragging) {
      document.addEventListener('touchmove', this[onTouchMove]);
    }
    preventScrolling = this.dragging;
  }

  /**
   * Touch move handler prior to drag start.
   * @private
   * @param {Event} event - Touch move event
   */
  [onDistanceChange](event) {
    const {delay, distance} = this.options;
    const {startEvent} = this;
    const start = touchCoords(startEvent);
    const current = touchCoords(event);
    const timeElapsed = Date.now() - this.onTouchStartAt;
    const distanceTravelled = euclideanDistance(start.pageX, start.pageY, current.pageX, current.pageY);

    Object.assign(this, current);
    if (timeElapsed >= delay && distanceTravelled >= distance) {
      window.clearTimeout(this.tapTimeout);
      document.removeEventListener('touchmove', this[onDistanceChange]);
      this[startDrag]();
    }
  }

  /**
   * Mouse move handler while dragging
   * @private
   * @param {Event} event - Touch move event
   */
  [onTouchMove](event) {
    if (!this.dragging) {
      return;
    }
    const {pageX, pageY} = touchCoords(event);
    const target = document.elementFromPoint(pageX - window.scrollX, pageY - window.scrollY);

    const dragMoveEvent = new DragMoveSensorEvent({
      clientX: pageX,
      clientY: pageY,
      target,
      container: this.currentContainer,
      originalEvent: event,
    });

    this.trigger(this.currentContainer, dragMoveEvent);
  }

  /**
   * Touch end handler
   * @private
   * @param {Event} event - Touch end event
   */
  [onTouchEnd](event) {
    clearTimeout(this.tapTimeout);
    preventScrolling = false;

    document.removeEventListener('touchend', this[onTouchEnd]);
    document.removeEventListener('touchcancel', this[onTouchEnd]);
    document.removeEventListener('touchmove', this[onDistanceChange]);

    if (this.currentContainer) {
      this.currentContainer.removeEventListener('contextmenu', onContextMenu);
    }

    if (!this.dragging) {
      return;
    }

    document.removeEventListener('touchmove', this[onTouchMove]);

    const {pageX, pageY} = touchCoords(event);
    const target = document.elementFromPoint(pageX - window.scrollX, pageY - window.scrollY);

    event.preventDefault();

    const dragStopEvent = new DragStopSensorEvent({
      clientX: pageX,
      clientY: pageY,
      target,
      container: this.currentContainer,
      originalEvent: event,
    });

    this.trigger(this.currentContainer, dragStopEvent);

    this.currentContainer = null;
    this.dragging = false;
    this.startEvent = null;
  }
}

function onContextMenu(event) {
  event.preventDefault();
  event.stopPropagation();
}
