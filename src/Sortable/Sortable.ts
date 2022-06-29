import { DraggableOptions } from 'Draggable/Draggable';

import Draggable, {
  DragOverContainerEvent,
  DragOverEvent,
  DragStartEvent,
  DragStopEvent,
} from '../Draggable';
import {
  SortableStartEvent,
  SortableSortEvent,
  SortableSortedEvent,
  SortableStopEvent,
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
    dragEvent.source.textContent.trim() ||
    dragEvent.source.id ||
    'sortable element';

  if (dragEvent.over) {
    const overText =
      dragEvent.over.textContent.trim() ||
      dragEvent.over.id ||
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

const index = (element: Element) =>
  Array.prototype.indexOf.call(element.parentNode.children, element);

function moveInsideEmptyContainer(source: Element, overContainer: Element) {
  const oldContainer = <Element>source.parentNode;

  overContainer.appendChild(source);

  return { oldContainer, newContainer: overContainer };
}

function moveWithinContainer(source: Element, over: Element) {
  const oldIndex = index(source);
  const newIndex = index(over);

  if (oldIndex < newIndex)
    source.parentNode.insertBefore(source, over.nextElementSibling);
  else source.parentNode.insertBefore(source, over);

  return {
    oldContainer: <Element>source.parentNode,
    newContainer: <Element>source.parentNode,
  };
}

function moveOutsideContainer(
  source: Element,
  over: Element,
  overContainer: Element
) {
  const oldContainer = source.parentNode;

  if (over) over.parentNode.insertBefore(source, over);
  else overContainer.appendChild(source);

  return { oldContainer, newContainer: source.parentNode };
}

function move({
  source,
  over,
  overContainer,
  children,
}: {
  source: Element;
  over: Element;
  overContainer: Element;
  children: Element[];
}) {
  const emptyOverContainer = !children.length;
  const differentContainer = source.parentNode !== overContainer;
  const sameContainer = over && source.parentNode === over.parentNode;

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

/**
 * Sortable is built on top of Draggable and allows sorting of draggable elements. Sortable will keep
 * track of the original index and emits the new index as you drag over draggable elements.
 */
export default class Sortable extends Draggable {
  startIndex: number = null;
  startContainer: Element = null;

  constructor(containers: HTMLElement[] = [], options: DraggableOptions = {}) {
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
  index(element: Element): number {
    return this.getSortableElementsForContainer(
      <Element>element.parentNode
    ).indexOf(element);
  }

  /**
   * Returns sortable elements for a given container, excluding the mirror and
   * original source element if present
   */
  getSortableElementsForContainer(container: Element): Element[] {
    const allSortableElements = <Element[]>(
      (<unknown>container.querySelectorAll(this.options.draggable))
    );

    return allSortableElements.filter(
      (childElement) =>
        childElement !== this.originalSource &&
        childElement !== this.mirror &&
        childElement.parentNode === container
    );
  }

  private [onDragStart] = (event: DragStartEvent) => {
    this.startContainer = <Element>event.source.parentNode;
    this.startIndex = this.index(event.source);

    const sortableStartEvent = new SortableStartEvent({
      dragEvent: event,
      startIndex: this.startIndex,
      startContainer: this.startContainer,
    });

    this.trigger(sortableStartEvent);

    if (sortableStartEvent.canceled()) event.cancel();
  };

  private [onDragOverContainer] = (event: DragOverContainerEvent) => {
    if (event.canceled()) return;

    const { source, over, overContainer } = event;
    const oldIndex = this.index(source);

    const sortableSortEvent = new SortableSortEvent({
      dragEvent: event,
      currentIndex: oldIndex,
      source,
      over,
    });

    this.trigger(sortableSortEvent);

    if (sortableSortEvent.canceled()) return;

    const children = this.getSortableElementsForContainer(overContainer);
    const moves = move({ source, over, overContainer, children });

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
      source,
      over,
    });

    this.trigger(sortableSortEvent);

    if (sortableSortEvent.canceled()) return;

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
      newContainer: event.source.parentNode,
    });

    this.trigger(sortableStopEvent);

    this.startIndex = null;
    this.startContainer = null;
  };
}
