import Sensor from './sensor';

import {
  DragStartSensorEvent,
  DragMoveSensorEvent,
  DragStopSensorEvent,
  DragPressureSensorEvent,
} from './../events/sensor-event';

export default class ForceTouchSensor extends Sensor {
  constructor(containers = [], options = {}) {
    super(containers, options);

    this.dragging = false;
    this.mightDrag = false;
    this.currentContainer = null;

    this._onMouseForceWillBegin = this._onMouseForceWillBegin.bind(this);
    this._onMouseForceDown = this._onMouseForceDown.bind(this);
    this._onMouseDown = this._onMouseDown.bind(this);
    this._onMouseForceChange = this._onMouseForceChange.bind(this);
    this._onMouseMove = this._onMouseMove.bind(this);
    this._onMouseUp = this._onMouseUp.bind(this);
  }

  attach() {
    for (const container of this.containers) {
      container.addEventListener('webkitmouseforcewillbegin', this._onMouseForceWillBegin, false);
      container.addEventListener('webkitmouseforcedown', this._onMouseForceDown, false);
      container.addEventListener('mousedown', this._onMouseDown, true);
      container.addEventListener('webkitmouseforcechanged', this._onMouseForceChange, false);
    }

    document.addEventListener('mousemove', this._onMouseMove);
    document.addEventListener('mouseup', this._onMouseUp);
  }

  detach() {
    for (const container of this.containers) {
      container.removeEventListener('webkitmouseforcewillbegin', this._onMouseForceWillBegin, false);
      container.removeEventListener('webkitmouseforcedown', this._onMouseForceDown, false);
      container.removeEventListener('mousedown', this._onMouseDown, true);
      container.removeEventListener('webkitmouseforcechanged', this._onMouseForceChange, false);
    }

    document.removeEventListener('mousemove', this._onMouseMove);
    document.removeEventListener('mouseup', this._onMouseUp);
  }

  _onMouseForceWillBegin(event) {
    event.preventDefault();
    this.mightDrag = true;
  }

  _onMouseForceDown(event) {
    if (this.dragging) {
      return;
    }

    const target = document.elementFromPoint(event.clientX, event.clientY);
    const container = event.currentTarget;

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
    this.mightDrag = false;
  }

  _onMouseUp(event) {
    if (!this.dragging) {
      return;
    }

    const dragStopEvent = new DragStopSensorEvent({
      clientX: event.clientX,
      clientY: event.clientY,
      target: null,
      container: this.currentContainer,
      originalEvent: event,
    });

    this.trigger(this.currentContainer, dragStopEvent);

    this.currentContainer = null;
    this.dragging = false;
    this.mightDrag = false;
  }

  _onMouseDown(event) {
    if (!this.mightDrag) {
      return;
    }

    // Need workaround for real click
    // Cancel potential drag events
    event.stopPropagation();
    event.stopImmediatePropagation();
    event.preventDefault();
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

  _onMouseForceChange(event) {
    if (this.dragging) {
      return;
    }

    const target = event.target;
    const container = event.currentTarget;

    const dragPressureEvent = new DragPressureSensorEvent({
      pressure: event.webkitForce,
      clientX: event.clientX,
      clientY: event.clientY,
      target,
      container,
      originalEvent: event,
    });

    this.trigger(container, dragPressureEvent);
  }

  _onMouseForceGlobalChange(event) {
    if (!this.dragging) {
      return;
    }

    const target = event.target;

    const dragPressureEvent = new DragPressureSensorEvent({
      pressure: event.webkitForce,
      clientX: event.clientX,
      clientY: event.clientY,
      target,
      container: this.currentContainer,
      originalEvent: event,
    });

    this.trigger(this.currentContainer, dragPressureEvent);
  }
}
