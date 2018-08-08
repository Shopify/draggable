import AbstractPlugin from 'shared/AbstractPlugin';

export const onDragStart = Symbol('onDragStart');
export const onDragOut = Symbol('onDragOut');
export const onDragOutContainer = Symbol('onDragOutContainer');
export const onDragOver = Symbol('onDragOver');
export const onDragOverContainer = Symbol('onDragOverContainer');
export const onDragStop = Symbol('onDragStop');
export const removePlacedClasses = Symbol('removePlacedClasses');

const defaultClasses = {
  'container:dragging': 'draggable-container--is-dragging',
  'source:dragging': 'draggable-source--is-dragging',
  'source:placed': 'draggable-source--placed',
  'container:placed': 'draggable-container--placed',
  'body:dragging': 'draggable--is-dragging',
  'draggable:over': 'draggable--over',
  'container:over': 'draggable-container--over',
  'source:original': 'draggable--original',
  mirror: 'draggable-mirror',
};

const defaultOptions = {
  classes: defaultClasses,
  placedTimeout: 800,
};

/**
 * Styleable plugin
 * @class Styleable
 * @module Styleable
 * @extends AbstractPlugin
 */
export default class Styleable extends AbstractPlugin {
  /**
   * Styleable constructor.
   * @constructs Styleable
   * @param {Draggable} draggable - Draggable instance
   */
  constructor(draggable) {
    super(draggable);

    /**
     * Styleable options
     * @property {Object} options
     * @property {Object} options.classes
     * @property {Number} options.placedTimeout
     * @type {Object}
     */
    this.options = {
      ...defaultOptions,
      ...this.getOptions(),
      classes: {
        ...defaultClasses,
        ...(this.getOptions().classes || {}),
      },
    };

    /**
     * Placed classes timer
     * @property {Number} placedTimeoutID
     */
    this.placedTimeoutID = null;

    this[onDragStart] = this[onDragStart].bind(this);
    this[onDragOut] = this[onDragOut].bind(this);
    this[onDragOutContainer] = this[onDragOutContainer].bind(this);
    this[onDragOver] = this[onDragOver].bind(this);
    this[onDragOut] = this[onDragOut].bind(this);
    this[onDragOverContainer] = this[onDragOverContainer].bind(this);
    this[onDragStop] = this[onDragStop].bind(this);
    this[removePlacedClasses] = this[removePlacedClasses].bind(this);
  }

  /**
   * Attaches listeners to draggable
   */
  attach() {
    this.draggable
      .on('drag:start', this[onDragStart])
      .on('drag:over', this[onDragOver])
      .on('drag:out', this[onDragOut])
      .on('drag:over:container', this[onDragOverContainer])
      .on('drag:out:container', this[onDragOutContainer])
      .on('drag:stop', this[onDragStop]);
  }

  /**
   * Detaches listeners from draggable
   */
  detach() {
    this.draggable
      .off('drag:start', this[onDragStart])
      .off('drag:over', this[onDragOver])
      .off('drag:out', this[onDragOut])
      .off('drag:over:container', this[onDragOverContainer])
      .off('drag:out:container', this[onDragOutContainer])
      .off('drag:stop', this[onDragStop]);
  }

  /**
   * Returns class name for class identifier
   * @param {String} name - Name of class identifier
   * @return {String|null}
   */
  getClassNameFor(name) {
    return this.options.classes[name];
  }

  /**
   * Returns options passed through draggable
   * @return {Object}
   */
  getOptions() {
    return this.draggable.options.styleable || {};
  }

  addRules(rules) {
    this.rules = {
      ...this.rules,
      ...rules,
    };
  }

  removeRules(rules) {
    this.rules = {
      ...this.rules,
      ...rules,
    };
  }

  /**
   * Adds class by class identifier to element
   * @param {HTMLElement} element
   * @param {String} name
   */
  addClass(element, name) {
    const className = this.getClassNameFor(name);

    if (typeof className === 'string') {
      element.classList.add(className);
    } else if (className instanceof Array) {
      element.classList.add(...className);
    } else if (typeof className === 'function') {
      element.classList.add(className());
    }
  }

  /**
   * Removes class by class identifier to element
   * @param {HTMLElement} element
   * @param {String} name
   */
  removeClass(element, name) {
    const className = this.getClassNameFor(name);

    if (typeof className === 'string') {
      element.classList.remove(className);
    } else if (className instanceof Array) {
      element.classList.remove(...className);
    } else if (typeof className === 'function') {
      element.classList.remove(className());
    }
  }

  /**
   * Drag start handler
   * @param {DragStartEvent} dragEvent
   * @private
   */
  [onDragStart](dragEvent) {
    if (dragEvent.canceled()) {
      return;
    }

    clearTimeout(this.placedTimeoutID);
    this[removePlacedClasses]();

    this.addClass(dragEvent.originalSource, 'source:original');
    this.addClass(dragEvent.source, 'source:dragging');
    this.addClass(dragEvent.sourceContainer, 'container:dragging');
    this.addClass(document.body, 'body:dragging');
  }

  /**
   * Drag over handler
   * @param {DragOverEvent} dragEvent
   * @private
   */
  [onDragOver](dragEvent) {
    this.addClass(dragEvent.over, 'draggable:over');
    this.currentlyOver = dragEvent.over;
  }

  /**
   * Drag out handler
   * @param {DragOutEvent} dragEvent
   * @private
   */
  [onDragOut](dragEvent) {
    this.removeClass(dragEvent.over, 'draggable:over');
    this.currentlyOver = null;
  }

  /**
   * Drag over container handler
   * @param {DragOverContainerEvent} dragEvent
   * @private
   */
  [onDragOverContainer](dragEvent) {
    this.addClass(dragEvent.overContainer, 'container:over');
    this.currentlyOverContainer = dragEvent.overContainer;
  }

  /**
   * Drag out container handler
   * @param {DragOutContainerEvent} dragEvent
   * @private
   */
  [onDragOutContainer](dragEvent) {
    this.removeClass(dragEvent.overContainer, 'container:over');
    this.currentlyOverContainer = null;
  }

  /**
   * Drag stop handler
   * @param {DragStopEvent} dragEvent
   * @private
   */
  [onDragStop](dragEvent) {
    this.removeClass(dragEvent.originalSource, 'source:original');
    this.removeClass(dragEvent.source, 'source:dragging');
    this.removeClass(dragEvent.sourceContainer, 'container:dragging');
    this.removeClass(document.body, 'body:dragging');

    if (this.currentlyOver) {
      this.removeClass(this.currentlyOver, 'draggable:over');
      this.currentlyOver = null;
    }

    if (this.currentlyOverContainer) {
      this.removeClass(this.currentlyOverContainer, 'container:over');
      this.currentlyOverContainer = null;
    }

    this.lastPlacedSource = dragEvent.originalSource;
    this.lastPlacedContainer = dragEvent.sourceContainer;

    this.addClass(this.lastPlacedSource, 'source:placed');
    this.addClass(this.lastPlacedContainer, 'container:placed');

    this.placedTimeoutID = setTimeout(this[removePlacedClasses], this.options.placedTimeout);
  }

  /**
   * Removes placed classes
   * @private
   */
  [removePlacedClasses]() {
    if (this.lastPlacedSource) {
      this.removeClass(this.lastPlacedSource, 'source:placed');
      this.lastPlacedSource = null;
    }

    if (this.lastPlacedContainer) {
      this.removeClass(this.lastPlacedContainer, 'container:placed');
      this.lastPlacedContainer = null;
    }
  }
}
