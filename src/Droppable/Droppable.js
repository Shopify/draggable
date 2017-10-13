import {closest} from 'shared/utils';
import Draggable from './../Draggable';

import {
  DroppableOverEvent,
  DroppableOutEvent,
} from './DroppableEvent';

const onDragStart = Symbol('onDragStart');
const onDragMove = Symbol('onDragMove');
const onDragStop = Symbol('onDragStop');
const drop = Symbol('drop');
const release = Symbol('release');
const closestDroppable = Symbol('closestDroppable');
const getDroppables = Symbol('getDroppables');

const classes = {
  'droppable:active': 'draggable-droppable--active',
  'droppable:occupied': 'draggable-droppable--occupied',
};

const defaults = {
  droppable: '.draggable-droppable',
};

/**
 * Droppable is built on top of Draggable and allows dropping draggable elements
 * into droppable element
 * @class Droppable
 * @module Droppable
 * @extends Draggable
 */
export default class Droppable extends Draggable {

  /**
   * Droppable constructor.
   * @constructs Droppable
   * @param {HTMLElement[]|NodeList|HTMLElement} containers - Droppable containers
   * @param {Object} options - Options for Droppable
   */
  constructor(containers = [], options = {}) {
    super(containers, options);

    this.options = {...defaults, ...this.options};

    /**
     * All droppable elements on drag start
     * @property droppables
     * @type {HTMLElement[]}
     */
    this.droppables = null;

    /**
     * Last droppable element that the source was dropped into
     * @property lastDroppable
     * @type {HTMLElement}
     */
    this.lastDroppable = null;

    /**
     * Initial droppable element that the source was drag from
     * @property initialDroppable
     * @type {HTMLElement}
     */
    this.initialDroppable = null;

    this[onDragStart] = this[onDragStart].bind(this);
    this[onDragMove] = this[onDragMove].bind(this);
    this[onDragStop] = this[onDragStop].bind(this);

    this
      .on('drag:start', this[onDragStart])
      .on('drag:move', this[onDragMove])
      .on('drag:stop', this[onDragStop]);
  }

  /**
   * Destroys Droppable instance.
   */
  destroy() {
    super.destroy();

    this
      .off('drag:start', this[onDragStart])
      .off('drag:move', this[onDragMove])
      .off('drag:stop', this[onDragStop]);
  }

  /**
   * Returns class name for class identifier
   * @param {String} name - Name of class identifier
   * @return {String|null}
   */
  getClassNameFor(name) {
    return super.getClassNameFor(name) || classes[name];
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

    this.droppables = [...this[getDroppables]()];
    const droppable = closest(event.sensorEvent.target, this.options.droppable);

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

  /**
   * Drag move handler
   * @private
   * @param {DragMoveEvent} event - Drag move event
   */
  [onDragMove](event) {
    if (event.canceled()) {
      return;
    }

    const droppable = this[closestDroppable](event.sensorEvent.target);
    const overEmptyDroppable = droppable && !droppable.classList.contains(this.getClassNameFor('droppable:occupied'));

    if (overEmptyDroppable && this[drop](event, droppable)) {
      this.lastDroppable = droppable;
    } else if ((!droppable || droppable === this.initialDroppable) && this.lastDroppable) {
      this[release](event);
      this.lastDroppable = null;
    }
  }

  /**
   * Drag stop handler
   * @private
   * @param {DragStopEvent} event - Drag stop event
   */
  [onDragStop]() {
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

  /**
   * Drop method drops a draggable element into a droppable element
   * @private
   * @param {DragMoveEvent} event - Drag move event
   * @param {HTMLElement} droppable - Droppable element to drop draggable into
   */
  [drop](event, droppable) {
    const droppableOverEvent = new DroppableOverEvent({
      dragEvent: event,
      droppable,
    });

    this.trigger(droppableOverEvent);

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

  /**
   * Release method moves the previously dropped element back into its original position
   * @private
   * @param {DragMoveEvent} event - Drag move event
   */
  [release](event) {
    const droppableOutEvent = new DroppableOutEvent({
      dragEvent: event,
      droppable: this.lastDroppable,
    });

    this.trigger(droppableOutEvent);

    if (droppableOutEvent.canceled()) {
      return;
    }

    this.initialDroppable.appendChild(event.source);
    this.lastDroppable.classList.remove(this.getClassNameFor('droppable:occupied'));
  }

  /**
   * Returns closest droppable element for even target
   * @private
   * @param {HTMLElement} target - Event target
   * @return {HTMLElement|null}
   */
  [closestDroppable](target) {
    if (!this.droppables) {
      return null;
    }

    return closest(target, (element) => this.droppables.includes(element));
  }

  /**
   * Returns all current droppable elements for this draggable instance
   * @private
   * @return {NodeList|HTMLElement[]|Array}
   */
  [getDroppables]() {
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
