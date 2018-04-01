/**
 * All draggable plugins inherit from this class.
 * @abstract
 * @class AbstractPlugin
 * @module AbstractPlugin
 */
export default class AbstractPlugin {
  /**
   * AbstractPlugin constructor.
   * @constructs AbstractPlugin
   * @param {Draggable} draggable - Draggable instance
   */
  constructor(draggable) {
    /**
     * Draggable instance
     * @property draggable
     * @type {Draggable}
     */
    this.draggable = draggable;
  }

  /**
   * Override to add listeners
   * @abstract
   */
  attach() {
    throw new Error('[Draggable] Not Implemented');
  }

  /**
   * Override to remove listeners
   * @abstract
   */
  detach() {
    throw new Error('[Draggable] Not Implemented');
  }

  setOptions(options) {
    this.options = {
      ...this.getOptions(),
      ...options,
    };
  }

  getOptions() {
    return this.options;
  }
}
