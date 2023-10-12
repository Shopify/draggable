import {closest, distance as euclideanDistance, AutoBind} from 'shared/utils';

import Sensor from '../Sensor';
import {
  DragStartSensorEvent,
  DragMoveSensorEvent,
  DragStopSensorEvent,
} from '../SensorEvent';

/**
 * This sensor picks up native browser mouse events and dictates drag operations
 * @class MouseSensor
 * @module MouseSensor
 * @extends Sensor
 */
export default class MouseSensor extends Sensor {
  /**
   * Mouse down timer which will end up triggering the drag start operation
   * @property mouseDownTimeout
   * @type {Number}
   */
  public mouseDownTimeout: number | null = null;
  /**
   * Save pageX coordinates for delay drag
   * @property {Numbre} pageX
   * @private
   */
  public pageX: number | null = null;
  /**
   * Save pageY coordinates for delay drag
   * @property {Numbre} pageY
   * @private
   */
  public pageY: number | null = null;
  public onMouseDownAt: number | null = null;
  public startEvent: MouseEvent | null = null;

  /**
   * Attaches sensors event listeners to the DOM
   */
  attach() {
    document.addEventListener('mousedown', this.onMouseDown, true);

    return this;
  }

  /**
   * Detaches sensors event listeners to the DOM
   */
  detach() {
    document.removeEventListener('mousedown', this.onMouseDown, true);

    return this;
  }

  /**
   * Mouse down handler
   * @private
   * @param {Event} event - Mouse down event
   */
  @AutoBind
  protected onMouseDown(event: MouseEvent) {
    if (
      event.target == null ||
      event.button !== 0 ||
      event.ctrlKey ||
      event.metaKey
    ) {
      return;
    }

    const target = event.target as Node;
    const container = closest(target, this.containers);

    if (container == null) {
      return;
    }

    if (
      this.options.handle &&
      event.target &&
      !closest(target, this.options.handle)
    ) {
      return;
    }

    const originalSource = closest(target, this.options.draggable);

    if (originalSource == null) {
      return;
    }

    this.pageX = event.pageX;
    this.pageY = event.pageY;

    this.onMouseDownAt = Date.now();
    this.startEvent = event;

    this.currentContainer = container as HTMLElement;
    this.originalSource = originalSource as HTMLElement;

    document.addEventListener('mouseup', this.onMouseUp);
    document.addEventListener('dragstart', preventNativeDragStart);
    document.addEventListener('mousemove', this.onDistanceChange);

    this.mouseDownTimeout = window.setTimeout(() => {
      if (this.pageX == null || this.pageY == null) {
        return;
      }

      this.onDistanceChange({pageX: this.pageX, pageY: this.pageY});
    }, this.delay.mouse);
  }

  /**
   * Start the drag
   */
  @AutoBind
  protected startDrag() {
    if (
      this.startEvent == null ||
      this.startEvent.target == null ||
      this.currentContainer == null ||
      this.originalSource == null
    ) {
      return;
    }

    const dragStartEvent = new DragStartSensorEvent({
      clientX: this.startEvent.clientX,
      clientY: this.startEvent.clientY,
      target: this.startEvent.target as HTMLElement,
      container: this.currentContainer,
      originalSource: this.originalSource,
      originalEvent: this.startEvent,
    });

    this.trigger(this.currentContainer, dragStartEvent);

    this.dragging = !dragStartEvent.canceled();

    if (this.dragging) {
      document.addEventListener(
        'contextmenu',
        this.onContextMenuWhileDragging,
        true,
      );
      document.addEventListener('mousemove', this.onMouseMove);
    }
  }

  /**
   * Detect change in distance, starting drag when both
   * delay and distance requirements are met
   * @private
   * @param {Event} event - Mouse move event
   */
  @AutoBind
  protected onDistanceChange(
    event: MouseEvent | {pageX: number; pageY: number},
  ) {
    const {distance = 0} = this.options;

    this.pageX = event.pageX;
    this.pageY = event.pageY;

    if (
      this.currentContainer == null ||
      this.startEvent == null ||
      this.onMouseDownAt == null
    ) {
      return;
    }

    const timeElapsed = Date.now() - this.onMouseDownAt;
    const distanceTravelled =
      euclideanDistance(
        this.startEvent.pageX,
        this.startEvent.pageY,
        event.pageX,
        event.pageY,
      ) || 0;

    if (this.mouseDownTimeout != null) {
      clearTimeout(this.mouseDownTimeout);
    }

    const hasMovedDuringDelay = timeElapsed < this.delay.mouse;

    if (hasMovedDuringDelay) {
      document.removeEventListener('mousemove', this.onDistanceChange);
    } else if (distanceTravelled >= distance) {
      document.removeEventListener('mousemove', this.onDistanceChange);
      this.startDrag();
    }
  }

  /**
   * Mouse move handler
   * @private
   * @param {Event} event - Mouse move event
   */
  @AutoBind
  protected onMouseMove(event: MouseEvent) {
    if (!this.dragging) {
      return;
    }

    if (this.currentContainer == null || this.originalSource == null) {
      return;
    }

    const target = document.elementFromPoint(
      event.clientX,
      event.clientY,
    ) as HTMLElement;

    const dragMoveEvent = new DragMoveSensorEvent({
      clientX: event.clientX,
      clientY: event.clientY,
      target,
      container: this.currentContainer,
      originalSource: this.originalSource,
      originalEvent: event,
    });

    this.trigger(this.currentContainer, dragMoveEvent);
  }

  /**
   * Mouse up handler
   * @private
   * @param {Event} event - Mouse up event
   */
  @AutoBind
  protected onMouseUp(event: MouseEvent) {
    if (this.mouseDownTimeout != null) {
      clearTimeout(this.mouseDownTimeout);
    }

    if (event.button !== 0) {
      return;
    }

    document.removeEventListener('mouseup', this.onMouseUp);
    document.removeEventListener('dragstart', preventNativeDragStart);
    document.removeEventListener('mousemove', this.onDistanceChange);

    if (!this.dragging) {
      return;
    }

    if (this.currentContainer == null || this.originalSource == null) {
      return;
    }

    const target = document.elementFromPoint(
      event.clientX,
      event.clientY,
    ) as HTMLElement;

    const dragStopEvent = new DragStopSensorEvent({
      clientX: event.clientX,
      clientY: event.clientY,
      target,
      container: this.currentContainer,
      originalSource: this.originalSource,
      originalEvent: event,
    });

    this.trigger(this.currentContainer, dragStopEvent);

    document.removeEventListener(
      'contextmenu',
      this.onContextMenuWhileDragging,
      true,
    );
    document.removeEventListener('mousemove', this.onMouseMove);

    this.currentContainer = null;
    this.dragging = false;
    this.startEvent = null;
  }

  /**
   * Context menu handler
   * @private
   * @param {Event} event - Context menu event
   */
  @AutoBind
  protected onContextMenuWhileDragging(event: MouseEvent) {
    event.preventDefault();
  }
}

function preventNativeDragStart(event: DragEvent) {
  event.preventDefault();
}
