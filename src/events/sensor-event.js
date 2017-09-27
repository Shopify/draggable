import AbstractEvent from './abstract-event';

export class SensorEvent extends AbstractEvent {
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

  get overContainer() {
    return this.data.overContainer;
  }

  get pressure() {
    return this.data.pressure;
  }
}

export class DragStartSensorEvent extends SensorEvent {
  static type = 'drag:start';
}

export class DragMoveSensorEvent extends SensorEvent {
  static type = 'drag:move';
}

export class DragStopSensorEvent extends SensorEvent {
  static type = 'drag:stop';
}

export class DragPressureSensorEvent extends SensorEvent {
  static type = 'drag:pressure';
}
