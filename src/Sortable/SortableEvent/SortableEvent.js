import AbstractEvent from 'shared/AbstractEvent';

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

  get startContainer() {
    return this.data.startContainer;
  }
}

export class SortableSortEvent extends SortableEvent {
  static type = 'sortable:sort';

  get oldIndex() {
    return this.data.oldIndex;
  }

  get over() {
    return this.data.oldIndex;
  }

  get overContainer() {
    return this.data.newIndex;
  }
}

export class SortableSortedEvent extends SortableEvent {
  static type = 'sortable:sorted';

  get moves() {
    return this.data.moves;
  }

  get oldIndex() {
    return this.data.oldIndex;
  }

  get newIndex() {
    return this.data.newIndex;
  }

  get oldContainer() {
    return this.data.oldContainer;
  }

  get newContainer() {
    return this.data.newContainer;
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

  get oldContainer() {
    return this.data.oldContainer;
  }

  get newContainer() {
    return this.data.newContainer;
  }
}
