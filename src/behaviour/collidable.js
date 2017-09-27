import {closest} from './../utils';

import {
  CollidableInEvent,
  CollidableOutEvent,
} from './../events/collidable-event';

export default class Collidable {
  constructor(draggable) {
    this.draggable = draggable;

    this._onDragMove = this._onDragMove.bind(this);
    this._onDragStop = this._onDragStop.bind(this);
    this._onRequestAnimationFrame = this._onRequestAnimationFrame.bind(this);
  }

  attach() {
    this.draggable.on('drag:move', this._onDragMove);
    this.draggable.on('drag:stop', this._onDragStop);
  }

  detach() {
    this.draggable.off('drag:move', this._onDragMove);
    this.draggable.off('drag:stop', this._onDragStop);
  }

  _onDragMove(event) {
    const target = event.sensorEvent.target;

    this.currentAnimationFrame = requestAnimationFrame(this._onRequestAnimationFrame(target));

    if (this.currentlyCollidingElement) {
      event.cancel();
    }

    const collidableInEvent = new CollidableInEvent({
      dragEvent: event,
      collidingElement: this.currentlyCollidingElement,
    });

    const collidableOutEvent = new CollidableOutEvent({
      dragEvent: event,
      collidingElement: this.lastCollidingElement,
    });

    const enteringCollidable = Boolean(this.currentlyCollidingElement && this.lastCollidingElement !== this.currentlyCollidingElement);
    const leavingCollidable = Boolean(!this.currentlyCollidingElement && this.lastCollidingElement);

    if (enteringCollidable) {
      if (this.lastCollidingElement) {
        this.draggable.triggerEvent(collidableOutEvent);
      }

      this.draggable.triggerEvent(collidableInEvent);
    } else if (leavingCollidable) {
      this.draggable.triggerEvent(collidableOutEvent);
    }

    this.lastCollidingElement = this.currentlyCollidingElement;
  }

  _onDragStop(event) {
    const lastCollidingElement = this.currentlyCollidingElement || this.lastCollidingElement;
    const collidableOutEvent = new CollidableOutEvent({
      dragEvent: event,
      collidingElement: lastCollidingElement,
    });

    if (lastCollidingElement) {
      this.draggable.triggerEvent(collidableOutEvent);
    }

    this.lastCollidingElement = null;
    this.currentlyCollidingElement = null;
  }

  _onRequestAnimationFrame(target) {
    return () => {
      const collidables = this._getCollidables();
      this.currentlyCollidingElement = closest(target, (element) => collidables.includes(element));
    };
  }

  _getCollidables() {
    const collidables = this.draggable.options.collidables;

    if (typeof collidables === 'string') {
      return Array.prototype.slice.call(document.querySelectorAll(collidables));
    } else if (collidables instanceof NodeList || collidables instanceof Array) {
      return Array.prototype.slice.call(collidables);
    } else if (collidables instanceof HTMLElement) {
      return [collidables];
    } else if (typeof collidables === 'function') {
      return collidables();
    } else {
      return [];
    }
  }
}
