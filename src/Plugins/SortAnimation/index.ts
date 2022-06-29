import AbstractPlugin from 'shared/AbstractPlugin';
import { SortableSortedEvent, SortableSortEvent } from 'Sortable';

const onSortableSorted = Symbol('onSortableSorted');
const onSortableSort = Symbol('onSortableSort');

export const defaultOptions = {
  duration: 150,
  easingFunction: 'ease-in-out',
};

export interface SortAnimationOptions {
  duration: number;
  easingFunction: string;
}

export interface SortAnimationElement {
  domEl: HTMLElement;
  offsetTop: number;
  offsetLeft: number;
}

function resetElementOnTransitionEnd(event: Event) {
  (<HTMLElement>event.target).style.transition = '';
  (<HTMLElement>event.target).style.pointerEvents = '';
  event.target.removeEventListener(
    'transitionend',
    resetElementOnTransitionEnd
  );
}

function animate(
  { from, to }: { from: SortAnimationElement; to: SortAnimationElement },
  { duration, easingFunction }: SortAnimationOptions
) {
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

export default class SortAnimation extends AbstractPlugin {
  options: SortAnimationOptions;
  lastAnimationFrame: number = null;
  lastElements: SortAnimationElement[] = [];

  constructor(draggable) {
    super(draggable);

    this.options = {
      ...defaultOptions,
      ...this.getOptions(),
    };

    this[onSortableSorted] = this[onSortableSorted].bind(this);
    this[onSortableSort] = this[onSortableSort].bind(this);
  }

  attach() {
    this.draggable.on('sortable:sort', this[onSortableSort]);
    this.draggable.on('sortable:sorted', this[onSortableSorted]);
  }

  detach() {
    this.draggable.off('sortable:sort', this[onSortableSort]);
    this.draggable.off('sortable:sorted', this[onSortableSorted]);
  }

  getOptions = () => this.draggable.options.sortAnimation ?? {};

  private [onSortableSort] = ({ dragEvent }: SortableSortEvent) => {
    const { sourceContainer } = dragEvent;
    const elements =
      this.draggable.getDraggableElementsForContainer(sourceContainer);
    this.lastElements = Array.from(elements).map((el: HTMLElement) => ({
      domEl: el,
      offsetTop: el.offsetTop,
      offsetLeft: el.offsetLeft,
    }));
  };

  private [onSortableSorted] = ({
    oldIndex,
    newIndex,
  }: SortableSortedEvent) => {
    if (oldIndex === newIndex) return;

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
      effectedElements.push({ from, to });
    }
    cancelAnimationFrame(this.lastAnimationFrame);

    // Can be done in a separate frame
    this.lastAnimationFrame = requestAnimationFrame(() => {
      effectedElements.forEach((element) => animate(element, this.options));
    });
  };
}
