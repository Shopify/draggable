import { DragEvent } from '../../Draggable';
import AbstractEvent from '../../shared/AbstractEvent';

export type SwappableEventData = {
  dragEvent?: DragEvent;
  over?: Element;
  overContainer?: Element;
  swappedElement?: Element;
};

export class SwappableEvent extends AbstractEvent {
  declare data: SwappableEventData;

  get dragEvent() {
    return this.data.dragEvent;
  }

  clone(data) {
    return new SwappableEvent({
      ...this.data,
      ...data,
    });
  }

  static type = 'swappable';
}

export class SwappableStartEvent extends SwappableEvent {
  clone(data) {
    return new SwappableStartEvent({
      ...this.data,
      ...data,
    });
  }

  static type = 'swappable:start';
  static cancelable = true;
}

export class SwappableSwapEvent extends SwappableEvent {
  get over() {
    return this.data.over;
  }

  get overContainer() {
    return this.data.overContainer;
  }

  clone(data) {
    return new SwappableSwapEvent({
      ...this.data,
      ...data,
    });
  }

  static type = 'swappable:swap';
  static cancelable = true;
}

export class SwappableSwappedEvent extends SwappableEvent {
  get swappedElement() {
    return this.data.swappedElement;
  }

  clone(data) {
    return new SwappableSwappedEvent({
      ...this.data,
      ...data,
    });
  }

  static type = 'swappable:swapped';
}

export class SwappableStopEvent extends SwappableEvent {
  clone(data) {
    return new SwappableStopEvent({
      ...this.data,
      ...data,
    });
  }

  static type = 'swappable:stop';
}
