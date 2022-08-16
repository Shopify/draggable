import { SensorEvent } from '../Sensors/SensorEvent';

export type DragEventDetail = {
  mirror?: HTMLElement;
  over?: HTMLElement;
  source: HTMLElement;
  overContainer?: HTMLElement;
  sourceContainer?: HTMLElement;
  originalSource?: HTMLElement;
  pressure?: number;
  draggable?: string;
  sensorEvent?: SensorEvent;
  originalEvent?: Event;
};

export class DragEvent<
  T extends DragEventDetail = DragEventDetail
> extends CustomEvent<T> {
  constructor(
    eventInitDict?: CustomEventInit<T>,
    type: string = DragEvent.type
  ) {
    super(type, eventInitDict);
  }

  get source() {
    return this.detail.source;
  }

  get originalSource() {
    return this.detail.originalSource;
  }

  get mirror() {
    return this.detail.mirror;
  }

  get sourceContainer() {
    return this.detail.sourceContainer;
  }

  get sensorEvent() {
    return this.detail.sensorEvent;
  }

  get originalEvent() {
    return this.sensorEvent ? this.sensorEvent.originalEvent : null;
  }

  get overContainer() {
    return this.detail.overContainer;
  }

  clone = (detail?: Partial<T>) =>
    new DragEvent(
      { cancelable: this.cancelable, detail: { ...this.detail, ...detail } },
      this.type
    );

  static type = 'drag';
}

export type DragStartEventDetail = DragEventDetail & {
  originalSource: HTMLElement;
  sourceContainer: HTMLElement;
  sensorEvent: SensorEvent;
};

export class DragStartEvent extends DragEvent<DragStartEventDetail> {
  constructor(detail: DragStartEventDetail) {
    super(
      { cancelable: DragStartEvent.cancelable, detail },
      DragStartEvent.type
    );
  }

  get originalSource() {
    return this.detail.originalSource;
  }

  get sourceContainer() {
    return this.detail.sourceContainer;
  }

  get sensorEvent() {
    return this.detail.sensorEvent;
  }

  static type = 'drag:start';
  static cancelable = true;
}

export class DragMoveEvent extends DragEvent<DragEventDetail> {
  constructor(detail: DragEventDetail) {
    super({ detail, cancelable: DragMoveEvent.cancelable }, DragMoveEvent.type);
  }

  static type = 'drag:move';
  static cancelable = true;
}

export type DragOverEventDetail = DragEventDetail & {
  overContainer: HTMLElement;
  over: HTMLElement;
};

export class DragOverEvent extends DragEvent<DragOverEventDetail> {
  constructor(detail: DragOverEventDetail) {
    super({ cancelable: DragOverEvent.cancelable, detail }, DragOverEvent.type);
  }

  get overContainer() {
    return this.detail.overContainer;
  }

  get over() {
    return this.detail.over;
  }

  static type = 'drag:over';
  static cancelable = true;
}

export type DragOutEventDetail = DragEventDetail & {
  overContainer: HTMLElement;
  over: HTMLElement;
};

export class DragOutEvent extends DragEvent<DragOutEventDetail> {
  constructor(detail: DragOutEventDetail) {
    super({ detail }, DragOutEvent.type);
  }

  get overContainer() {
    return this.detail.overContainer;
  }

  get over() {
    return this.detail.over;
  }

  static type = 'drag:out';
}

export type DragOverContainerEventDetail = DragEventDetail & {
  overContainer: HTMLElement;
};

export class DragOverContainerEvent extends DragEvent<DragOverContainerEventDetail> {
  constructor(detail: DragOverContainerEventDetail) {
    super({ detail }, DragOverContainerEvent.type);
  }

  get overContainer() {
    return this.detail.overContainer;
  }

  get over() {
    return this.detail.overContainer;
  }

  static type = 'drag:over:container';
}

export type DragOutContainerEventDetail = DragEventDetail & {
  overContainer: HTMLElement;
};

export class DragOutContainerEvent extends DragEvent<DragOutContainerEventDetail> {
  constructor(detail: DragOutContainerEventDetail) {
    super({ detail }, DragOutContainerEvent.type);
  }

  get overContainer() {
    return this.detail.overContainer;
  }

  static type = 'drag:out:container';
}

export type DragPressureEventDetail = DragEventDetail & {
  pressure?: number;
};

export class DragPressureEvent extends DragEvent<DragPressureEventDetail> {
  constructor(detail: DragPressureEventDetail) {
    super({ detail }, DragPressureEvent.type);
  }

  get pressure() {
    return this.detail.pressure;
  }

  static type = 'drag:pressure';
}

export type DragStopEventDetail = DragEventDetail & {
  originalSource: HTMLElement;
  sourceContainer: HTMLElement;
};

export class DragStopEvent extends DragEvent<DragStopEventDetail> {
  constructor(detail: DragStopEventDetail) {
    super({ cancelable: DragStopEvent.cancelable, detail }, DragStopEvent.type);
  }

  get originalSource() {
    return this.detail.originalSource;
  }

  get sourceContainer() {
    return this.detail.sourceContainer;
  }

  static type = 'drag:stop';
  static cancelable = true;
}

export class DragStoppedEvent extends DragEvent<DragEventDetail> {
  constructor(detail: DragEventDetail) {
    super({ detail }, DragStoppedEvent.type);
  }

  static type = 'drag:stopped';
}
