import Draggable from './draggable';
import {closest} from './utils';

import {
  DroppableOverEvent,
  DroppableOutEvent,
} from './events/droppable-event';

const classes = {
  'droppable:active': 'draggable-droppable--active',
  'droppable:occupied': 'draggable-droppable--occupied',
};

export default class Droppable {
  constructor(containers = [], options = {}) {
    this.draggable = new Draggable(containers, options);
    this.options = {...options};

    this._onDragStart = this._onDragStart.bind(this);
    this._onDragMove = this._onDragMove.bind(this);
    this._onDragStop = this._onDragStop.bind(this);

    this.draggable
      .on('drag:start', this._onDragStart)
      .on('drag:move', this._onDragMove)
      .on('drag:stop', this._onDragStop);
  }

  destroy() {
    this.draggable
      .off('drag:start', this._onDragStart)
      .off('drag:move', this._onDragMove)
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

  getClassNameFor(name) {
    return this.options.classes[name] || classes[name];
  }

  _onDragStart(event) {
    if (event.canceled()) {
      return;
    }

    this.droppables = this._getDroppables();
    const droppable = event.sensorEvent.target.closest(this.options.droppable);

    if (!droppable) {
      event.cancel();
      return;
    }

    this.initialDroppable = droppable;

    for (const droppableElement of this.droppables) {
      if (droppableElement.classList.contains(this.getClassNameFor('droppable:occupied'))) {
        continue;
      }

      droppableElement.classList.add(this.getClassNameFor('droppable:active'));
    }
  }

  _onDragMove(event) {
    if (event.canceled()) {
      return;
    }

    const droppable = this._closestDroppable(event.sensorEvent.target);
    const overEmptyDroppable = droppable && !droppable.classList.contains(this.getClassNameFor('droppable:occupied'));

    if (overEmptyDroppable && this._drop(event, droppable)) {
      this.lastDroppable = droppable;
    } else if ((!droppable || droppable === this.initialDroppable) && this.lastDroppable) {
      this._release(event);
      this.lastDroppable = null;
    }
  }

  _onDragStop() {
    const occupiedClass = this.getClassNameFor('droppable:occupied');

    for (const droppable of this.droppables) {
      droppable.classList.remove(this.getClassNameFor('droppable:active'));
    }

    if (this.lastDroppable && this.lastDroppable !== this.initialDroppable) {
      this.initialDroppable.classList.remove(occupiedClass);
    }

    this.droppables = null;
    this.lastDroppable = null;
    this.initialDroppable = null;
  }

  _drop(event, droppable) {
    const droppableOverEvent = new DroppableOverEvent({
      dragEvent: event,
      droppable,
    });

    this.draggable.triggerEvent(droppableOverEvent);

    if (droppableOverEvent.canceled()) {
      return false;
    }

    const occupiedClass = this.getClassNameFor('droppable:occupied');

    if (this.lastDroppable) {
      this.lastDroppable.classList.remove(occupiedClass);
    }

    droppable.appendChild(event.source);
    droppable.classList.add(occupiedClass);

    return true;
  }

  _release(event) {
    const droppableOutEvent = new DroppableOutEvent({
      dragEvent: event,
      droppable: this.lastDroppable,
    });

    this.draggable.triggerEvent(droppableOutEvent);

    if (droppableOutEvent.canceled()) {
      return;
    }

    this.initialDroppable.appendChild(event.source);
    this.lastDroppable.classList.remove(this.getClassNameFor('droppable:occupied'));
  }

  _closestDroppable(target) {
    if (!this.droppables) {
      return null;
    }

    return closest(target, (element) => Array.from(this.droppables).includes(element));
  }

  _getDroppables() {
    const droppables = this.options.droppable;

    if (typeof droppables === 'string') {
      return document.querySelectorAll(droppables);
    } else if (droppables instanceof NodeList || droppables instanceof Array) {
      return droppables;
    } else if (typeof droppables === 'function') {
      return droppables();
    } else {
      return [];
    }
  }
}
