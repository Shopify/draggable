import AbstractPlugin from 'shared/AbstractPlugin';

const onSortableSorted = Symbol('onSortableSorted');
const onSortableSort = Symbol('onSortableSort');

/**
 * SortAnimation default options
 * @property {Object} defaultOptions
 * @property {Number} defaultOptions.duration
 * @property {String} defaultOptions.easingFunction
 * @type {Object}
 */
export const defaultOptions = {
  duration: 150,
  easingFunction: 'ease-in-out',
};

/**
 * SortAnimation plugin adds sort animation for sortable
 * @class SortAnimation
 * @module SortAnimation
 * @extends AbstractPlugin
 */
export default class SortAnimation extends AbstractPlugin {
  /**
   * SortAnimation constructor.
   * @constructs SortAnimation
   * @param {Draggable} draggable - Draggable instance
   */
  constructor(draggable) {
    super(draggable);

    /**
     * SortAnimation options
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
    this.lastElements = [];

    this[onSortableSorted] = this[onSortableSorted].bind(this);
    this[onSortableSort] = this[onSortableSort].bind(this);
  }

  /**
   * Attaches plugins event listeners
   */
  attach() {
    this.draggable.on('sortable:sort', this[onSortableSort]);
    this.draggable.on('sortable:sorted', this[onSortableSorted]);
  }

  /**
   * Detaches plugins event listeners
   */
  detach() {
    this.draggable.off('sortable:sort', this[onSortableSort]);
    this.draggable.off('sortable:sorted', this[onSortableSorted]);
  }

  /**
   * Returns options passed through draggable
   * @return {Object}
   */
  getOptions() {
    return this.draggable.options.sortAnimation || {};
  }

  /**
   * Sortable sort handler
   * @param {SortableSortEvent} sortableEvent
   * @private
   */
  [onSortableSort]({dragEvent}) {
    const {sourceContainer} = dragEvent;
    const elements = this.draggable.getDraggableElementsForContainer(sourceContainer);
    this.lastElements = Array.from(elements).map((el) => {
      return {
        domEl: el,
        offsetTop: el.offsetTop,
        offsetLeft: el.offsetLeft,
      };
    });
  }

  /**
   * Sortable sorted handler
   * @param {SortableSortedEvent} sortableEvent
   * @private
   */
  [onSortableSorted]({oldIndex, newIndex}) {
    if (oldIndex === newIndex) {
      return;
    }

    const effectedElements = [];
    let start;
    let end;
    let num;
    if (oldIndex > newIndex) {
      start = newIndex;
      end = oldIndex - 1;
      num = 1;
    } else {
      start = oldIndex + 1;
      end = newIndex;
      num = -1;
    }

    for (let i = start; i <= end; i++) {
      const from = this.lastElements[i];
      const to = this.lastElements[i + num];
      effectedElements.push({from, to});
    }
    cancelAnimationFrame(this.lastAnimationFrame);

    // Can be done in a separate frame
    this.lastAnimationFrame = requestAnimationFrame(() => {
      effectedElements.forEach((element) => animate(element, this.options));
    });
  }
}

/**
 * Animates two elements
 * @param {Object} element
 * @param {Object} element.from
 * @param {Object} element.to
 * @param {Object} options
 * @param {Number} options.duration
 * @param {String} options.easingFunction
 * @private
 */
function animate({from, to}, {duration, easingFunction}) {
  const domEl = from.domEl;
  const x = from.offsetLeft - to.offsetLeft;
  const y = from.offsetTop - to.offsetTop;

  domEl.style.pointerEvents = 'none';
  domEl.style.transform = `translate3d(${x}px, ${y}px, 0)`;

  requestAnimationFrame(() => {
    domEl.addEventListener('transitionend', resetElementOnTransitionEnd);
    domEl.style.transition = `transform ${duration}ms ${easingFunction}`;
    domEl.style.transform = '';
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
