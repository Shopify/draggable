import AbstractEvent from './abstract-event';

export class SortableEvent extends AbstractEvent {
  get dragEvent() {
    return this.data.dragEvent;
  }
}

export class SortableStartEvent extends SortableEvent {
  static type = 'sortable:start';

  get startIndex() {
    return this.data.startIndex;
  }
}

export class SortableSortedEvent extends SortableEvent {
  static type = 'sortable:sorted';

  get moves() {
    return this.data.moves;
  }
}

export class SortableStopEvent extends SortableEvent {
  static type = 'sortable:stop';

  get oldIndex() {
    return this.data.oldIndex;
  }

  get newIndex() {
    return this.data.newIndex;
  }
}
