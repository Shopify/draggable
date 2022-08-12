import AbstractEvent from '../../shared/AbstractEvent';
import { SensorEvent } from '../Sensors/SensorEvent';

type DragEventData = {
  mirror?: HTMLElement;
  over?: HTMLElement;
  source: HTMLElement;
  overContainer?: HTMLElement;
  sourceContainer?: HTMLElement;
  originalSource?: HTMLElement;
  pressure?: number;
  draggable?: string;
  detail?: SensorEvent;
  sensorEvent?: SensorEvent;
  originalEvent?: Event;
};

export class DragEvent extends AbstractEvent {
  declare data: DragEventData;

  constructor(data?: DragEventData) {
    super(data);
  }

  get source() {
    return this.data.source;
  }

  get originalSource() {
    return this.data.originalSource;
  }

  get mirror() {
    return this.data.mirror;
  }

  get sourceContainer() {
    return this.data.sourceContainer;
  }

  get sensorEvent() {
    return this.data.sensorEvent;
  }

  get originalEvent() {
    return this.sensorEvent ? this.sensorEvent.originalEvent : null;
  }

  get detail() {
    return this.detail;
  }

  clone(data) {
    return new DragEvent({
      ...this.data,
      ...data,
    });
  }

  static type = 'drag';
}

export class DragStartEvent extends DragEvent {
  declare data: Omit<DragEventData, 'originalSource' | 'sourceContainer'> & {
    originalSource: HTMLElement;
    sourceContainer: HTMLElement;
    sensorEvent: SensorEvent;
  };

  clone(data) {
    return new DragStartEvent({
      ...this.data,
      ...data,
    });
  }

  get originalSource() {
    return this.data.originalSource;
  }

  get sourceContainer() {
    return this.data.sourceContainer;
  }

  get sensorEvent() {
    return this.data.sensorEvent;
  }

  static type = 'drag:start';
  static cancelable = true;
}

export class DragMoveEvent extends DragEvent {
  clone(data) {
    return new DragMoveEvent({
      ...this.data,
      ...data,
    });
  }

  static type = 'drag:move';
}

export class DragOverEvent extends DragEvent {
  declare data: DragEventData & {
    overContainer: HTMLElement;
    over: HTMLElement;
  };

  get overContainer() {
    return this.data.overContainer;
  }

  get over() {
    return this.data.over;
  }

  static type = 'drag:over';
  static cancelable = true;

  clone(data) {
    return new DragOverEvent({
      ...this.data,
      ...data,
    });
  }
}

export class DragOutEvent extends DragEvent {
  static type = 'drag:out';

  declare data: DragEventData & {
    overContainer: HTMLElement;
    over: HTMLElement;
  };

  get overContainer() {
    return this.data.overContainer;
  }

  get over() {
    return this.data.over;
  }

  clone(data) {
    return new DragOutEvent({
      ...this.data,
      ...data,
    });
  }
}

export class DragOverContainerEvent extends DragEvent {
  static type = 'drag:over:container';

  declare data: DragEventData & {
    overContainer: HTMLElement;
    over: HTMLElement;
  };

  get overContainer() {
    return this.data.overContainer;
  }

  get over() {
    return this.data.over;
  }

  clone(data) {
    return new DragOverContainerEvent({
      ...this.data,
      ...data,
    });
  }
}

export class DragOutContainerEvent extends DragEvent {
  static type = 'drag:out:container';

  declare data: DragEventData & {
    overContainer: HTMLElement;
  };

  get overContainer() {
    return this.data.overContainer;
  }

  clone(data) {
    return new DragOutContainerEvent({
      ...this.data,
      ...data,
    });
  }
}

export class DragPressureEvent extends DragEvent {
  static type = 'drag:pressure';

  declare data: DragEventData & {
    pressure?: number;
  };

  get pressure() {
    return this.data.pressure;
  }

  clone(data) {
    return new DragPressureEvent({
      ...this.data,
      ...data,
    });
  }
}

export class DragStopEvent extends DragEvent {
  declare data: Omit<DragEventData, 'originalSource'> & {
    originalSource: HTMLElement;
    sourceContainer: HTMLElement;
  };

  static type = 'drag:stop';
  static cancelable = true;

  get originalSource() {
    return this.data.originalSource;
  }

  get sourceContainer() {
    return this.data.sourceContainer;
  }

  clone(data) {
    return new DragStopEvent({
      ...this.data,
      ...data,
    });
  }
}

export class DragStoppedEvent extends DragEvent {
  static type = 'drag:stopped';

  clone(data) {
    return new DragStoppedEvent({
      ...this.data,
      ...data,
    });
  }
}
