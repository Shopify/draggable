import AbstractEvent from './abstract-event';

export class DragEvent extends AbstractEvent {
  get source() {
    return this.data.source;
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
    if (this.sensorEvent) {
      return this.sensorEvent.originalEvent;
    }

    return null;
  }

  hasMirror() {
    return Boolean(this.mirror);
  }
}

export class DragStartEvent extends DragEvent {
  static type = 'drag:start';
}

export class DragMoveEvent extends DragEvent {
  static type = 'drag:move';
}

export class DragOutContainerEvent extends DragEvent {
  static type = 'drag:out:container';

  get overContainer() {
    return this.data.overContainer;
  }
}

export class DragOutEvent extends DragEvent {
  static type = 'drag:out';

  get overContainer() {
    return this.data.overContainer;
  }

  get over() {
    return this.data.over;
  }
}

export class DragOverContainerEvent extends DragEvent {
  static type = 'drag:over:container';

  get overContainer() {
    return this.data.overContainer;
  }
}

export class DragOverEvent extends DragEvent {
  static type = 'drag:over';

  get overContainer() {
    return this.data.overContainer;
  }

  get over() {
    return this.data.over;
  }
}

export class DragPressureEvent extends DragEvent {
  static type = 'drag:pressure';

  get pressure() {
    return this.data.pressure;
  }
}

export class DragStopEvent extends DragEvent {
  static type = 'drag:stop';
}
