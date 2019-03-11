import AbstractPlugin from 'shared/AbstractPlugin';

const onSortableSorted = Symbol('onSortableSorted');

/**
 * SwapAnimation default options
 * @property {Object} defaultOptions
 * @property {Number} defaultOptions.duration
 * @property {String} defaultOptions.easingFunction
 * @property {Boolean} defaultOptions.horizontal
 * @type {Object}
 */
export const defaultOptions = {
  duration: 150,
  easingFunction: 'ease-in-out',
};

/**
 * SwapAnimation plugin adds swap animations for sortable
 * @class SwapAnimation
 * @module SwapAnimation
 * @extends AbstractPlugin
 */
export default class SwapAnimation extends AbstractPlugin {
  /**
   * SwapAnimation constructor.
   * @constructs SwapAnimation
   * @param {Draggable} draggable - Draggable instance
   */
  constructor(draggable) {
    super(draggable);

    /**
     * SwapAnimation options
     * @property {Object} options
     * @property {Number} defaultOptions.duration
     * @property {String} defaultOptions.easingFunction
     * @type {Object}
     */
    this.options = {
      ...defaultOptions,
      ...this.getOptions(),
    };

    /**
     * Last animation frame
     * @property {Number} lastAnimationFrame
     * @type {Number}
     */
    this.lastAnimationFrame = null;

    this[onSortableSorted] = this[onSortableSorted].bind(this);
  }

  /**
   * Attaches plugins event listeners
   */
  attach() {
    this.draggable.on('sortable:sorted', this[onSortableSorted]);
  }

  /**
   * Detaches plugins event listeners
   */
  detach() {
    this.draggable.off('sortable:sorted', this[onSortableSorted]);
  }

  /**
   * Returns options passed through draggable
   * @return {Object}
   */
  getOptions() {
    return this.draggable.options.swapAnimation || {};
  }

  /**
   * Sortable sorted handler
   * @param {SortableSortedEvent} sortableEvent
   * @private
   */
  [onSortableSorted]({oldIndex, newIndex, dragEvent}) {
    const {source, over} = dragEvent;

    cancelAnimationFrame(this.lastAnimationFrame);

    // Can be done in a separate frame
    this.lastAnimationFrame = requestAnimationFrame(() => {
      animate(source, over, this.options);
    });
  }
}

/**
 * Animates two elements
 * @param {HTMLElement} from
 * @param {HTMLElement} to
 * @param {Object} options
 * @param {Number} options.duration
 * @param {String} options.easingFunction
 * @private
 */
function animate(from, to, {duration, easingFunction}) {
  for (const element of [from, to]) {
    element.style.pointerEvents = 'none';
  }

  const fromRect = from.getBoundingClientRect();
  const toRect = to.getBoundingClientRect();

  /* 
    Calculate the displacement for the given move.
    Here we could also calculate the inverted scale and opacity if needed.
    Using this technique we can avoid specifying the direction of the swap and
    let the browser naturally animate based on layout (particularly useful for flex, grid, and floating layouts)
    Inspired by FLIP (https://aerotwist.com/blog/flip-your-animations/)
  */
  const dx = fromRect.left - toRect.left;
  const dy = fromRect.top - toRect.top;

  to.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
  from.style.transform = `translate3d(${-dx}px, ${-dy}px, 0)`;

  requestAnimationFrame(() => {
    for (const element of [from, to]) {
      element.addEventListener('transitionend', resetElementOnTransitionEnd);
      element.style.transition = `transform ${duration}ms ${easingFunction}`;
      element.style.transform = '';
    }
  });
}

/**
 * Resets animation style properties after animation has completed
 * @param {Event} event
 * @private
 */
function resetElementOnTransitionEnd(event) {
  event.target.style.transition = '';
  event.target.style.pointerEvents = '';
  event.target.removeEventListener('transitionend', resetElementOnTransitionEnd);
}
