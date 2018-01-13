import {closest} from 'shared/utils';

export const onDragStart = Symbol('onDragStart');
export const onDragMove = Symbol('onDragMove');
export const onDragStop = Symbol('onDragStop');
export const scroll = Symbol('scroll');

/**
 * AutoScroll default options
 * @property {Object} defaultOptions
 * @property {Number} defaultOptions.speed
 * @property {Number} defaultOptions.sensitivity
 * @type {Object}
 */
export const defaultOptions = {
  speed: 10,
  sensitivity: 30,
};

/**
 * AutoScroll plugin which scrolls the closest scrollable parent
 * @class AutoScroll
 * @module AutoScroll
 */
export default class AutoScroll {

  /**
   * AutoScroll constructor.
   * @constructs AutoScroll
   * @param {Draggable} draggable - Draggable instance
   */
  constructor(draggable) {

    /**
     * Draggable instance
     * @property draggable
     * @type {Draggable}
     */
    this.draggable = draggable;

    /**
     * AutoScroll options
     * @property {Object} options
     * @property {Number} options.speed
     * @property {Number} options.sensitivity
     * @type {Object}
     */
    this.options = {
      ...defaultOptions,
      ...this.getOptions(),
    };

    /**
     * Keeps current mouse position
     * @property {Object} currentMousePosition
     * @property {Number} currentMousePosition.clientX
     * @property {Number} currentMousePosition.clientY
     * @type {Object|null}
     */
    this.currentMousePosition = null;

    /**
     * Scroll animation frame
     * @property scrollAnimationFrame
     * @type {Number|null}
     */
    this.scrollAnimationFrame = null;

    /**
     * Closest scrollable element
     * @property scrollableElement
     * @type {HTMLElement|null}
     */
    this.scrollableElement = null;

    /**
     * Animation frame looking for the closest scrollable element
     * @property findScrollableElementFrame
     * @type {Number|null}
     */
    this.findScrollableElementFrame = null;

    this[onDragStart] = this[onDragStart].bind(this);
    this[onDragMove] = this[onDragMove].bind(this);
    this[onDragStop] = this[onDragStop].bind(this);
    this[scroll] = this[scroll].bind(this);
  }

  /**
   * Attaches plugins event listeners
   */
  attach() {
    this.draggable
      .on('drag:start', this[onDragStart])
      .on('drag:move', this[onDragMove])
      .on('drag:stop', this[onDragStop]);
  }

  /**
   * Detaches plugins event listeners
   */
  detach() {
    this.draggable
      .off('drag:start', this[onDragStart])
      .off('drag:move', this[onDragMove])
      .off('drag:stop', this[onDragStop]);
  }

  /**
   * Returns options passed through draggable
   * @return {Object}
   */
  getOptions() {
    return this.draggable.options.autoScroll || {};
  }

  /**
   * Drag start handler. Finds closest scrollable parent in separate frame
   * @private
   */
  [onDragStart](dragEvent) {
    this.findScrollableElementFrame = requestAnimationFrame(() => {
      this.scrollableElement = closestScrollableElement(dragEvent.source);
    });
  }

  /**
   * Drag move handler. Remembers mouse position and initiates scrolling
   * @private
   */
  [onDragMove](dragEvent) {
    this.findScrollableElementFrame = requestAnimationFrame(() => {
      this.scrollableElement = closestScrollableElement(dragEvent.sensorEvent.target);
    });

    if (!this.scrollableElement) {
      return;
    }

    const sensorEvent = dragEvent.sensorEvent;

    this.currentMousePosition = {
      clientX: sensorEvent.clientX,
      clientY: sensorEvent.clientY,
    };

    this.scrollAnimationFrame = requestAnimationFrame(this[scroll]);
  }

  /**
   * Drag stop handler. Cancels scroll animations and resets state
   * @private
   */
  [onDragStop]() {
    cancelAnimationFrame(this.scrollAnimationFrame);
    cancelAnimationFrame(this.findScrollableElementFrame);

    this.scrollableElement = null;
    this.scrollAnimationFrame = null;
    this.findScrollableElementFrame = null;
    this.currentMousePosition = null;
  }

  /**
   * Scroll function that does the heavylifting
   * @private
   */
  [scroll]() {
    if (!this.scrollableElement) {
      return;
    }

    cancelAnimationFrame(this.scrollAnimationFrame);

    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    const rect = this.scrollableElement.getBoundingClientRect();

    let offsetY = (Math.abs(rect.bottom - this.currentMousePosition.clientY) <= this.options.sensitivity) - (Math.abs(rect.top - this.currentMousePosition.clientY) <= this.options.sensitivity);
    let offsetX = (Math.abs(rect.right - this.currentMousePosition.clientX) <= this.options.sensitivity) - (Math.abs(rect.left - this.currentMousePosition.clientX) <= this.options.sensitivity);

    if (!offsetX && !offsetY) {
      offsetX = (windowWidth - this.currentMousePosition.clientX <= this.options.sensitivity) - (this.currentMousePosition.clientX <= this.options.sensitivity);
      offsetY = (windowHeight - this.currentMousePosition.clientY <= this.options.sensitivity) - (this.currentMousePosition.clientY <= this.options.sensitivity);
    }

    this.scrollableElement.scrollTop += offsetY * this.options.speed;
    this.scrollableElement.scrollLeft += offsetX * this.options.speed;

    this.scrollAnimationFrame = requestAnimationFrame(this[scroll]);
  }
}

/**
 * Checks if element has overflow
 * @param {HTMLElement} element
 * @return {Boolean}
 * @private
 */
function hasOverflow(element) {
  const overflowRegex = /(auto|scroll)/;
  const computedStyles = getComputedStyle(element, null);

  const overflow = computedStyles.getPropertyValue('overflow') +
                   computedStyles.getPropertyValue('overflow-y') +
                   computedStyles.getPropertyValue('overflow-x');

  return overflowRegex.test(overflow);
}

/**
 * Finds closest scrollable element
 * @param {HTMLElement} element
 * @return {HTMLElement}
 * @private
 */
function closestScrollableElement(element) {
  const scrollableElement = closest(element, (currentElement) => hasOverflow(currentElement));

  return scrollableElement || document.scrollingElement || document.documentElement || null;
}
