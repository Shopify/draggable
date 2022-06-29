import AbstractPlugin from 'shared/AbstractPlugin';

const onSortableSorted = Symbol('onSortableSorted');

export const defaultOptions = {
  duration: 150,
  easingFunction: 'ease-in-out',
  horizontal: false,
};

export interface SwapAnimationOptions {
  duration: number;
  easingFunction: string;
  horizontal: boolean;
}

/**
 * SwapAnimation plugin adds swap animations for sortable
 * @class SwapAnimation
 * @module SwapAnimation
 * @extends AbstractPlugin
 */

export default class SwapAnimation extends AbstractPlugin {
  options: SwapAnimationOptions;
  lastAnimationFrame: number = null;
  /**
   * SwapAnimation constructor.
   * @constructs SwapAnimation
   * @param {Draggable} draggable - Draggable instance
   */
  constructor(draggable) {
    super(draggable);

    this.options = {
      ...defaultOptions,
      ...this.getOptions(),
    };

    this[onSortableSorted] = this[onSortableSorted].bind(this);
  }

  attach() {
    this.draggable.on('sortable:sorted', this[onSortableSorted]);
  }

  detach() {
    this.draggable.off('sortable:sorted', this[onSortableSorted]);
  }

  getOptions = () => this.draggable.options.swapAnimation ?? {};

  private [onSortableSorted] = ({
    oldIndex,
    newIndex,
    dragEvent,
  }: SortableSortedEvent) => {
    const { source, over } = dragEvent;

    cancelAnimationFrame(this.lastAnimationFrame);

    // Can be done in a separate frame
    this.lastAnimationFrame = requestAnimationFrame(() => {
      if (oldIndex >= newIndex) {
        animate(source, over, this.options);
      } else {
        animate(over, source, this.options);
      }
    });
  };
}

function animate(
  from: HTMLElement,
  to: HTMLElement,
  { duration, easingFunction, horizontal }: SwapAnimationOptions
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

/*** Resets animation style properties after animation has completed */
function resetElementOnTransitionEnd(event: Event) {
  (<HTMLElement>event.target).style.transition = '';
  (<HTMLElement>event.target).style.pointerEvents = '';
  event.target.removeEventListener(
    'transitionend',
    resetElementOnTransitionEnd
  );
}
