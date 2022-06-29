import AbstractEvent from 'shared/AbstractEvent';

export type SensorEventData = {
  originalEvent?: Event;
  clientX?: number;
  clientY?: number;
  target?: HTMLElement;
  container?: HTMLElement;
  originalSource?: HTMLElement;
  pressure?: number;
};

export class SensorEvent extends AbstractEvent {
  declare data: SensorEventData;

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
  clone(data) {
    return new DragStartSensorEvent({
      ...this.data,
      ...data,
    });
  }

  static type = 'drag:start';
}

export class DragMoveSensorEvent extends SensorEvent {
  clone(data) {
    return new DragMoveSensorEvent({
      ...this.data,
      ...data,
    });
  }

  static type = 'drag:move';
}

export class DragStopSensorEvent extends SensorEvent {
  clone(data) {
    return new DragStopSensorEvent({
      ...this.data,
      ...data,
    });
  }

  static type = 'drag:stop';
}

export class DragPressureSensorEvent extends SensorEvent {
  clone(data) {
    return new DragPressureSensorEvent({
      ...this.data,
      ...data,
    });
  }

  static type = 'drag:pressure';
}
