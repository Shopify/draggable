import Sensor from './sensor';
import {closest} from './../utils';

import {
  DragStartSensorEvent,
  DragMoveSensorEvent,
  DragStopSensorEvent,
} from './../events/sensor-event';

export default class DragSensor extends Sensor {
  constructor(containers = [], options = {}) {
    super(containers, options);

    this.dragging = false;
    this.currentContainer = null;

    this._onMouseDown = this._onMouseDown.bind(this);
    this._onMouseUp = this._onMouseUp.bind(this);
    this._onDragStart = this._onDragStart.bind(this);
    this._onDragOver = this._onDragOver.bind(this);
    this._onDragEnd = this._onDragEnd.bind(this);
    this._onDragDrop = this._onDragDrop.bind(this);
  }

  attach() {
    for (const container of this.containers) {
      container.addEventListener('mousedown', this._onMouseDown, true);
      container.addEventListener('dragstart', this._onDragStart, false);
      container.addEventListener('dragover', this._onDragOver, false);
      container.addEventListener('dragend', this._onDragEnd, false);
      container.addEventListener('drop', this._onDragDrop, false);
    }

    document.addEventListener('mouseup', this._onMouseUp, true);
  }

  detach() {
    for (const container of this.containers) {
      container.removeEventListener('mousedown', this._onMouseDown, true);
      container.removeEventListener('dragstart', this._onDragStart, false);
      container.removeEventListener('dragover', this._onDragOver, false);
      container.removeEventListener('dragend', this._onDragEnd, false);
      container.removeEventListener('drop', this._onDragDrop, false);
    }

    document.removeEventListener('mouseup', this._onMouseUp, true);
  }

  // private

  _onDragStart(event) {
    // Need for firefox. "text" key is needed for IE
    event.dataTransfer.setData('text', '');
    event.dataTransfer.effectAllowed = this.options.type;

    const target = document.elementFromPoint(event.clientX, event.clientY);
    this.currentContainer = event.currentTarget;

    const dragStartEvent = new DragStartSensorEvent({
      clientX: event.clientX,
      clientY: event.clientY,
      target,
      container: this.currentContainer,
      originalEvent: event,
    });

    this.trigger(this.currentContainer, dragStartEvent);

    if (dragStartEvent.canceled()) {
      this.dragging = false;
      // prevent drag event if fired event has been prevented
      event.preventDefault();
    } else {
      this.dragging = true;
    }
  }

  _onDragOver(event) {
    if (!this.dragging) {
      return;
    }

    const target = document.elementFromPoint(event.clientX, event.clientY);
    const container = event.currentTarget;

    const dragMoveEvent = new DragMoveSensorEvent({
      clientX: event.clientX,
      clientY: event.clientY,
      target,
      container: this.currentContainer,
      overContainer: container,
      originalEvent: event,
    });

    this.trigger(container, dragMoveEvent);

    // event.preventDefault();
    // event.dataTransfer.dropEffect = 'copy';

    if (!dragMoveEvent.canceled()) {
      event.preventDefault();
      // event.dataTransfer.dropEffect = this.options.type;
    }
  }

  _onDragEnd(event) {
    if (!this.dragging) {
      return;
    }

    // prevent click on drop if draggable contains a clickable element
    event.preventDefault();

    const container = event.currentTarget;

    const dragStopEvent = new DragStopSensorEvent({
      clientX: event.clientX,
      clientY: event.clientY,
      originalEvent: event,
      container,
    });

    this.trigger(container, dragStopEvent);

    this.dragging = false;
  }

  _onDragDrop(event) { // eslint-disable-line class-methods-use-this
    event.preventDefault();
  }

  _onMouseDown(event) {
    // Firefox bug for inputs within draggables https://bugzilla.mozilla.org/show_bug.cgi?id=739071
    if ((event.target && (event.target.form || event.target.contenteditable))) {
      return;
    }

    const target = closest(event.target, this.options.draggable);

    if (target) {
      clearTimeout(this.mouseDownTimeout);

      this.mouseDownTimeout = setTimeout(() => {
        target.draggable = true;
      }, this.options.delay);
    }
  }

  _onMouseUp(event) {
    clearTimeout(this.mouseDownTimeout);

    const target = closest(event.target, this.options.draggable);

    if (target) {
      target.draggable = false;
    }
  }
}
