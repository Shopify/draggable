import {
  DragEvent,
  DragMoveEvent,
  DragOutContainerEvent,
  DragOutEvent,
  DragOverContainerEvent,
  DragOverEvent,
  DragPressureEvent,
  DragStartEvent,
  DragStopEvent,
  DragStoppedEvent,
} from '../DragEvent';
import {SensorEvent} from '../../Sensors/SensorEvent';

const sensorEvent = new SensorEvent({
  originalEvent: new Event('click'),
  clientX: 0,
  clientY: 0,
  target: document.createElement('div'),
  container: document.createElement('div'),
  originalSource: document.createElement('div'),
  pressure: 0,
});

const defaultDragEventOptions = {
  source: document.createElement('div'),
  originalSource: document.createElement('div'),
  mirror: document.createElement('div'),
  sourceContainer: document.createElement('div'),
  sensorEvent,
};

describe('DragEvent', () => {
  describe('#constructor', () => {
    it('should be instance of DragEvent', () => {
      const event = new DragEvent(defaultDragEventOptions);

      expect(event).toBeInstanceOf(DragEvent);
    });

    it('should initialize with `type` of `event`', () => {
      const event = new DragEvent(defaultDragEventOptions);

      expect(event.type).toBe('drag');
    });

    it('should initialize with source', () => {
      const source = document.createElement('div');

      const event = new DragEvent({
        ...defaultDragEventOptions,
        source,
      });

      expect(event.source).toBe(source);
    });

    it('should initialize with mirror', () => {
      const mirror = document.createElement('div');

      const event = new DragEvent({
        ...defaultDragEventOptions,
        mirror,
      });

      expect(event.mirror).toBe(mirror);
    });

    it('should initialize with sourceContainer', () => {
      const sourceContainer = document.createElement('div');

      const event = new DragEvent({
        ...defaultDragEventOptions,
        sourceContainer,
      });

      expect(event.sourceContainer).toBe(sourceContainer);
    });

    it('should initialize with sensorEvent', () => {
      const event = new DragEvent(defaultDragEventOptions);

      expect(event.sensorEvent).toBe(defaultDragEventOptions.sensorEvent);
    });

    it('should initialize with originalEvent', () => {
      const originalEvent = new Event('click');

      const event = new DragEvent({
        ...defaultDragEventOptions,
        sensorEvent: new SensorEvent({
          ...sensorEvent.data,
          originalEvent,
        }),
      });

      expect(event.originalEvent).toBe(originalEvent);
    });
  });

  describe('#originalEvent', () => {
    it('should return null when initialized without sensorEvent', () => {
      const event = new DragEvent({
        ...defaultDragEventOptions,
        sensorEvent: new SensorEvent({
          ...sensorEvent.data,
          originalEvent: undefined,
        }),
      });

      expect(event.originalEvent).toBeUndefined();
    });
  });
});

describe('DragStartEvent', () => {
  describe('#constructor', () => {
    it('should be instance of DragStartEvent', () => {
      const event = new DragStartEvent(defaultDragEventOptions);

      expect(event).toBeInstanceOf(DragStartEvent);
    });

    it('should initialize with `type` of `drag:start`', () => {
      const event = new DragStartEvent(defaultDragEventOptions);

      expect(event.type).toBe('drag:start');
    });
  });
});

describe('DragMoveEvent', () => {
  describe('#constructor', () => {
    it('should be instance of DragMoveEvent', () => {
      const event = new DragMoveEvent(defaultDragEventOptions);

      expect(event).toBeInstanceOf(DragMoveEvent);
    });

    it('should initialize with `type` of `drag:move`', () => {
      const event = new DragMoveEvent(defaultDragEventOptions);

      expect(event.type).toBe('drag:move');
    });
  });
});

const defaultDragOutContainerEventOptions = {
  ...defaultDragEventOptions,
  overContainer: document.createElement('div'),
};

describe('DragOutContainerEvent', () => {
  describe('#constructor', () => {
    it('should be instance of DragOutContainerEvent', () => {
      const event = new DragOutContainerEvent(
        defaultDragOutContainerEventOptions,
      );

      expect(event).toBeInstanceOf(DragOutContainerEvent);
    });

    it('should initialize with `type` of `drag:out:container`', () => {
      const event = new DragOutContainerEvent(
        defaultDragOutContainerEventOptions,
      );

      expect(event.type).toBe('drag:out:container');
    });

    it('should initialize with overContainer', () => {
      const overContainer = document.createElement('div');

      const event = new DragOutContainerEvent({
        ...defaultDragOutContainerEventOptions,
        overContainer,
      });

      expect(event.overContainer).toBe(overContainer);
    });
  });
});

const defaultDragOutEventOptions = {
  ...defaultDragEventOptions,
  overContainer: document.createElement('div'),
  over: document.createElement('div'),
};

describe('DragOutEvent', () => {
  describe('#constructor', () => {
    it('should be instance of DragOutEvent', () => {
      const event = new DragOutEvent(defaultDragOutEventOptions);

      expect(event).toBeInstanceOf(DragOutEvent);
    });

    it('should initialize with `type` of `drag:out`', () => {
      const event = new DragOutEvent(defaultDragOutEventOptions);

      expect(event.type).toBe('drag:out');
    });

    it('should initialize with overContainer', () => {
      const overContainer = document.createElement('div');

      const event = new DragOutEvent({
        ...defaultDragOutEventOptions,
        overContainer,
      });

      expect(event.overContainer).toBe(overContainer);
    });

    it('should initialize with over', () => {
      const over = document.createElement('div');

      const event = new DragOutEvent({
        ...defaultDragOutEventOptions,
        over,
      });

      expect(event.over).toBe(over);
    });
  });
});

const defaultDragOverContainerEventOptions = {
  ...defaultDragEventOptions,
  overContainer: document.createElement('div'),
  over: document.createElement('div'),
};

describe('DragOverContainerEvent', () => {
  describe('#constructor', () => {
    it('should be instance of DragOverContainerEvent', () => {
      const event = new DragOverContainerEvent(
        defaultDragOverContainerEventOptions,
      );

      expect(event).toBeInstanceOf(DragOverContainerEvent);
    });

    it('should initialize with `type` of `drag:over:container`', () => {
      const event = new DragOverContainerEvent(
        defaultDragOverContainerEventOptions,
      );

      expect(event.type).toBe('drag:over:container');
    });

    it('should initialize with overContainer', () => {
      const overContainer = document.createElement('div');

      const event = new DragOverContainerEvent({
        ...defaultDragOverContainerEventOptions,
        overContainer,
      });

      expect(event.overContainer).toBe(overContainer);
    });
  });
});

const defaultDragOverEventOptions = {
  ...defaultDragEventOptions,
  overContainer: document.createElement('div'),
  over: document.createElement('div'),
};

describe('DragOverEvent', () => {
  describe('#constructor', () => {
    it('should be instance of DragOverEvent', () => {
      const event = new DragOverEvent(defaultDragOverEventOptions);

      expect(event).toBeInstanceOf(DragOverEvent);
    });

    it('should initialize with `type` of `drag:over`', () => {
      const event = new DragOverEvent(defaultDragOverEventOptions);

      expect(event.type).toBe('drag:over');
    });

    it('should initialize with overContainer', () => {
      const overContainer = document.createElement('div');

      const event = new DragOverEvent({
        ...defaultDragOverEventOptions,
        overContainer,
      });

      expect(event.overContainer).toBe(overContainer);
    });

    it('should initialize with over', () => {
      const over = document.createElement('div');

      const event = new DragOverEvent({
        ...defaultDragOverEventOptions,
        over,
      });

      expect(event.over).toBe(over);
    });
  });
});

const defaultDragPressureEventOptions = {
  ...defaultDragEventOptions,
  pressure: 0,
};

describe('DragPressureEvent', () => {
  describe('#constructor', () => {
    it('should be instance of DragPressureEvent', () => {
      const event = new DragPressureEvent(defaultDragPressureEventOptions);

      expect(event).toBeInstanceOf(DragPressureEvent);
    });

    it('should initialize with `type` of `drag:pressure`', () => {
      const event = new DragPressureEvent(defaultDragPressureEventOptions);

      expect(event.type).toBe('drag:pressure');
    });

    it('should initialize with pressure', () => {
      const pressure = 0.5;

      const event = new DragPressureEvent({
        ...defaultDragPressureEventOptions,
        pressure,
      });

      expect(event.pressure).toBe(pressure);
    });
  });
});

describe('DragStopEvent', () => {
  describe('#constructor', () => {
    it('should be instance of DragStopEvent', () => {
      const event = new DragStopEvent(defaultDragEventOptions);

      expect(event).toBeInstanceOf(DragStopEvent);
    });

    it('should initialize with `type` of `drag:stop`', () => {
      const event = new DragStopEvent(defaultDragEventOptions);

      expect(event.type).toBe('drag:stop');
    });
  });
});

describe('DragStoppedEvent', () => {
  describe('#constructor', () => {
    it('should be instance of DragStoppedEvent', () => {
      const event = new DragStoppedEvent(defaultDragEventOptions);

      expect(event).toBeInstanceOf(DragStoppedEvent);
    });

    it('should initialize with `type` of `drag:stopped`', () => {
      const event = new DragStoppedEvent(defaultDragEventOptions);

      expect(event.type).toBe('drag:stopped');
    });
  });
});
