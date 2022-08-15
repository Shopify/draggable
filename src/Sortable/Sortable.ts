import Draggable, {
  DragOverContainerEvent,
  DragOverEvent,
  DragStartEvent,
  DragStopEvent,
  DraggableOptions,
} from '../Draggable';
import {
  SortableStartEvent,
  SortableSortEvent,
  SortableSortedEvent,
  SortableStopEvent,
  SortableEvent,
} from './SortableEvent';

const onDragStart = Symbol('onDragStart');
const onDragOverContainer = Symbol('onDragOverContainer');
const onDragOver = Symbol('onDragOver');
const onDragStop = Symbol('onDragStop');

/**
 * Returns announcement message when a Draggable element has been sorted with another Draggable element
 * or moved into a new container
 */
function onSortableSortedDefaultAnnouncement({
  dragEvent,
}: SortableSortedEvent) {
  const sourceText =
    dragEvent.source.textContent?.trim() ??
    dragEvent.source.id ??
    'sortable element';

  if (dragEvent.over) {
    const overText =
      dragEvent.over.textContent?.trim() ??
      dragEvent.over.id ??
      'sortable element';
    const isFollowing =
      dragEvent.source.compareDocumentPosition(dragEvent.over) &
      Node.DOCUMENT_POSITION_FOLLOWING;

    if (isFollowing) return `Placed ${sourceText} after ${overText}`;
    else return `Placed ${sourceText} before ${overText}`;
  } else {
    // need to figure out how to compute container name
    return `Placed ${sourceText} into a different container`;
  }
}

const index = (element: HTMLElement) =>
  Array.prototype.indexOf.call(element.parentElement?.children, element);

function moveInsideEmptyContainer(
  source: HTMLElement,
  overContainer: HTMLElement
) {
  const oldContainer = source.parentElement;

  overContainer.appendChild(source);

  return { oldContainer, newContainer: overContainer };
}

function moveWithinContainer(source: HTMLElement, over: HTMLElement) {
  const oldIndex = index(source);
  const newIndex = index(over);

  if (oldIndex < newIndex)
    source.parentElement?.insertBefore(source, over.nextElementSibling);
  else source.parentElement?.insertBefore(source, over);

  return {
    oldContainer: source.parentElement,
    newContainer: source.parentElement,
  };
}

function moveOutsideContainer(
  source: HTMLElement,
  over: HTMLElement,
  overContainer: HTMLElement
) {
  const oldContainer = source.parentElement;

  if (over) over.parentElement?.insertBefore(source, over);
  else overContainer.appendChild(source);

  return { oldContainer, newContainer: source.parentElement };
}

function move({
  source,
  over,
  overContainer,
  children,
}: {
  source: HTMLElement;
  over: HTMLElement;
  overContainer: HTMLElement;
  children: HTMLElement[];
}) {
  const emptyOverContainer = !children.length;
  const differentContainer = source.parentElement !== overContainer;
  const sameContainer = over && source.parentElement === over.parentElement;

  if (emptyOverContainer)
    return moveInsideEmptyContainer(source, overContainer);
  else if (sameContainer) return moveWithinContainer(source, over);
  else if (differentContainer)
    return moveOutsideContainer(source, over, overContainer);
  else return null;
}

const defaultAnnouncements = {
  'sortable:sorted': onSortableSortedDefaultAnnouncement,
};

interface SortableOptions extends Omit<DraggableOptions, 'announcements'> {
  announcements: Record<
    string,
    (event: SortableEvent | CustomEvent) => unknown
  >;
}

/**
 * Sortable is built on top of Draggable and allows sorting of draggable elements. Sortable will keep
 * track of the original index and emits the new index as you drag over draggable elements.
 */
export default class Sortable extends Draggable {
  startIndex: number | null;
  startContainer: HTMLElement | null;

  constructor(
    containers: NodeList | HTMLElement[] | HTMLElement = [document.body],
    options: Partial<SortableOptions> = {}
  ) {
    super(containers, {
      ...options,
      announcements: {
        ...defaultAnnouncements,
        ...(options.announcements ?? {}),
      },
    });

    this.on('drag:start', this[onDragStart])
      .on('drag:over:container', this[onDragOverContainer])
      .on('drag:over', this[onDragOver])
      .on('drag:stop', this[onDragStop]);
  }

  /**
   * Destroys Sortable instance.
   */
  destroy() {
    super.destroy();

    this.off('drag:start', this[onDragStart])
      .off('drag:over:container', this[onDragOverContainer])
      .off('drag:over', this[onDragOver])
      .off('drag:stop', this[onDragStop]);
  }

  /**
   * Returns true index of element within its container during drag operation, i.e. excluding mirror and original source
   */
  index(element: HTMLElement): number {
    return this.getSortableElementsForContainer(element.parentElement).indexOf(
      element
    );
  }

  /**
   * Returns sortable elements for a given container, excluding the mirror and
   * original source element if present
   */
  getSortableElementsForContainer(container: HTMLElement): HTMLElement[] {
    const allSortableElements = <HTMLElement[]>[
      ...container.querySelectorAll(this.options.draggable),
    ];

    return [...allSortableElements].filter(
      (childElement) =>
        childElement !== this.originalSource &&
        childElement !== this.mirror &&
        childElement.parentElement === container
    );
  }

  private [onDragStart] = (event: DragStartEvent) => {
    this.startContainer = event.source.parentElement;
    this.startIndex = this.index(event.source);

    const sortableStartEvent = new SortableStartEvent({
      dragEvent: event,
      startIndex: this.startIndex,
      startContainer: this.startContainer,
    });

    this.trigger(sortableStartEvent);

    if (sortableStartEvent.defaultPrevented) event.preventDefault();
  };

  private [onDragOverContainer] = (event: DragOverContainerEvent) => {
    if (event.defaultPrevented) return;

    const { source, overContainer } = event;
    const oldIndex = this.index(source);

    const sortableSortEvent = new SortableSortEvent({
      dragEvent: event,
      currentIndex: oldIndex,
      source,
      overContainer: event.overContainer,
    });

    this.trigger(sortableSortEvent);

    if (sortableSortEvent.defaultPrevented) return;

    const children = this.getSortableElementsForContainer(overContainer);
    const moves = move({ source, over: event.over, overContainer, children });

    if (!moves) return;

    const { oldContainer, newContainer } = moves;
    const newIndex = this.index(event.source);

    const sortableSortedEvent = new SortableSortedEvent({
      dragEvent: event,
      oldIndex,
      newIndex,
      oldContainer,
      newContainer,
    });

    this.trigger(sortableSortedEvent);
  };

  private [onDragOver] = (event: DragOverEvent) => {
    if (event.over === event.originalSource || event.over === event.source)
      return;

    const { source, over, overContainer } = event;
    const oldIndex = this.index(source);

    const sortableSortEvent = new SortableSortEvent({
      dragEvent: event,
      currentIndex: oldIndex,
      overContainer,
      over,
      source,
    });

    this.trigger(sortableSortEvent);

    if (sortableSortEvent.defaultPrevented) return;

    const children = this.getDraggableElementsForContainer(overContainer);
    const moves = move({ source, over, overContainer, children });

    if (!moves) return;

    const { oldContainer, newContainer } = moves;
    const newIndex = this.index(source);

    const sortableSortedEvent = new SortableSortedEvent({
      dragEvent: event,
      oldIndex,
      newIndex,
      oldContainer,
      newContainer,
    });

    this.trigger(sortableSortedEvent);
  };

  private [onDragStop] = (event: DragStopEvent) => {
    const sortableStopEvent = new SortableStopEvent({
      dragEvent: event,
      oldIndex: this.startIndex,
      newIndex: this.index(event.source),
      oldContainer: this.startContainer,
      newContainer: event.source.parentElement,
    });

    this.trigger(sortableStopEvent);

    this.startIndex = null;
    this.startContainer = null;
  };
}
