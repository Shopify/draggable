import { DragEvent } from '../../Draggable/DragEvent';

export type DroppableEventDetail = {
  dragEvent: DragEvent;
  dropzone: HTMLElement;
  droppable?: HTMLElement;
};

export class DroppableEvent<
  T extends DroppableEventDetail = DroppableEventDetail
> extends CustomEvent<T> {
  constructor(
    eventInitDict?: CustomEventInit<T>,
    type: string = DroppableEvent.type
  ) {
    super(type, eventInitDict);
  }

  get droppable() {
    return this.detail.droppable;
  }

  get dropzone() {
    return this.detail.dropzone;
  }

  get dragEvent() {
    return this.detail.dragEvent;
  }

  clone = (detail: Partial<T>) =>
    new DroppableEvent(
      { detail: { ...this.detail, ...detail } },
      DroppableEvent.type
    );

  static type = 'droppable';
}

export class DroppableStartEvent extends DroppableEvent {
  constructor(detail: DroppableEventDetail) {
    super(
      { detail, cancelable: DroppableStartEvent.cancelable },
      DroppableStartEvent.type
    );
  }

  clone = (detail: Partial<DroppableStartEvent>) =>
    new DroppableStartEvent({
      ...this.detail,
      ...detail,
    });

  static type = 'droppable:start';
  static cancelable = true;
}

export class DroppableDroppedEvent extends DroppableEvent {
  constructor(detail: DroppableEventDetail) {
    super(
      { detail, cancelable: DroppableDroppedEvent.cancelable },
      DroppableDroppedEvent.type
    );
  }

  clone = (detail: Partial<DroppableDroppedEvent>) =>
    new DroppableDroppedEvent({
      ...this.detail,
      ...detail,
    });

  static type = 'droppable:dropped';
  static cancelable = true;
}

export class DroppableReturnedEvent extends DroppableEvent {
  constructor(detail: DroppableEventDetail) {
    super(
      { detail, cancelable: DroppableReturnedEvent.cancelable },
      DroppableReturnedEvent.type
    );
  }

  clone = (detail: Partial<DroppableReturnedEvent>) =>
    new DroppableReturnedEvent({
      ...this.detail,
      ...detail,
    });

  static type = 'droppable:returned';
  static cancelable = true;
}

export class DroppableStopEvent extends DroppableEvent {
  constructor(detail: DroppableEventDetail) {
    super(
      { detail, cancelable: DroppableStopEvent.cancelable },
      DroppableStopEvent.type
    );
  }

  clone = (detail: Partial<DroppableStopEvent>) =>
    new DroppableStopEvent({
      ...this.detail,
      ...detail,
    });

  static type = 'droppable:stop';
  static cancelable = true;
}
