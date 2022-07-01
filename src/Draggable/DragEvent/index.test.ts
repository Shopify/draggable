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
} from '.';
import { SensorEvent } from '../Sensors/SensorEvent';

describe('DragEvent', () => {
  describe('#constructor', () => {
    it('is instance of DragEvent', () => {
      const event = new DragEvent();

      expect(event).toBeInstanceOf(DragEvent);
    });

    it('initializes with `type` of `event`', () => {
      const event = new DragEvent();

      expect(event.type).toBe('drag');
    });

    it('initializes with source', () => {
      const source = document.createElement('h1');
      const event = new DragEvent({ source });

      expect(event.source).toBe(source);
    });

    it('initializes with mirror', () => {
      const mirror = document.createElement('div');
      const event = new DragEvent({
        mirror,
        source: document.createElement('div'),
      });

      expect(event.mirror).toBe(mirror);
    });

    it('initializes with sourceContainer', () => {
      const sourceContainer = document.createElement('div');
      const event = new DragEvent({
        sourceContainer,
        source: document.createElement('div'),
      });

      expect(event.sourceContainer).toBe(sourceContainer);
    });

    it('initializes with sensorEvent', () => {
      const sensorEvent = new SensorEvent();
      const event = new DragEvent({
        sensorEvent,
        source: document.createElement('div'),
      });

      expect(event.sensorEvent).toBe(sensorEvent);
    });

    it('initializes with originalEvent', () => {
      const originalEvent = new Event('drag');
      const event = new DragEvent({
        sensorEvent: new SensorEvent({ originalEvent }),
        source: document.createElement('div'),
      });

      expect(event.originalEvent).toBe('expected originalEvent');
    });
  });

  describe('#originalEvent', () => {
    it('returns null when initialized without sensorEvent', () => {
      const event = new DragEvent({ source: document.createElement('div') });

      expect(event.originalEvent).toBeNull();
    });
  });
});

describe('DragStartEvent', () => {
  describe('#constructor', () => {
    it('is instance of DragStartEvent', () => {
      const event = new DragStartEvent();

      expect(event).toBeInstanceOf(DragStartEvent);
    });

    it('initializes with `type` of `drag:start`', () => {
      const event = new DragStartEvent();

      expect(event.type).toBe('drag:start');
    });
  });
});

describe('DragMoveEvent', () => {
  describe('#constructor', () => {
    it('is instance of DragMoveEvent', () => {
      const event = new DragMoveEvent();

      expect(event).toBeInstanceOf(DragMoveEvent);
    });

    it('initializes with `type` of `drag:move`', () => {
      const event = new DragMoveEvent();

      expect(event.type).toBe('drag:move');
    });
  });
});

describe('DragOutContainerEvent', () => {
  describe('#constructor', () => {
    it('is instance of DragOutContainerEvent', () => {
      const event = new DragOutContainerEvent();

      expect(event).toBeInstanceOf(DragOutContainerEvent);
    });

    it('initializes with `type` of `drag:out:container`', () => {
      const event = new DragOutContainerEvent();

      expect(event.type).toBe('drag:out:container');
    });

    it('initializes with overContainer', () => {
      const overContainer = document.createElement('div');
      const event = new DragOutContainerEvent({
        overContainer,
        source: document.createElement('div'),
      });

      expect(event.overContainer).toBe(overContainer);
    });
  });
});

describe('DragOutEvent', () => {
  describe('#constructor', () => {
    it('is instance of DragOutEvent', () => {
      const event = new DragOutEvent();

      expect(event).toBeInstanceOf(DragOutEvent);
    });

    it('initializes with `type` of `drag:out`', () => {
      const event = new DragOutEvent();

      expect(event.type).toBe('drag:out');
    });

    it('initializes with overContainer', () => {
      const overContainer = document.createElement('div');
      const event = new DragOutEvent({
        overContainer,
        source: document.createElement('div'),
      });

      expect(event.overContainer).toBe(overContainer);
    });

    it('initializes with over', () => {
      const over = document.createElement('div');
      const event = new DragOutEvent({
        over,
        source: document.createElement('div'),
      });

      expect(event.over).toBe(over);
    });
  });
});

describe('DragOverContainerEvent', () => {
  describe('#constructor', () => {
    it('is instance of DragOverContainerEvent', () => {
      const event = new DragOverContainerEvent();

      expect(event).toBeInstanceOf(DragOverContainerEvent);
    });

    it('initializes with `type` of `drag:over:container`', () => {
      const event = new DragOverContainerEvent();

      expect(event.type).toBe('drag:over:container');
    });

    it('initializes with overContainer', () => {
      const overContainer = document.createElement('div');
      const event = new DragOverContainerEvent({
        overContainer,
        source: document.createElement('div'),
      });

      expect(event.overContainer).toBe(overContainer);
    });
  });
});

describe('DragOverEvent', () => {
  describe('#constructor', () => {
    it('is instance of DragOverEvent', () => {
      const event = new DragOverEvent();

      expect(event).toBeInstanceOf(DragOverEvent);
    });

    it('initializes with `type` of `drag:over`', () => {
      const event = new DragOverEvent();

      expect(event.type).toBe('drag:over');
    });

    it('initializes with overContainer', () => {
      const overContainer = document.createElement('div');
      const event = new DragOverEvent({
        overContainer,
        source: document.createElement('div'),
      });

      expect(event.overContainer).toBe(overContainer);
    });

    it('initializes with over', () => {
      const over = document.createElement('div');
      const event = new DragOverEvent({
        over,
        source: document.createElement('div'),
      });

      expect(event.over).toBe(over);
    });
  });
});

describe('DragPressureEvent', () => {
  describe('#constructor', () => {
    it('is instance of DragPressureEvent', () => {
      const event = new DragPressureEvent();

      expect(event).toBeInstanceOf(DragPressureEvent);
    });

    it('initializes with `type` of `drag:pressure`', () => {
      const event = new DragPressureEvent();

      expect(event.type).toBe('drag:pressure');
    });

    it('initializes with pressure', () => {
      const pressure = 4;
      const event = new DragPressureEvent({
        pressure,
        source: document.createElement('div'),
      });

      expect(event.pressure).toBe(pressure);
    });
  });
});

describe('DragStopEvent', () => {
  describe('#constructor', () => {
    it('is instance of DragStopEvent', () => {
      const event = new DragStopEvent();

      expect(event).toBeInstanceOf(DragStopEvent);
    });

    it('initializes with `type` of `drag:stop`', () => {
      const event = new DragStopEvent();

      expect(event.type).toBe('drag:stop');
    });
  });
});

describe('DragStoppedEvent', () => {
  describe('#constructor', () => {
    it('is instance of DragStoppedEvent', () => {
      const event = new DragStoppedEvent();

      expect(event).toBeInstanceOf(DragStoppedEvent);
    });

    it('initializes with `type` of `drag:stopped`', () => {
      const event = new DragStoppedEvent();

      expect(event.type).toBe('drag:stopped');
    });
  });
});
