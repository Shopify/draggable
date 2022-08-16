export type SensorEventDetail = {
  originalEvent: Event;
  clientX: number;
  clientY: number;
  target: HTMLElement;
  container: HTMLElement;
  originalSource?: HTMLElement;
  type?: string;
  value?: unknown;
  pressure?: number;
};

export class SensorEvent<
  T extends SensorEventDetail = SensorEventDetail
> extends CustomEvent<T> {
  constructor(
    eventInitDict?: CustomEventInit<T>,
    type: string = SensorEvent.type
  ) {
    super(type, eventInitDict);
  }

  get originalEvent() {
    return this.detail.originalEvent;
  }

  get clientX() {
    return this.detail.clientX;
  }

  get clientY() {
    return this.detail.clientY;
  }

  get target() {
    return this.detail.target;
  }

  get container() {
    return this.detail.container;
  }

  get originalSource() {
    return this.detail.originalSource;
  }

  get pressure() {
    return this.detail.pressure;
  }

  clone = (detail: Partial<T>) =>
    new SensorEvent(
      { detail: { ...this.detail, ...detail } },
      SensorEvent.type
    );

  static type = 'sensor';
}

export class DragStartSensorEvent extends SensorEvent {
  constructor(detail: SensorEventDetail) {
    super(
      { detail, cancelable: DragStartSensorEvent.cancelable },
      DragStartSensorEvent.type
    );
  }

  clone = (detail: Partial<SensorEventDetail>) =>
    new DragStartSensorEvent({
      ...this.detail,
      ...detail,
    });

  static type = 'drag:start';
  static cancelable = true;
}

export class DragMoveSensorEvent extends SensorEvent {
  constructor(detail: SensorEventDetail) {
    super({ detail }, DragMoveSensorEvent.type);
  }

  clone = (detail: Partial<SensorEventDetail>) =>
    new DragMoveSensorEvent({
      ...this.detail,
      ...detail,
    });

  static type = 'drag:move';
}

export class DragStopSensorEvent extends SensorEvent {
  constructor(detail: SensorEventDetail) {
    super({ detail }, DragStopSensorEvent.type);
  }

  clone = (detail: Partial<SensorEventDetail>) =>
    new DragStopSensorEvent({
      ...this.detail,
      ...detail,
    });

  static type = 'drag:stop';
}

export class DragPressureSensorEvent extends SensorEvent {
  constructor(detail: SensorEventDetail) {
    super({ detail }, DragPressureSensorEvent.type);
  }

  clone = (detail: Partial<SensorEventDetail>) =>
    new DragPressureSensorEvent({
      ...this.detail,
      ...detail,
    });

  static type = 'drag:pressure';
}
