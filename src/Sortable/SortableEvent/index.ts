import { DragEvent, DragOutEvent, DragOverEvent } from '../../Draggable';
import AbstractEvent from '../../shared/AbstractEvent';

export type SortableEventData = {
  dragEvent?: DragEvent;
  over?: HTMLElement;
  startContainer?: HTMLElement;
  oldContainer?: HTMLElement;
  newContainer?: HTMLElement;
  currentIndex?: number;
  startIndex?: number;
  oldIndex: number;
  newIndex: number;
};

export class SortableEvent extends AbstractEvent {
  declare data: SortableEventData;

  get dragEvent() {
    return this.data.dragEvent;
  }

  clone(data) {
    return new SortableEvent({
      ...this.data,
      ...data,
    });
  }

  static type = 'sortable';
}

export class SortableStartEvent extends SortableEvent {
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

  static type = 'sortable:start';
  static cancelable = true;
}

export class SortableSortEvent extends SortableEvent {
  declare data: SortableEventData & {
    dragEvent: DragOverEvent;
  };

  get currentIndex() {
    return this.data.currentIndex;
  }

  get over() {
    return this.data.over;
  }

  get overContainer() {
    return this.data.dragEvent.overContainer;
  }

  get dragEvent() {
    return this.data.dragEvent;
  }

  clone(data) {
    return new SortableSortEvent({
      ...this.data,
      ...data,
    });
  }

  static type = 'sortable:sort';
  static cancelable = true;
}

export class SortableSortedEvent extends SortableEvent {
  declare data: SortableEventData & {
    dragEvent: DragOutEvent;
    over: HTMLElement;
  };

  get dragEvent() {
    return this.data.dragEvent;
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

  clone(data) {
    return new SortableSortedEvent({
      ...this.data,
      ...data,
    });
  }

  static type = 'sortable:sorted';
}

export class SortableStopEvent extends SortableEvent {
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

  static type = 'sortable:stop';
}
