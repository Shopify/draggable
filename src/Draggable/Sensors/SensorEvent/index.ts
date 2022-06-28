import AbstractEvent from 'shared/AbstractEvent';

export class SensorEvent extends AbstractEvent {
  declare data: {
    originalEvent?: Event;
    clientX?: number;
    clientY?: number;
    target?: HTMLElement;
    container?: HTMLElement;
    originalSource?: HTMLElement;
    pressure?: number;
  };

  get originalEvent() {
    return this.data.originalEvent;
  }

  get clientX() {
    return this.data.clientX;
  }

  get clientY() {
    return this.data.clientY;
  }

  get target() {
    return this.data.target;
  }

  get container() {
    return this.data.container;
  }

  get originalSource() {
    return this.data.originalSource;
  }

  get pressure() {
    return this.data.pressure;
  }

  clone(data) {
    return new SensorEvent({
      ...this.data,
      ...data,
    });
  }
}

export class DragStartSensorEvent extends SensorEvent {
  static type = 'drag:start';

  clone(data) {
    return new DragStartSensorEvent({
      ...this.data,
      ...data,
    });
  }
}

export class DragMoveSensorEvent extends SensorEvent {
  static type = 'drag:move';

  clone(data) {
    return new DragMoveSensorEvent({
      ...this.data,
      ...data,
    });
  }
}

export class DragStopSensorEvent extends SensorEvent {
  static type = 'drag:stop';

  clone(data) {
    return new DragStopSensorEvent({
      ...this.data,
      ...data,
    });
  }
}

export class DragPressureSensorEvent extends SensorEvent {
  static type = 'drag:pressure';

  clone(data) {
    return new DragPressureSensorEvent({
      ...this.data,
      ...data,
    });
  }
}
