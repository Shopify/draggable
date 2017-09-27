import Draggable from './draggable';

import {
  SortableStartEvent,
  SortableSortedEvent,
  SortableStopEvent,
} from './events/sortable-event';

export default class Sortable {
  constructor(containers = [], options = {}) {
    this.draggable = new Draggable(containers, options);

    this._onDragStart = this._onDragStart.bind(this);
    this._onDragOverContainer = this._onDragOverContainer.bind(this);
    this._onDragOver = this._onDragOver.bind(this);
    this._onDragStop = this._onDragStop.bind(this);

    this.draggable
      .on('drag:start', this._onDragStart)
      .on('drag:over:container', this._onDragOverContainer)
      .on('drag:over', this._onDragOver)
      .on('drag:stop', this._onDragStop);
  }

  destroy() {
    this.draggable
      .off('drag:start', this._onDragStart)
      .off('drag:over:container', this._onDragOverContainer)
      .off('drag:over', this._onDragOver)
      .off('drag:stop', this._onDragStop)
      .destroy();
  }

  on(type, callback) {
    this.draggable.on(type, callback);
    return this;
  }

  off(type, callback) {
    this.draggable.off(type, callback);
    return this;
  }

  _onDragStart(event) {
    this.startIndex = index(event.source);

    const sortableStartEvent = new SortableStartEvent({
      dragEvent: event,
      startIndex: this.startIndex,
    });

    this.draggable.trigger(sortableStartEvent);

    if (sortableStartEvent.canceled()) {
      event.cancel();
    }
  }

  _onDragOverContainer(event) {
    if (event.canceled()) {
      return;
    }

    const moves = move(event.source, event.over, event.overContainer);

    if (!moves) {
      return;
    }

    const sortableSortedEvent = new SortableSortedEvent({
      dragEvent: event,
      moves,
    });

    this.draggable.triggerEvent(sortableSortedEvent);
  }

  _onDragOver(event) {
    if (event.over === event.source) {
      return;
    }

    const moves = move(event.source, event.over, event.overContainer);

    if (!moves) {
      return;
    }

    const sortableSortedEvent = new SortableSortedEvent({
      dragEvent: event,
      moves,
    });

    this.draggable.triggerEvent(sortableSortedEvent);
  }

  _onDragStop(event) {
    const sortableStopEvent = new SortableStopEvent({
      dragEvent: event,
      oldIndex: this.startIndex,
      newIndex: index(event.source),
    });

    this.draggable.triggerEvent(sortableStopEvent);

    this.startIndex = null;
    this.offset = null;
  }
}

function index(element) {
  return Array.prototype.indexOf.call(element.parentNode.children, element);
}

function move(source, over, overContainer) {
  const emptyOverContainer = !overContainer.children.length;
  const differentContainer = over && (source.parentNode !== over.parentNode);
  const sameContainer = over && (source.parentNode === over.parentNode);

  if (emptyOverContainer) {
    return moveInsideEmptyContainer(source, overContainer);
  } else if (sameContainer) {
    return moveWithinContainer(source, over);
  } else if (differentContainer) {
    return moveOutsideContainer(source, over);
  } else {
    return null;
  }
}

function moveInsideEmptyContainer(source, overContainer) {
  const oldContainer = source.parentNode;
  const oldIndex = index(source);

  overContainer.appendChild(source);

  return {oldIndex, newIndex: index(source), oldContainer, newContainer: overContainer};
}

function moveWithinContainer(source, over) {
  const oldIndex = index(source);
  const newIndex = index(over);

  if (oldIndex < newIndex) {
    source.parentNode.insertBefore(source, over.nextElementSibling);
  } else {
    source.parentNode.insertBefore(source, over);
  }

  return {oldIndex, newIndex, oldContainer: source.parentNode, newContainer: source.parentNode};
}

function moveOutsideContainer(source, over) {
  const oldContainer = source.parentNode;
  const oldIndex = index(source);
  const newIndex = index(over);

  over.parentNode.insertBefore(source, over);

  return {oldIndex, newIndex, oldContainer, newContainer: source.parentNode};
}
