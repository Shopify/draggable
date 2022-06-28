import {SensorEvent} from 'Draggable/Sensors/SensorEvent';
import AbstractEvent from 'shared/AbstractEvent';

interface DragEventData {
  source: HTMLElement;
  originalSource: HTMLElement;
  mirror: HTMLElement;
  sourceContainer: HTMLElement;
  sensorEvent: SensorEvent;
}

/**
 * Base drag event
 * @class DragEvent
 * @module DragEvent
 * @extends AbstractEvent
 */
export class DragEvent extends AbstractEvent {
  declare data: DragEventData;

  get source() {
    return this.data.source;
  }

  get originalSource() {
    return this.data.originalSource;
  }

  get mirror() {
    return this.data.mirror;
  }

  /*** Draggables source container element */
  get sourceContainer() {
    return this.data.sourceContainer;
  }

  /*** Sensor event*/
  get sensorEvent() {
    return this.data.sensorEvent;
  }

  /*** Original event that triggered sensor event */
  get originalEvent() {
    return this.sensorEvent ? this.sensorEvent.originalEvent : null;
  }

  static type = 'drag';
}

/**
 * Drag start event
 * @class DragStartEvent
 * @module DragStartEvent
 * @extends DragEvent
 */
export class DragStartEvent extends DragEvent {
  static type = 'drag:start';
  static cancelable = true;
}

/**
 * Drag move event
 * @class DragMoveEvent
 * @module DragMoveEvent
 * @extends DragEvent
 */
export class DragMoveEvent extends DragEvent {
  static type = 'drag:move';
}

/**
 * Drag over event
 * @class DragOverEvent
 * @module DragOverEvent
 * @extends DragEvent
 */
export class DragOverEvent extends DragEvent {
  declare data: DragEventData & {
    overContainer: HTMLElement;
    over: HTMLElement;
  };

  /*** Draggable container you are over */
  get overContainer() {
    return this.data.overContainer;
  }

  /*** Draggable element you are over */
  get over() {
    return this.data.over;
  }

  static type = 'drag:over';
  static cancelable = true;
}

/**
 * Drag out event
 * @class DragOutEvent
 * @module DragOutEvent
 * @extends DragEvent
 */
export class DragOutEvent extends DragEvent {
  static type = 'drag:out';

  declare data: DragEventData & {
    overContainer: HTMLElement;
    over: HTMLElement;
  };

  /*** Draggable container you are over */
  get overContainer() {
    return this.data.overContainer;
  }

  /*** Draggable element you left */
  get over() {
    return this.data.over;
  }
}

/**
 * Drag over container event
 * @class DragOverContainerEvent
 * @module DragOverContainerEvent
 * @extends DragEvent
 */
export class DragOverContainerEvent extends DragEvent {
  static type = 'drag:over:container';

  declare data: DragEventData & {
    overContainer: HTMLElement;
    over: HTMLElement;
  };

  /*** Draggable container you are over */
  get overContainer() {
    return this.data.overContainer;
  }

  /*** Draggable element you are over */
  get over() {
    return this.data.over;
  }
}

/**
 * Drag out container event
 * @class DragOutContainerEvent
 * @module DragOutContainerEvent
 * @extends DragEvent
 */
export class DragOutContainerEvent extends DragEvent {
  static type = 'drag:out:container';

  declare data: DragEventData & {
    overContainer: HTMLElement;
  };

  /*** Draggable container you left */
  get overContainer() {
    return this.data.overContainer;
  }
}

export class DragPressureEvent extends DragEvent {
  static type = 'drag:pressure';

  declare data: DragEventData & {
    pressure: number;
  };

  get pressure() {
    return this.data.pressure;
  }
}

export class DragStopEvent extends DragEvent {
  static type = 'drag:stop';
  static cancelable = true;
}

/**
 * (Added in: v1.0.0-beta.12)
 *
 * Drag stopped event
 * @class DragStoppedEvent
 * @module DragStoppedEvent
 * @extends DragEvent
 */
export class DragStoppedEvent extends DragEvent {
  static type = 'drag:stopped';
}
