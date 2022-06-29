import { DragEvent } from 'Draggable/DragEvent';
import AbstractEvent from 'shared/AbstractEvent';

export class DroppableEvent extends AbstractEvent {
  static type = 'droppable';

  declare data: {
    dragEvent: DragEvent;
    dropzone: HTMLElement;
    droppable: boolean;
  };

  get droppable() {
    return this.data.droppable;
  }

  get dragEvent() {
    return this.data.dragEvent;
  }

  clone(data) {
    return new DroppableEvent({
      ...this.data,
      ...data,
    });
  }
}

export class DroppableStartEvent extends DroppableEvent {
  static type = 'droppable:start';
  static cancelable = true;

  get dropzone() {
    return this.data.dropzone;
  }

  clone(data) {
    return new DroppableStartEvent({
      ...this.data,
      ...data,
    });
  }
}

export class DroppableDroppedEvent extends DroppableEvent {
  static type = 'droppable:dropped';
  static cancelable = true;

  get dropzone() {
    return this.data.dropzone;
  }

  clone(data) {
    return new DroppableDroppedEvent({
      ...this.data,
      ...data,
    });
  }
}

export class DroppableReturnedEvent extends DroppableEvent {
  static type = 'droppable:returned';
  static cancelable = true;

  get dropzone() {
    return this.data.dropzone;
  }

  clone(data) {
    return new DroppableReturnedEvent({
      ...this.data,
      ...data,
    });
  }
}

export class DroppableStopEvent extends DroppableEvent {
  static type = 'droppable:stop';
  static cancelable = true;

  get dropzone() {
    return this.data.dropzone;
  }

  clone(data) {
    return new DroppableStopEvent({
      ...this.data,
      ...data,
    });
  }
}
