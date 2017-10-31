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
} from './../DragEvent';

describe('DragEvent', () => {
  describe('#constructor', () => {
    test('should be instance of DragEvent', () => {
      const event = new DragEvent();

      expect(event).toBeInstanceOf(DragEvent);
    });

    test('should initialize with `type` of `event`', () => {
      const event = new DragEvent();

      expect(event.type).toBe('event');
    });

    test('should initialize with source', () => {
      const event = new DragEvent({
        source: 'expected source',
      });

      expect(event.source).toBe('expected source');
    });

    test('should initialize with mirror', () => {
      const event = new DragEvent({
        mirror: 'expected mirror',
      });

      expect(event.mirror).toBe('expected mirror');
    });

    test('should initialize with sourceContainer', () => {
      const event = new DragEvent({
        sourceContainer: 'expected sourceContainer',
      });

      expect(event.sourceContainer).toBe('expected sourceContainer');
    });

    test('should initialize with sensorEvent', () => {
      const event = new DragEvent({
        sensorEvent: 'expected sensorEvent',
      });

      expect(event.sensorEvent).toBe('expected sensorEvent');
    });

    test('should initialize with originalEvent', () => {
      const event = new DragEvent({
        sensorEvent: {
          originalEvent: 'expected originalEvent',
        },
      });

      expect(event.originalEvent).toBe('expected originalEvent');
    });
  });

  describe('#originalEvent', () => {
    test('should return null when initialized without sensorEvent', () => {
      const event = new DragEvent({});

      expect(event.originalEvent).toBe(null);
    });
  });

  describe('#hasMirror', () => {
    test('should return true when event has mirror', () => {
      const event = new DragEvent({
        mirror: true,
      });

      expect(event.hasMirror()).toBe(true);
    });

    test('should return false when event does not have mirror', () => {
      const event = new DragEvent({});

      expect(event.hasMirror()).toBe(false);
    });
  });
});

describe('DragStartEvent', () => {
  describe('#constructor', () => {
    test('should be instance of DragStartEvent', () => {
      const event = new DragStartEvent();

      expect(event).toBeInstanceOf(DragStartEvent);
    });

    test('should initialize with `type` of `drag:start`', () => {
      const event = new DragStartEvent();

      expect(event.type).toBe('drag:start');
    });
  });
});

describe('DragMoveEvent', () => {
  describe('#constructor', () => {
    test('should be instance of DragMoveEvent', () => {
      const event = new DragMoveEvent();

      expect(event).toBeInstanceOf(DragMoveEvent);
    });

    test('should initialize with `type` of `drag:move`', () => {
      const event = new DragMoveEvent();

      expect(event.type).toBe('drag:move');
    });
  });
});

describe('DragOutContainerEvent', () => {
  describe('#constructor', () => {
    test('should be instance of DragOutContainerEvent', () => {
      const event = new DragOutContainerEvent();

      expect(event).toBeInstanceOf(DragOutContainerEvent);
    });

    test('should initialize with `type` of `drag:out:container`', () => {
      const event = new DragOutContainerEvent();

      expect(event.type).toBe('drag:out:container');
    });

    test('should initialize with overContainer', () => {
      const event = new DragOutContainerEvent({
        overContainer: 'expected overContainer',
      });

      expect(event.overContainer).toBe('expected overContainer');
    });
  });
});

describe('DragOutEvent', () => {
  describe('#constructor', () => {
    test('should be instance of DragOutEvent', () => {
      const event = new DragOutEvent();

      expect(event).toBeInstanceOf(DragOutEvent);
    });

    test('should initialize with `type` of `drag:out`', () => {
      const event = new DragOutEvent();

      expect(event.type).toBe('drag:out');
    });

    test('should initialize with overContainer', () => {
      const event = new DragOutEvent({
        overContainer: 'expected overContainer',
      });

      expect(event.overContainer).toBe('expected overContainer');
    });

    test('should initialize with over', () => {
      const event = new DragOutEvent({
        over: 'expected over',
      });

      expect(event.over).toBe('expected over');
    });
  });
});

describe('DragOverContainerEvent', () => {
  describe('#constructor', () => {
    test('should be instance of DragOverContainerEvent', () => {
      const event = new DragOverContainerEvent();

      expect(event).toBeInstanceOf(DragOverContainerEvent);
    });

    test('should initialize with `type` of `drag:over:container`', () => {
      const event = new DragOverContainerEvent();

      expect(event.type).toBe('drag:over:container');
    });

    test('should initialize with overContainer', () => {
      const event = new DragOverContainerEvent({
        overContainer: 'expected overContainer',
      });

      expect(event.overContainer).toBe('expected overContainer');
    });
  });
});

describe('DragOverEvent', () => {
  describe('#constructor', () => {
    test('should be instance of DragOverEvent', () => {
      const event = new DragOverEvent();

      expect(event).toBeInstanceOf(DragOverEvent);
    });

    test('should initialize with `type` of `drag:over`', () => {
      const event = new DragOverEvent();

      expect(event.type).toBe('drag:over');
    });

    test('should initialize with overContainer', () => {
      const event = new DragOverEvent({
        overContainer: 'expected overContainer',
      });

      expect(event.overContainer).toBe('expected overContainer');
    });

    test('should initialize with over', () => {
      const event = new DragOverEvent({
        over: 'expected over',
      });

      expect(event.over).toBe('expected over');
    });
  });
});

describe('DragPressureEvent', () => {
  describe('#constructor', () => {
    test('should be instance of DragPressureEvent', () => {
      const event = new DragPressureEvent();

      expect(event).toBeInstanceOf(DragPressureEvent);
    });

    test('should initialize with `type` of `drag:pressure`', () => {
      const event = new DragPressureEvent();

      expect(event.type).toBe('drag:pressure');
    });

    test('should initialize with pressure', () => {
      const event = new DragPressureEvent({
        pressure: 'expected pressure',
      });

      expect(event.pressure).toBe('expected pressure');
    });
  });
});

describe('DragStopEvent', () => {
  describe('#constructor', () => {
    test('should be instance of DragStopEvent', () => {
      const event = new DragStopEvent();

      expect(event).toBeInstanceOf(DragStopEvent);
    });

    test('should initialize with `type` of `drag:stop`', () => {
      const event = new DragStopEvent();

      expect(event.type).toBe('drag:stop');
    });
  });
});
