import {closest, distance as euclideanDistance} from 'shared/utils';
import Sensor, {SensorOptions} from '../Sensor';
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
  declare startEvent: MouseEvent;

  /*** Mouse down timer which will end up triggering the drag start operation */
  mouseDownTimeout: number = null;
  /*** Save pageX coordinates for delay drag */
  private pageX: number = null;
  /*** Save pageY coordinates for delay drag */
  private pageY: number = null;
  /*** Moment when mouseDown event happened */
  private onMouseDownAt: number;

  /**
   * Mouse down handler
   * @param {MouseEvent} event - Mouse down event
   */
  private [onMouseDown] = (event: MouseEvent) => {
    if (event.button !== 0 || event.ctrlKey || event.metaKey) {
      return;
    }
    const container = closest(<HTMLElement>event.target, this.containers);

    if (!container) {
      return;
    }

    if (this.options.handle && event.target && !closest(<HTMLElement>event.target, this.options.handle)) {
      return;
    }

    const originalSource = closest(<HTMLElement>event.target, this.options.draggable);

    if (!originalSource) {
      return;
    }

    const {delay} = this;
    const {pageX, pageY} = event;

    Object.assign(this, {pageX, pageY});
    this.onMouseDownAt = Date.now();
    this.startEvent = event;

    this.currentContainer = container;
    this.originalSource = originalSource;
    document.addEventListener('mouseup', this[onMouseUp]);
    document.addEventListener('dragstart', preventNativeDragStart);
    document.addEventListener('mousemove', this[onDistanceChange]);

    this.mouseDownTimeout = window.setTimeout(() => {
      this[onDistanceChange](<MouseEvent>{pageX: this.pageX, pageY: this.pageY});
    }, delay.mouse);
  };

  /**
   * Start the drag
   */
  private [startDrag] = () => {
    const startEvent = this.startEvent;
    const container = this.currentContainer;
    const originalSource = this.originalSource;

    const dragStartEvent = new DragStartSensorEvent({
      clientX: startEvent.clientX,
      clientY: startEvent.clientY,
      target: startEvent.target,
      container,
      originalSource,
      originalEvent: startEvent,
    });

    this.trigger(this.currentContainer, dragStartEvent);

    this.dragging = !dragStartEvent.canceled();

    if (this.dragging) {
      document.addEventListener('contextmenu', this[onContextMenuWhileDragging], true);
      document.addEventListener('mousemove', this[onMouseMove]);
    }
  };

  /**
   * Detect change in distance, starting drag when both
   * delay and distance requirements are met
   * @param {MouseEvent} event - Mouse move event
   */
  private [onDistanceChange] = (event: MouseEvent) => {
    const {pageX, pageY} = event;
    const {distance} = this.options;
    const {startEvent, delay} = this;

    Object.assign(this, {pageX, pageY});

    if (!this.currentContainer) return;

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
  };

  /**
   * Mouse move handler
   * @param {MouseEvent} event - Mouse move event
   */
  private [onMouseMove] = (event: MouseEvent) => {
    if (!this.dragging) return;

    const target = document.elementFromPoint(event.clientX, event.clientY);

    const dragMoveEvent = new DragMoveSensorEvent({
      clientX: event.clientX,
      clientY: event.clientY,
      target,
      container: this.currentContainer,
      originalEvent: event,
    });

    this.trigger(this.currentContainer, dragMoveEvent);
  };

  /**
   * Mouse up handler
   * @param {MouseEvent} event - Mouse up event
   */
  private [onMouseUp] = (event: MouseEvent) => {
    clearTimeout(this.mouseDownTimeout);

    if (event.button !== 0) return;

    document.removeEventListener('mouseup', this[onMouseUp]);
    document.removeEventListener('dragstart', preventNativeDragStart);
    document.removeEventListener('mousemove', this[onDistanceChange]);

    if (!this.dragging) return;

    const target = document.elementFromPoint(event.clientX, event.clientY);

    const dragStopEvent = new DragStopSensorEvent({
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
  };

  /**
   * Context menu handler
   * @param {Event} event - Context menu event
   */
  private [onContextMenuWhileDragging] = (event) => {
    event.preventDefault();
  };

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
}

function preventNativeDragStart(event) {
  event.preventDefault();
}
