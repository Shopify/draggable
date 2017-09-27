import Sensor from './sensor';
import {closest} from './../utils';

import {
  DragStartSensorEvent,
  DragMoveSensorEvent,
  DragStopSensorEvent,
} from './../events/sensor-event';

export default class TouchSensor extends Sensor {
  constructor(containers = [], options = {}) {
    super(containers, options);

    this.dragging = false;
    this.currentContainer = null;
    this.currentScrollableParent = null;

    this._onTouchStart = this._onTouchStart.bind(this);
    this._onTouchHold = this._onTouchHold.bind(this);
    this._onTouchEnd = this._onTouchEnd.bind(this);
    this._onTouchMove = this._onTouchMove.bind(this);
    this._onScroll = this._onScroll.bind(this);
  }

  attach() {
    for (const container of this.containers) {
      container.addEventListener('touchstart', this._onTouchStart, false);
    }

    document.addEventListener('touchend', this._onTouchEnd, false);
    document.addEventListener('touchcancel', this._onTouchEnd, false);
    document.addEventListener('touchmove', this._onTouchMove, false);
  }

  detach() {
    for (const container of this.containers) {
      container.removeEventListener('touchstart', this._onTouchStart, false);
    }

    document.removeEventListener('touchend', this._onTouchEnd, false);
    document.removeEventListener('touchcancel', this._onTouchEnd, false);
    document.removeEventListener('touchmove', this._onTouchMove, false);
  }

  _onScroll() {
    // Cancel potential drag and allow scroll on iOS or other touch devices
    clearTimeout(this.tapTimeout);
  }

  _onTouchStart(event) {
    event.preventDefault();
    const container = event.currentTarget;

    // detect if body is scrolling on iOS
    document.addEventListener('scroll', this._onScroll);
    container.addEventListener('contextmenu', _onContextMenu);

    this.currentScrollableParent = closest(container, (element) => element.offsetHeight < element.scrollHeight);

    if (this.currentScrollableParent) {
      this.currentScrollableParent.addEventListener('scroll', this._onScroll);
    }

    this.tapTimeout = setTimeout(this._onTouchHold(event, container), this.options.delay);
  }

  _onTouchHold(event, container) {
    return () => {
      const touch = event.touches[0] || event.changedTouches[0];
      const target = event.target;

      const dragStartEvent = new DragStartSensorEvent({
        clientX: touch.pageX,
        clientY: touch.pageY,
        target,
        container,
        originalEvent: event,
      });

      this.trigger(container, dragStartEvent);

      this.currentContainer = container;
      this.dragging = !dragStartEvent.canceled();
    };
  }

  _onTouchMove(event) {
    if (!this.dragging) {
      return;
    }

    event.stopPropagation();

    const touch = event.touches[0] || event.changedTouches[0];
    const target = document.elementFromPoint(touch.pageX - window.scrollX, touch.pageY - window.scrollY);

    const dragMoveEvent = new DragMoveSensorEvent({
      clientX: touch.pageX,
      clientY: touch.pageY,
      target,
      container: this.currentContainer,
      originalEvent: event,
    });

    this.trigger(this.currentContainer, dragMoveEvent);
  }

  _onTouchEnd(event) {
    const container = event.currentTarget;

    document.removeEventListener('scroll', this._onScroll);
    container.removeEventListener('contextmenu', _onContextMenu);

    if (this.currentScrollableParent) {
      this.currentScrollableParent.removeEventListener('scroll', this._onScroll);
    }

    clearTimeout(this.tapTimeout);

    if (!this.dragging) {
      return;
    }

    const touch = event.touches[0] || event.changedTouches[0];

    event.preventDefault();

    const dragStopEvent = new DragStopSensorEvent({
      clientX: touch.pageX,
      clientY: touch.pageY,
      target: null,
      container: this.currentContainer,
      originalEvent: event,
    });

    this.trigger(this.currentContainer, dragStopEvent);

    this.currentContainer = null;
    this.dragging = false;
  }
}

function _onContextMenu(event) {
  event.preventDefault();
}
