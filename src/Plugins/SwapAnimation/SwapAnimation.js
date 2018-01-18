import AbstractPlugin from 'shared/AbstractPlugin';

export const defaultOptions = {
  duration: 150,
  easingFunction: 'ease-in-out',
};

export default class SwapAnimation extends AbstractPlugin {
  constructor(draggable) {
    super(draggable);

    this.options = {
      ...defaultOptions,
      ...this.getOptions(),
    };

    this.onSortableSorted = this.onSortableSorted.bind(this);
  }

  attach() {
    this.draggable.on('sortable:sorted', this.onSortableSorted);
  }

  detach() {
    this.draggable.off('sortable:sorted', this.onSortableSorted);
  }

  onSortableSorted({oldIndex, newIndex, dragEvent}) {
    const {source, over} = dragEvent;

    cancelAnimationFrame(this.lastAnimationFrame);

    // Can be done in a separate frame
    this.lastAnimationFrame = requestAnimationFrame(() => {
      if (oldIndex >= newIndex) {
        animate(source, over, this.options);
      } else {
        animate(over, source, this.options);
      }
    });
  }

  getOptions() {
    return this.draggable.options.swapAnimation || {};
  }
}

function animate(top, bottom, {duration, easingFunction}) {
  const height = top.offsetHeight;

  for (const element of [top, bottom]) {
    element.style.pointerEvents = 'none';
  }

  top.style.transform = `translate3d(0, ${height}px, 0)`;
  bottom.style.transform = `translate3d(0, -${height}px, 0)`;

  requestAnimationFrame(() => {
    for (const element of [top, bottom]) {
      element.addEventListener('transitionend', resetElementOnTransitionEnd);
      element.style.transition = `transform ${duration}ms ${easingFunction}`;
      element.style.transform = '';
    }
  });
}

function resetElementOnTransitionEnd(event) {
  event.target.style.transition = '';
  event.target.style.pointerEvents = '';
  event.target.removeEventListener('transitionend', resetElementOnTransitionEnd);
}
