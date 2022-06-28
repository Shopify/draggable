import AbstractEvent from 'shared/AbstractEvent';

export class SortableEvent extends AbstractEvent {
  static type = 'sortable';

  get dragEvent() {
    return this.data.dragEvent;
  }

  clone(data) {
    return new SortableEvent({
      ...this.data,
      ...data,
    });
  }
}

export class SortableStartEvent extends SortableEvent {
  static type = 'sortable:start';
  static cancelable = true;

  get startIndex() {
    return this.data.startIndex;
  }

  get startContainer() {
    return this.data.startContainer;
  }

  clone(data) {
    return new SortableStartEvent({
      ...this.data,
      ...data,
    });
  }
}

export class SortableSortEvent extends SortableEvent {
  static type = 'sortable:sort';
  static cancelable = true;

  get currentIndex() {
    return this.data.currentIndex;
  }

  get over() {
    return this.data.over;
  }

  get overContainer() {
    return this.data.dragEvent.overContainer;
  }

  clone(data) {
    return new SortableSortEvent({
      ...this.data,
      ...data,
    });
  }
}

export class SortableSortedEvent extends SortableEvent {
  static type = 'sortable:sorted';

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

  clone(data) {
    return new SortableSortedEvent({
      ...this.data,
      ...data,
    });
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

  clone(data) {
    return new SortableStopEvent({
      ...this.data,
      ...data,
    });
  }
}
