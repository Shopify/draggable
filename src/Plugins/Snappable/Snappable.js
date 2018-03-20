import AbstractPlugin from 'shared/AbstractPlugin';
import {SnapInEvent, SnapOutEvent} from './SnappableEvent';

const onDragStart = Symbol('onDragStart');
const onDragStop = Symbol('onDragStop');
const onDragOver = Symbol('onDragOver');
const onDragOut = Symbol('onDragOut');

/**
 * Snappable plugin which snaps draggable elements into place
 * @class Snappable
 * @module Snappable
 * @extends AbstractPlugin
 */
export default class Snappable extends AbstractPlugin {
  /**
   * Snappable constructor.
   * @constructs Snappable
   * @param {Draggable} draggable - Draggable instance
   */
  constructor(draggable) {
    super(draggable);

    /**
     * Keeps track of the first source element
     * @property {HTMLElement|null} firstSource
     * @type {HTMLElement|null}
     */
    this.firstSource = null;

    this[onDragStart] = this[onDragStart].bind(this);
    this[onDragStop] = this[onDragStop].bind(this);
    this[onDragOver] = this[onDragOver].bind(this);
    this[onDragOut] = this[onDragOut].bind(this);
  }

  /**
   * Attaches plugins event listeners
   */
  attach() {
    this.draggable
      .on('drag:start', this[onDragStart])
      .on('drag:stop', this[onDragStop])
      .on('drag:over', this[onDragOver])
      .on('drag:out', this[onDragOut])
      .on('droppable:over', this[onDragOver])
      .on('droppable:out', this[onDragOut]);
  }

  /**
   * Detaches plugins event listeners
   */
  detach() {
    this.draggable
      .off('drag:start', this[onDragStart])
      .off('drag:stop', this[onDragStop])
      .off('drag:over', this[onDragOver])
      .off('drag:out', this[onDragOut])
      .off('droppable:over', this[onDragOver])
      .off('droppable:out', this[onDragOut]);
  }

  /**
   * Drag start handler
   * @private
   * @param {DragStartEvent} event - Drag start event
   */
  [onDragStart](event) {
    if (event.canceled()) {
      return;
    }

    this.firstSource = event.source;
  }

  /**
   * Drag stop handler
   * @private
   * @param {DragStopEvent} event - Drag stop event
   */
  [onDragStop]() {
    this.firstSource = null;
  }

  /**
   * Drag over handler
   * @private
   * @param {DragOverEvent|DroppableOverEvent} event - Drag over event
   */
  [onDragOver](event) {
    if (event.canceled()) {
      return;
    }

    const source = event.source || event.dragEvent.source;
    const mirror = event.mirror || event.dragEvent.mirror;

    if (source === this.firstSource) {
      this.firstSource = null;
      return;
    }

    const snapInEvent = new SnapInEvent({
      dragEvent: event,
      snappable: event.over || event.droppable,
    });

    this.draggable.trigger(snapInEvent);

    if (snapInEvent.canceled()) {
      return;
    }

    if (mirror) {
      mirror.style.display = 'none';
    }

    source.classList.remove(this.draggable.getClassNameFor('source:dragging'));
    source.classList.add(this.draggable.getClassNameFor('source:placed'));

    // Need to cancel this in drag out
    setTimeout(() => {
      source.classList.remove(this.draggable.getClassNameFor('source:placed'));
    }, this.draggable.options.placedTimeout);
  }

  /**
   * Drag out handler
   * @private
   * @param {DragOutEvent|DroppableOutEvent} event - Drag out event
   */
  [onDragOut](event) {
    if (event.canceled()) {
      return;
    }

    const mirror = event.mirror || event.dragEvent.mirror;
    const source = event.source || event.dragEvent.source;

    const snapOutEvent = new SnapOutEvent({
      dragEvent: event,
      snappable: event.over || event.droppable,
    });

    this.draggable.trigger(snapOutEvent);

    if (snapOutEvent.canceled()) {
      return;
    }

    if (mirror) {
      mirror.style.display = '';
    }

    source.classList.add(this.draggable.getClassNameFor('source:dragging'));
  }
}
