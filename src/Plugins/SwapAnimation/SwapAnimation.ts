import AbstractPlugin from 'shared/AbstractPlugin';
import {FixMeAny} from 'shared/types';
import {AutoBind} from 'shared/utils';

interface Options {
  duration: number;
  easingFunction: string;
  horizontal: boolean;
}

/**
 * SwapAnimation default options
 * @property {Object} defaultOptions
 * @property {Number} defaultOptions.duration
 * @property {String} defaultOptions.easingFunction
 * @property {Boolean} defaultOptions.horizontal
 * @type {Object}
 */
export const defaultOptions: Options = {
  duration: 150,
  easingFunction: 'ease-in-out',
  horizontal: false,
};

/**
 * SwapAnimation plugin adds swap animations for sortable
 * @class SwapAnimation
 * @module SwapAnimation
 * @extends AbstractPlugin
 */
export default class SwapAnimation extends AbstractPlugin {
  private options: Options;
  private lastAnimationFrame: number | null;
  /**
   * SwapAnimation constructor.
   * @constructs SwapAnimation
   * @param {Draggable} draggable - Draggable instance
   */
  constructor(draggable: FixMeAny) {
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
  }

  /**
   * Attaches plugins event listeners
   */
  attach() {
    this.draggable.on('sortable:sorted', this.onSortableSorted);
  }

  /**
   * Detaches plugins event listeners
   */
  detach() {
    this.draggable.off('sortable:sorted', this.onSortableSorted);
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
  @AutoBind
  onSortableSorted({oldIndex, newIndex, dragEvent}: FixMeAny) {
    const {source, over} = dragEvent;

    if (this.lastAnimationFrame) {
      cancelAnimationFrame(this.lastAnimationFrame);
    }

    // Can be done in a separate frame
    this.lastAnimationFrame = requestAnimationFrame(() => {
      if (oldIndex >= newIndex) {
        animate(source, over, this.options);
      } else {
        animate(over, source, this.options);
      }
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
 * @param {String} options.horizontal
 * @private
 */
function animate(
  from: HTMLElement,
  to: HTMLElement,
  {duration, easingFunction, horizontal}: Options,
) {
  for (const element of [from, to]) {
    element.style.pointerEvents = 'none';
  }

  if (horizontal) {
    const width = from.offsetWidth;
    from.style.transform = `translate3d(${width}px, 0, 0)`;
    to.style.transform = `translate3d(-${width}px, 0, 0)`;
  } else {
    const height = from.offsetHeight;
    from.style.transform = `translate3d(0, ${height}px, 0)`;
    to.style.transform = `translate3d(0, -${height}px, 0)`;
  }

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
function resetElementOnTransitionEnd(event: Event) {
  if (event.target == null || !isHTMLElement(event.target)) {
    return;
  }

  event.target.style.transition = '';
  event.target.style.pointerEvents = '';
  event.target.removeEventListener(
    'transitionend',
    resetElementOnTransitionEnd,
  );
}

function isHTMLElement(eventTarget: EventTarget): eventTarget is HTMLElement {
  return Boolean('style' in eventTarget);
}
