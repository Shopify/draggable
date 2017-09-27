import Sensor from './sensor';

import {
  DragStartSensorEvent,
  DragMoveSensorEvent,
  DragStopSensorEvent,
} from './../events/sensor-event';

export default class MouseSensor extends Sensor {
  constructor(containers = [], options = {}) {
    super(containers, options);

    this.dragging = false;
    this.mouseDown = false;
    this.currentContainer = null;

    this._onMouseDown = this._onMouseDown.bind(this);
    this._onMouseMove = this._onMouseMove.bind(this);
    this._onMouseUp = this._onMouseUp.bind(this);
  }

  attach() {
    for (const container of this.containers) {
      container.addEventListener('mousedown', this._onMouseDown, true);
    }

    document.addEventListener('mousemove', this._onMouseMove);
    document.addEventListener('mouseup', this._onMouseUp);
  }

  detach() {
    for (const container of this.containers) {
      container.removeEventListener('mousedown', this._onMouseDown, true);
    }

    document.removeEventListener('mousemove', this._onMouseMove);
    document.removeEventListener('mouseup', this._onMouseUp);
  }

  _onMouseDown(event) {
    if (event.button === 2) {
      return;
    }

    this.mouseDown = true;
    const target = document.elementFromPoint(event.clientX, event.clientY);
    const container = event.currentTarget;

    clearTimeout(this.mouseDownTimeout);
    this.mouseDownTimeout = setTimeout(() => {
      if (!this.mouseDown) {
        return;
      }

      const dragStartEvent = new DragStartSensorEvent({
        clientX: event.clientX,
        clientY: event.clientY,
        target,
        container,
        originalEvent: event,
      });

      this.trigger(container, dragStartEvent);

      this.currentContainer = container;
      this.dragging = !dragStartEvent.canceled();
    }, this.options.delay);
  }

  _onMouseMove(event) {
    if (!this.dragging) {
      return;
    }

    const target = document.elementFromPoint(event.clientX, event.clientY);

    const dragMoveEvent = new DragMoveSensorEvent({
      clientX: event.clientX,
      clientY: event.clientY,
      target,
      container: this.currentContainer,
      originalEvent: event,
    });

    this.trigger(this.currentContainer, dragMoveEvent);
  }

  _onMouseUp(event) {
    this.mouseDown = false;

    if (!this.dragging) {
      return;
    }

    const target = document.elementFromPoint(event.clientX, event.clientY);

    const dragStopEvent = new DragStopSensorEvent({
      clientX: event.clientX,
      clientY: event.clientY,
      target,
      container: this.currentContainer,
      originalEvent: event,
    });

    this.trigger(this.currentContainer, dragStopEvent);

    this.currentContainer = null;
    this.dragging = false;
  }
}
