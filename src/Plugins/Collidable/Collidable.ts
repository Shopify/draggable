import { DragMoveEvent, DragStopEvent } from '../../Draggable';
import AbstractPlugin from '../../shared/AbstractPlugin';
import { closest } from '../../shared/utils';
import { CollidableInEvent, CollidableOutEvent } from './CollidableEvent';

const onDragMove = Symbol('onDragMove');
const onDragStop = Symbol('onDragStop');
const onRequestAnimationFrame = Symbol('onRequestAnimationFrame');

/**
 * Collidable plugin which detects colliding elements while dragging
 * @class Collidable
 * @module Collidable
 * @extends AbstractPlugin
 */
export default class Collidable extends AbstractPlugin {
  /*** Keeps track of currently colliding elements */
  currentlyCollidingElement: HTMLElement | null = null;
  /*** Keeps track of currently colliding elements */
  lastCollidingElement: HTMLElement | null = null;
  /*** Animation frame for finding colliding elements */
  currentAnimationFrame: number | null = null;

  /**
   * Attaches plugins event listeners
   */
  attach() {
    this.draggable
      .on('drag:move', this[onDragMove])
      .on('drag:stop', this[onDragStop]);
  }

  /**
   * Detaches plugins event listeners
   */
  detach() {
    this.draggable
      .off('drag:move', this[onDragMove])
      .off('drag:stop', this[onDragStop]);
  }

  /*** Returns current collidables based on `collidables` option */
  getCollidables(): Element[] {
    const collidables = this.draggable.options.collidables;

    if (typeof collidables === 'string') {
      return Array.prototype.slice.call(document.querySelectorAll(collidables));
    } else if (
      collidables instanceof NodeList ||
      collidables instanceof Array
    ) {
      return Array.prototype.slice.call(collidables);
    } else if (collidables instanceof HTMLElement) {
      return [collidables];
    } else if (typeof collidables === 'function') {
      return collidables();
    } else {
      return [];
    }
  }

  /*** Drag move handler */
  private [onDragMove] = (event: DragMoveEvent) => {
    const target = event.sensorEvent.target;

    this.currentAnimationFrame = requestAnimationFrame(
      this[onRequestAnimationFrame](target)
    );

    if (this.currentlyCollidingElement) event.preventDefault();

    const collidableInEvent = new CollidableInEvent({
      dragEvent: event,
      collidingElement: this.currentlyCollidingElement,
    });

    const collidableOutEvent = new CollidableOutEvent({
      dragEvent: event,
      collidingElement: this.lastCollidingElement,
    });

    const enteringCollidable = Boolean(
      this.currentlyCollidingElement &&
        this.lastCollidingElement !== this.currentlyCollidingElement
    );
    const leavingCollidable = Boolean(
      !this.currentlyCollidingElement && this.lastCollidingElement
    );

    if (enteringCollidable) {
      if (this.lastCollidingElement) {
        this.draggable.trigger(collidableOutEvent);
      }

      this.draggable.trigger(collidableInEvent);
    } else if (leavingCollidable) {
      this.draggable.trigger(collidableOutEvent);
    }

    this.lastCollidingElement = this.currentlyCollidingElement;
  };

  /*** Drag stop handler */
  private [onDragStop] = (event: DragStopEvent) => {
    const lastCollidingElement =
      this.currentlyCollidingElement || this.lastCollidingElement;
    const collidableOutEvent = new CollidableOutEvent({
      dragEvent: event,
      collidingElement: lastCollidingElement,
    });

    if (lastCollidingElement) this.draggable.trigger(collidableOutEvent);

    this.lastCollidingElement = null;
    this.currentlyCollidingElement = null;
  };

  /*** Animation frame function */
  private [onRequestAnimationFrame] = (target: HTMLElement) => {
    return () => {
      const collidables = this.getCollidables();
      this.currentlyCollidingElement = closest(target, (element) =>
        collidables.includes(element)
      );
    };
  };
}
