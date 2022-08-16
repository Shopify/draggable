import { DragEvent } from '../../../DragEvent';
import {
  MirrorEvent,
  MirrorCreateEvent,
  MirrorCreatedEvent,
  MirrorAttachedEvent,
  MirrorMoveEvent,
  MirrorMovedEvent,
  MirrorDestroyEvent,
} from '.';
import { SensorEvent } from '../../../Sensors/SensorEvent';

describe('MirrorEvent', () => {
  describe('#constructor', () => {
    it('is instance of MirrorEvent', () => {
      const event = new MirrorEvent();

      expect(event).toBeInstanceOf(MirrorEvent);
    });

    it('initializes with `type` of `mirror`', () => {
      const event = new MirrorEvent();

      expect(event.type).toBe('mirror');
    });

    it('initializes with source', () => {
      const source = document.createElement('h1');
      const event = new MirrorEvent({
        detail: {
          sourceContainer: document.createElement('div'),
          sensorEvent: new SensorEvent(),
          dragEvent: new DragEvent(),
          source,
        },
      });

      expect(event.source).toBe(source);
    });

    it('initializes with sourceContainer', () => {
      const sourceContainer = document.createElement('h1');
      const event = new MirrorEvent({
        detail: {
          source: document.createElement('div'),
          sensorEvent: new SensorEvent(),
          dragEvent: new DragEvent(),
          sourceContainer,
        },
      });

      expect(event.sourceContainer).toBe(sourceContainer);
    });

    it('initializes with sensorEvent', () => {
      const sensorEvent = new SensorEvent();
      const event = new MirrorEvent({
        detail: {
          source: document.createElement('div'),
          sensorEvent,
          dragEvent: new DragEvent(),
          sourceContainer: document.createElement('div'),
        },
      });

      expect(event.sensorEvent).toBe(sensorEvent);
    });

    it('initializes with originalEvent', () => {
      const originalEvent = new Event('drag');
      const event = new MirrorEvent({
        detail: {
          sensorEvent: new SensorEvent({
            detail: { originalEvent },
          } as SensorEvent),
          source: document.createElement('div'),
          dragEvent: new DragEvent(),
          sourceContainer: document.createElement('div'),
        },
      });

      expect(event.originalEvent).toBe(originalEvent);
    });
  });
});

describe('MirrorCreateEvent', () => {
  describe('#constructor', () => {
    it('is instance of MirrorCreateEvent', () => {
      const event = new MirrorCreateEvent({
        source: document.createElement('div'),
        sourceContainer: document.createElement('div'),
        sensorEvent: new SensorEvent(),
        dragEvent: new DragEvent(),
      });

      expect(event).toBeInstanceOf(MirrorCreateEvent);
    });

    it('initializes with `type` of `mirror:create`', () => {
      const event = new MirrorCreateEvent({
        source: document.createElement('div'),
        sourceContainer: document.createElement('div'),
        sensorEvent: new SensorEvent(),
        dragEvent: new DragEvent(),
      });

      expect(event.type).toBe('mirror:create');
    });
  });

  it('is cancelable', () => {
    const event = new MirrorCreateEvent({
      source: document.createElement('div'),
      sourceContainer: document.createElement('div'),
      sensorEvent: new SensorEvent(),
      dragEvent: new DragEvent(),
    });

    event.preventDefault();
    expect(event.defaultPrevented).toBe(true);
  });
});

describe('MirrorCreatedEvent', () => {
  describe('#constructor', () => {
    it('is instance of MirrorCreatedEvent', () => {
      const event = new MirrorCreatedEvent({
        source: document.createElement('div'),
        sourceContainer: document.createElement('div'),
        mirror: document.createElement('div'),
        sensorEvent: new SensorEvent(),
        dragEvent: new DragEvent(),
      });

      expect(event).toBeInstanceOf(MirrorCreatedEvent);
    });

    it('initializes with `type` of `mirror:created`', () => {
      const event = new MirrorCreatedEvent({
        source: document.createElement('div'),
        sourceContainer: document.createElement('div'),
        mirror: document.createElement('div'),
        sensorEvent: new SensorEvent(),
        dragEvent: new DragEvent(),
      });

      expect(event.type).toBe('mirror:created');
    });

    it('initializes with mirror', () => {
      const mirror = document.createElement('div');
      const event = new MirrorCreatedEvent({
        source: document.createElement('div'),
        sourceContainer: document.createElement('div'),
        sensorEvent: new SensorEvent(),
        dragEvent: new DragEvent(),
        mirror,
      });

      expect(event.mirror).toBe(mirror);
    });
  });
});

describe('MirrorAttachedEvent', () => {
  describe('#constructor', () => {
    it('is instance of MirrorAttachedEvent', () => {
      const event = new MirrorAttachedEvent({
        source: document.createElement('div'),
        sourceContainer: document.createElement('div'),
        mirror: document.createElement('div'),
        sensorEvent: new SensorEvent(),
        dragEvent: new DragEvent(),
      });

      expect(event).toBeInstanceOf(MirrorAttachedEvent);
    });

    it('initializes with `type` of `mirror:attached`', () => {
      const event = new MirrorAttachedEvent({
        source: document.createElement('div'),
        sourceContainer: document.createElement('div'),
        mirror: document.createElement('div'),
        sensorEvent: new SensorEvent(),
        dragEvent: new DragEvent(),
      });

      expect(event.type).toBe('mirror:attached');
    });

    it('initializes with mirror', () => {
      const mirror = document.createElement('div');
      const event = new MirrorAttachedEvent({
        source: document.createElement('div'),
        sourceContainer: document.createElement('div'),
        sensorEvent: new SensorEvent(),
        dragEvent: new DragEvent(),
        mirror,
      });

      expect(event.mirror).toBe(mirror);
    });
  });
});

describe('MirrorMoveEvent', () => {
  describe('#constructor', () => {
    it('is instance of MirrorMoveEvent', () => {
      const event = new MirrorMoveEvent({
        source: document.createElement('div'),
        sourceContainer: document.createElement('div'),
        mirror: document.createElement('div'),
        sensorEvent: new SensorEvent(),
        dragEvent: new DragEvent(),
        passedThreshX: true,
        passedThreshY: true,
      });

      expect(event).toBeInstanceOf(MirrorMoveEvent);
    });

    it('initializes with `type` of `mirror:moved`', () => {
      const event = new MirrorMoveEvent({
        source: document.createElement('div'),
        sourceContainer: document.createElement('div'),
        mirror: document.createElement('div'),
        sensorEvent: new SensorEvent(),
        dragEvent: new DragEvent(),
        passedThreshX: true,
        passedThreshY: true,
      });

      expect(event.type).toBe('mirror:move');
    });

    it('initializes with mirror', () => {
      const mirror = document.createElement('div');
      const event = new MirrorMoveEvent({
        source: document.createElement('div'),
        sourceContainer: document.createElement('div'),
        sensorEvent: new SensorEvent(),
        dragEvent: new DragEvent(),
        passedThreshX: true,
        passedThreshY: true,
        mirror,
      });

      expect(event.mirror).toBe(mirror);
    });

    it('initializes with passedThreshX', () => {
      const passedThreshX = true;
      const event = new MirrorMoveEvent({
        source: document.createElement('div'),
        sourceContainer: document.createElement('div'),
        sensorEvent: new SensorEvent(),
        dragEvent: new DragEvent(),
        mirror: document.createElement('div'),
        passedThreshY: true,
        passedThreshX,
      });

      expect(event.passedThreshX).toBe(true);
    });

    it('initializes with passedThreshY', () => {
      const passedThreshY = true;
      const event = new MirrorMoveEvent({
        source: document.createElement('div'),
        sourceContainer: document.createElement('div'),
        sensorEvent: new SensorEvent(),
        dragEvent: new DragEvent(),
        mirror: document.createElement('div'),
        passedThreshX: true,
        passedThreshY,
      });

      expect(event.passedThreshY).toBe(true);
    });
  });

  it('is cancelable', () => {
    const event = new MirrorCreateEvent({
      source: document.createElement('div'),
      sourceContainer: document.createElement('div'),
      sensorEvent: new SensorEvent(),
      dragEvent: new DragEvent(),
    });

    event.preventDefault();
    expect(event.defaultPrevented).toBe(true);
  });
});

describe('MirrorMovedEvent', () => {
  describe('#constructor', () => {
    it('is instance of MirrorMovedEvent', () => {
      const event = new MirrorMovedEvent({
        source: document.createElement('div'),
        sourceContainer: document.createElement('div'),
        mirror: document.createElement('div'),
        sensorEvent: new SensorEvent(),
        dragEvent: new DragEvent(),
        passedThreshX: true,
        passedThreshY: true,
      });

      expect(event).toBeInstanceOf(MirrorMovedEvent);
    });

    it('initializes with `type` of `mirror:moved`', () => {
      const event = new MirrorMovedEvent({
        source: document.createElement('div'),
        sourceContainer: document.createElement('div'),
        mirror: document.createElement('div'),
        sensorEvent: new SensorEvent(),
        dragEvent: new DragEvent(),
        passedThreshX: true,
        passedThreshY: true,
      });

      expect(event.type).toBe('mirror:moved');
    });

    it('initializes with mirror', () => {
      const mirror = document.createElement('div');
      const event = new MirrorMovedEvent({
        source: document.createElement('div'),
        sourceContainer: document.createElement('div'),
        sensorEvent: new SensorEvent(),
        dragEvent: new DragEvent(),
        passedThreshX: true,
        passedThreshY: true,
        mirror,
      });

      expect(event.mirror).toBe(mirror);
    });

    it('initializes with passedThreshX', () => {
      const passedThreshX = true;
      const event = new MirrorMovedEvent({
        source: document.createElement('div'),
        sourceContainer: document.createElement('div'),
        sensorEvent: new SensorEvent(),
        dragEvent: new DragEvent(),
        mirror: document.createElement('div'),
        passedThreshY: true,
        passedThreshX,
      });

      expect(event.passedThreshX).toBe(true);
    });

    it('initializes with passedThreshY', () => {
      const passedThreshY = true;
      const event = new MirrorMovedEvent({
        source: document.createElement('div'),
        sourceContainer: document.createElement('div'),
        sensorEvent: new SensorEvent(),
        dragEvent: new DragEvent(),
        mirror: document.createElement('div'),
        passedThreshX: true,
        passedThreshY,
      });

      expect(event.passedThreshY).toBe(true);
    });
  });
});

describe('MirrorDestroyEvent', () => {
  describe('#constructor', () => {
    it('is instance of MirrorDestroyEvent', () => {
      const event = new MirrorDestroyEvent({
        source: document.createElement('div'),
        sourceContainer: document.createElement('div'),
        mirror: document.createElement('div'),
        sensorEvent: new SensorEvent(),
        dragEvent: new DragEvent(),
      });

      expect(event).toBeInstanceOf(MirrorDestroyEvent);
    });

    it('initializes with `type` of `mirror:destroy`', () => {
      const event = new MirrorDestroyEvent({
        source: document.createElement('div'),
        sourceContainer: document.createElement('div'),
        mirror: document.createElement('div'),
        sensorEvent: new SensorEvent(),
        dragEvent: new DragEvent(),
      });

      expect(event.type).toBe('mirror:destroy');
    });

    it('initializes with mirror', () => {
      const mirror = document.createElement('div');
      const event = new MirrorDestroyEvent({
        source: document.createElement('div'),
        sourceContainer: document.createElement('div'),
        sensorEvent: new SensorEvent(),
        dragEvent: new DragEvent(),
        mirror,
      });

      expect(event.mirror).toBe(mirror);
    });
  });

  it('is cancelable', () => {
    const event = new MirrorDestroyEvent({
      source: document.createElement('div'),
      sourceContainer: document.createElement('div'),
      sensorEvent: new SensorEvent(),
      dragEvent: new DragEvent(),
      mirror: document.createElement('div'),
    });

    event.preventDefault();
    expect(event.defaultPrevented).toBe(true);
  });
});
