import { DragEvent } from '../../Draggable';

export type SwappableEventDetail = {
  dragEvent: DragEvent;
  over?: HTMLElement;
  overContainer?: HTMLElement;
  swappedElement?: HTMLElement;
};

export class SwappableEvent<
  T extends SwappableEventDetail = SwappableEventDetail
> extends CustomEvent<T> {
  constructor(
    eventInitDict: CustomEventInit<T>,
    type: string = SwappableEvent.type
  ) {
    super(type, eventInitDict);
  }

  get dragEvent() {
    return this.detail.dragEvent;
  }

  clone = (detail: Partial<SwappableEventDetail>) =>
    new SwappableEvent(
      { detail: { ...this.detail, ...detail } },
      SwappableEvent.type
    );

  static type = 'swappable';
}

export class SwappableStartEvent extends SwappableEvent {
  constructor(detail: SwappableEventDetail) {
    super(
      { detail, cancelable: SwappableStartEvent.cancelable },
      SwappableStartEvent.type
    );
  }

  clone = (detail: Partial<SwappableEventDetail>) =>
    new SwappableStartEvent({
      ...this.detail,
      ...detail,
    });

  static type = 'swappable:start';
  static cancelable = true;
}

export type SwappableSwapEventDetail = SwappableEventDetail & {
  over: HTMLElement;
  overContainer: HTMLElement;
};

export class SwappableSwapEvent extends SwappableEvent<SwappableSwapEventDetail> {
  constructor(detail: SwappableSwapEventDetail) {
    super(
      { detail, cancelable: SwappableSwapEvent.cancelable },
      SwappableSwapEvent.type
    );
  }

  get over() {
    return this.detail.over;
  }

  get overContainer() {
    return this.detail.overContainer;
  }

  clone = (detail) => new SwappableSwapEvent({ ...this.detail, ...detail });

  static type = 'swappable:swap';
  static cancelable = true;
}

export type SwappableSwappedEventDetail = SwappableEventDetail & {
  swappedElement: HTMLElement;
};

export class SwappableSwappedEvent extends SwappableEvent {
  constructor(detail: SwappableSwappedEventDetail) {
    super({ detail }, SwappableSwappedEvent.type);
  }

  get swappedElement() {
    return this.detail.swappedElement;
  }

  clone = (detail: Partial<SwappableSwappedEventDetail>) =>
    new SwappableSwappedEvent({
      ...this.detail,
      ...detail,
    } as SwappableSwappedEventDetail);

  static type = 'swappable:swapped';
}

export class SwappableStopEvent extends SwappableEvent {
  constructor(detail: SwappableEventDetail) {
    super({ detail }, SwappableStopEvent.type);
  }

  clone = (detail: Partial<SwappableEventDetail>) =>
    new SwappableStopEvent({
      ...this.detail,
      ...detail,
    });

  static type = 'swappable:stop';
}
