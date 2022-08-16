import {
  DragEvent,
  DragOverContainerEvent,
  DragOverEvent,
} from '../../Draggable';

export type SortableEventDetail = {
  dragEvent?: DragEvent;
  over?: HTMLElement;
  source?: HTMLElement;
  startContainer?: HTMLElement;
  oldContainer?: HTMLElement;
  newContainer?: HTMLElement;
  currentIndex?: number;
  startIndex?: number;
  oldIndex?: number;
  newIndex?: number;
};

export class SortableEvent<
  T extends SortableEventDetail = SortableEventDetail
> extends CustomEvent<T> {
  constructor(
    eventInitDict?: CustomEventInit<T>,
    type: string = SortableEvent.type
  ) {
    super(type, eventInitDict);
  }

  get dragEvent() {
    return this.detail.dragEvent;
  }

  clone = (detail: Partial<SortableEventDetail>) =>
    new SortableEvent(
      { detail: { ...this.detail, ...detail } },
      SortableEvent.type
    );

  static type = 'sortable';
}

export class SortableStartEvent extends SortableEvent {
  constructor(detail: SortableEventDetail) {
    super(
      { detail, cancelable: SortableStartEvent.cancelable },
      SortableStartEvent.type
    );
  }

  get startIndex() {
    return this.detail.startIndex;
  }

  get startContainer() {
    return this.detail.startContainer;
  }

  clone = (detail: Partial<SortableEventDetail>) =>
    new SortableStartEvent({ ...this.detail, ...detail });

  static type = 'sortable:start';
  static cancelable = true;
}

export type SortableSortEventDetail = SortableEventDetail & {
  dragEvent: DragOverEvent | DragOverContainerEvent;
  currentIndex: number;
  overContainer: HTMLElement;
  source: HTMLElement;
};

export class SortableSortEvent extends SortableEvent<SortableSortEventDetail> {
  constructor(detail: SortableSortEventDetail) {
    super(
      { detail, cancelable: SortableSortEvent.cancelable },
      SortableSortEvent.type
    );
  }

  get currentIndex() {
    return this.detail.currentIndex;
  }

  get overContainer() {
    return this.detail.overContainer;
  }

  get dragEvent() {
    return this.detail.dragEvent;
  }

  get source() {
    return this.detail.source;
  }

  clone = (detail: Partial<SortableSortEventDetail>) =>
    new SortableSortEvent({ ...this.detail, ...detail });

  static type = 'sortable:sort';
  static cancelable = true;
}

export type SortableSortedEventDetail = SortableEventDetail & {
  dragEvent: DragOverContainerEvent;
  oldContainer: HTMLElement;
  newContainer: HTMLElement;
  oldIndex: number;
  newIndex: number;
};

export class SortableSortedEvent extends SortableEvent<SortableSortedEventDetail> {
  constructor(detail: SortableSortedEventDetail) {
    super({ detail }, SortableSortedEvent.type);
  }

  get dragEvent() {
    return this.detail.dragEvent;
  }

  get oldIndex() {
    return this.detail.oldIndex;
  }

  get newIndex() {
    return this.detail.newIndex;
  }

  get oldContainer() {
    return this.detail.oldContainer;
  }

  get newContainer() {
    return this.detail.newContainer;
  }

  clone = (detail: Partial<SortableSortedEventDetail>) =>
    new SortableSortedEvent({ ...this.detail, ...detail });

  static type = 'sortable:sorted';
}

export type SortableStopEventDetail = SortableEventDetail & {
  oldIndex: number;
  newIndex: number;
  oldContainer: HTMLElement;
  newContainer: HTMLElement;
};

export class SortableStopEvent extends SortableEvent {
  constructor(detail: SortableStopEventDetail) {
    super({ detail }, SortableStopEvent.type);
  }

  get oldIndex() {
    return this.detail.oldIndex;
  }

  get newIndex() {
    return this.detail.newIndex;
  }

  get oldContainer() {
    return this.detail.oldContainer;
  }

  get newContainer() {
    return this.detail.newContainer;
  }

  clone = (detail: Partial<SortableStopEventDetail>) =>
    new SortableStopEvent({
      ...this.detail,
      ...detail,
    } as SortableStopEventDetail);

  static type = 'sortable:stop';
}
