import Draggable from './draggable';

import {
  SwappableStartEvent,
  SwappableSwappedEvent,
  SwappableStopEvent,
} from './events/swappable-event';

export default class Swappable {
  constructor(containers = [], options = {}) {
    this.draggable = new Draggable(containers, options);

    this._onDragStart = this._onDragStart.bind(this);
    this._onDragOver = this._onDragOver.bind(this);
    this._onDragStop = this._onDragStop.bind(this);

    this.draggable
      .on('drag:start', this._onDragStart)
      .on('drag:over', this._onDragOver)
      .on('drag:stop', this._onDragStop);
  }

  destroy() {
    this.draggable
      .off('drag:start', this._onDragStart)
      .off('drag:over', this._onDragOver)
      .off('drag:stop', this._onDragStop)
      .destroy();
  }

  on(type, callback) {
    this.draggable.on(type, callback);
    return this;
  }

  off(type, callback) {
    this.draggable.off(type, callback);
    return this;
  }

  _onDragStart(event) {
    const swappableStartEvent = new SwappableStartEvent({
      dragEvent: event,
    });

    this.draggable.triggerEvent(swappableStartEvent);

    if (swappableStartEvent.canceled()) {
      event.cancel();
    }
  }

  _onDragOver(event) {
    if (event.over === event.source) {
      return;
    }

    if (event.canceled()) {
      return;
    }

    if (this.lastOver && this.lastOver !== event.over) {
      swap(this.lastOver, event.source);
    }

    this.lastOver = event.over;

    swap(event.source, event.over);

    // Let this cancel the actual swap
    const swappableSwappedEvent = new SwappableSwappedEvent({
      dragEvent: event,
      swappedElement: event.over,
    });

    this.draggable.triggerEvent(swappableSwappedEvent);
  }

  _onDragStop(event) {
    const swappableStopEvent = new SwappableStopEvent({
      dragEvent: event,
    });

    this.draggable.triggerEvent(swappableStopEvent);
    this.lastOver = null;
  }
}

function withTempElement(callback) {
  const tmpElement = document.createElement('div');
  callback(tmpElement);
  tmpElement.parentNode.removeChild(tmpElement);
}

function swap(source, over) {
  const overParent = over.parentNode;
  const sourceParent = source.parentNode;

  withTempElement((tmpElement) => {
    sourceParent.insertBefore(tmpElement, source);
    overParent.insertBefore(source, over);
    sourceParent.insertBefore(over, tmpElement);
  });
}
