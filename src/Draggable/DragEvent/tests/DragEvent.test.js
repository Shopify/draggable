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
} from '../DragEvent';

describe('DragEvent', () => {
  describe('#constructor', () => {
    it('should be instance of DragEvent', () => {
      const event = new DragEvent();

      expect(event).toBeInstanceOf(DragEvent);
    });

    it('should initialize with `type` of `event`', () => {
      const event = new DragEvent();

      expect(event.type).toBe('drag');
    });

    it('should initialize with source', () => {
      const event = new DragEvent({
        source: 'expected source',
      });

      expect(event.source).toBe('expected source');
    });

    it('should initialize with mirror', () => {
      const event = new DragEvent({
        mirror: 'expected mirror',
      });

      expect(event.mirror).toBe('expected mirror');
    });

    it('should initialize with sourceContainer', () => {
      const event = new DragEvent({
        sourceContainer: 'expected sourceContainer',
      });

      expect(event.sourceContainer).toBe('expected sourceContainer');
    });

    it('should initialize with sensorEvent', () => {
      const event = new DragEvent({
        sensorEvent: 'expected sensorEvent',
      });

      expect(event.sensorEvent).toBe('expected sensorEvent');
    });

    it('should initialize with originalEvent', () => {
      const event = new DragEvent({
        sensorEvent: {
          originalEvent: 'expected originalEvent',
        },
      });

      expect(event.originalEvent).toBe('expected originalEvent');
    });
  });

  describe('#originalEvent', () => {
    it('should return null when initialized without sensorEvent', () => {
      const event = new DragEvent({});

      expect(event.originalEvent).toBeNull();
    });
  });
});

describe('DragStartEvent', () => {
  describe('#constructor', () => {
    it('should be instance of DragStartEvent', () => {
      const event = new DragStartEvent();

      expect(event).toBeInstanceOf(DragStartEvent);
    });

    it('should initialize with `type` of `drag:start`', () => {
      const event = new DragStartEvent();

      expect(event.type).toBe('drag:start');
    });
  });
});

describe('DragMoveEvent', () => {
  describe('#constructor', () => {
    it('should be instance of DragMoveEvent', () => {
      const event = new DragMoveEvent();

      expect(event).toBeInstanceOf(DragMoveEvent);
    });

    it('should initialize with `type` of `drag:move`', () => {
      const event = new DragMoveEvent();

      expect(event.type).toBe('drag:move');
    });
  });
});

describe('DragOutContainerEvent', () => {
  describe('#constructor', () => {
    it('should be instance of DragOutContainerEvent', () => {
      const event = new DragOutContainerEvent();

      expect(event).toBeInstanceOf(DragOutContainerEvent);
    });

    it('should initialize with `type` of `drag:out:container`', () => {
      const event = new DragOutContainerEvent();

      expect(event.type).toBe('drag:out:container');
    });

    it('should initialize with overContainer', () => {
      const event = new DragOutContainerEvent({
        overContainer: 'expected overContainer',
      });

      expect(event.overContainer).toBe('expected overContainer');
    });
  });
});

describe('DragOutEvent', () => {
  describe('#constructor', () => {
    it('should be instance of DragOutEvent', () => {
      const event = new DragOutEvent();

      expect(event).toBeInstanceOf(DragOutEvent);
    });

    it('should initialize with `type` of `drag:out`', () => {
      const event = new DragOutEvent();

      expect(event.type).toBe('drag:out');
    });

    it('should initialize with overContainer', () => {
      const event = new DragOutEvent({
        overContainer: 'expected overContainer',
      });

      expect(event.overContainer).toBe('expected overContainer');
    });

    it('should initialize with over', () => {
      const event = new DragOutEvent({
        over: 'expected over',
      });

      expect(event.over).toBe('expected over');
    });
  });
});

describe('DragOverContainerEvent', () => {
  describe('#constructor', () => {
    it('should be instance of DragOverContainerEvent', () => {
      const event = new DragOverContainerEvent();

      expect(event).toBeInstanceOf(DragOverContainerEvent);
    });

    it('should initialize with `type` of `drag:over:container`', () => {
      const event = new DragOverContainerEvent();

      expect(event.type).toBe('drag:over:container');
    });

    it('should initialize with overContainer', () => {
      const event = new DragOverContainerEvent({
        overContainer: 'expected overContainer',
      });

      expect(event.overContainer).toBe('expected overContainer');
    });
  });
});

describe('DragOverEvent', () => {
  describe('#constructor', () => {
    it('should be instance of DragOverEvent', () => {
      const event = new DragOverEvent();

      expect(event).toBeInstanceOf(DragOverEvent);
    });

    it('should initialize with `type` of `drag:over`', () => {
      const event = new DragOverEvent();

      expect(event.type).toBe('drag:over');
    });

    it('should initialize with overContainer', () => {
      const event = new DragOverEvent({
        overContainer: 'expected overContainer',
      });

      expect(event.overContainer).toBe('expected overContainer');
    });

    it('should initialize with over', () => {
      const event = new DragOverEvent({
        over: 'expected over',
      });

      expect(event.over).toBe('expected over');
    });
  });
});

describe('DragPressureEvent', () => {
  describe('#constructor', () => {
    it('should be instance of DragPressureEvent', () => {
      const event = new DragPressureEvent();

      expect(event).toBeInstanceOf(DragPressureEvent);
    });

    it('should initialize with `type` of `drag:pressure`', () => {
      const event = new DragPressureEvent();

      expect(event.type).toBe('drag:pressure');
    });

    it('should initialize with pressure', () => {
      const event = new DragPressureEvent({
        pressure: 'expected pressure',
      });

      expect(event.pressure).toBe('expected pressure');
    });
  });
});

describe('DragStopEvent', () => {
  describe('#constructor', () => {
    it('should be instance of DragStopEvent', () => {
      const event = new DragStopEvent();

      expect(event).toBeInstanceOf(DragStopEvent);
    });

    it('should initialize with `type` of `drag:stop`', () => {
      const event = new DragStopEvent();

      expect(event.type).toBe('drag:stop');
    });
  });
});
