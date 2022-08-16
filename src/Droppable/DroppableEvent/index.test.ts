import {
  DroppableEvent,
  DroppableStartEvent,
  DroppableDroppedEvent,
  DroppableReturnedEvent,
  DroppableStopEvent,
} from '.';
import { DragEvent } from '../../Draggable';

describe('DroppableEvent', () => {
  describe('#constructor', () => {
    it('is instance of DroppableEvent', () => {
      const event = new DroppableEvent();

      expect(event).toBeInstanceOf(DroppableEvent);
    });

    it('initializes with `type` of `droppable`', () => {
      const event = new DroppableEvent();

      expect(event.type).toBe('droppable');
    });

    it('initializes with droppable', () => {
      const droppable = document.createElement('div');
      const event = new DroppableEvent({
        detail: {
          droppable,
          dropzone: document.createElement('div'),
          dragEvent: new DragEvent(),
        },
      });

      expect(event.droppable).toBe(droppable);
    });

    it('initializes with dropzone', () => {
      const dropzone = document.createElement('div');
      const event = new DroppableEvent({
        detail: {
          dropzone,
          droppable: document.createElement('div'),
          dragEvent: new DragEvent(),
        },
      });

      expect(event.dropzone).toBe(dropzone);
    });

    it('initializes with dragEvent', () => {
      const dragEvent = new DragEvent();
      const event = new DroppableEvent({
        detail: {
          dropzone: document.createElement('div'),
          droppable: document.createElement('div'),
          dragEvent,
        },
      });

      expect(event.dragEvent).toBe(dragEvent);
    });
  });

  it('creates a clone of DroppableEvent', () => {
    const dropzone = document.createElement('div');
    const event = new DroppableEvent();
    const clone = event.clone({ dropzone });

    expect(clone.type).toBe('droppable');
    expect(clone.dropzone).toBe(dropzone);
  });
});

describe('DroppableStartEvent', () => {
  it('initializes with `type` of `droppable:start`', () => {
    const event = new DroppableStartEvent({
      dropzone: document.createElement('div'),
      droppable: document.createElement('div'),
      dragEvent: new DragEvent(),
    });

    expect(event.type).toBe('droppable:start');
  });

  it('is cancellable', () => {
    const event = new DroppableStartEvent({
      dropzone: document.createElement('div'),
      droppable: document.createElement('div'),
      dragEvent: new DragEvent(),
    });

    event.preventDefault();
    expect(event.defaultPrevented).toBe(true);
  });

  it('creates a clone of DroppableStartEvent', () => {
    const droppable = document.createElement('div');

    const event = new DroppableStartEvent({
      dropzone: document.createElement('div'),
      dragEvent: new DragEvent(),
    });
    const clone = event.clone({ droppable });

    expect(clone.type).toBe('droppable:start');
    expect(clone.droppable).toBe(droppable);
  });
});

describe('DroppableDroppedEvent', () => {
  it('initializes with `type` of `droppable:dropped`', () => {
    const event = new DroppableDroppedEvent({
      dropzone: document.createElement('div'),
      droppable: document.createElement('div'),
      dragEvent: new DragEvent(),
    });

    expect(event.type).toBe('droppable:dropped');
  });

  it('is cancellable', () => {
    const event = new DroppableDroppedEvent({
      dropzone: document.createElement('div'),
      droppable: document.createElement('div'),
      dragEvent: new DragEvent(),
    });

    event.preventDefault();
    expect(event.defaultPrevented).toBe(true);
  });

  it('creates a clone of DroppableDroppedEvent', () => {
    const droppable = document.createElement('div');
    const event = new DroppableDroppedEvent({
      dropzone: document.createElement('div'),
      droppable: document.createElement('div'),
      dragEvent: new DragEvent(),
    });
    const clone = event.clone({ droppable });

    expect(clone.type).toBe('droppable:dropped');
    expect(clone.droppable).toBe(droppable);
  });
});

describe('DroppableReturnedEvent', () => {
  it('initializes with `type` of `droppable:returned`', () => {
    const event = new DroppableReturnedEvent({
      dropzone: document.createElement('div'),
      droppable: document.createElement('div'),
      dragEvent: new DragEvent(),
    });

    expect(event.type).toBe('droppable:returned');
  });

  it('is cancellable', () => {
    const event = new DroppableReturnedEvent({
      dropzone: document.createElement('div'),
      droppable: document.createElement('div'),
      dragEvent: new DragEvent(),
    });

    event.preventDefault();
    expect(event.defaultPrevented).toBe(true);
  });

  it('creates a clone of DroppableReturnedEvent', () => {
    const droppable = document.createElement('div');
    const event = new DroppableReturnedEvent({
      dropzone: document.createElement('div'),
      droppable: document.createElement('div'),
      dragEvent: new DragEvent(),
    });
    const clone = event.clone({ droppable });
    expect(clone.type).toBe('droppable:returned');

    expect(clone.droppable).toBe(droppable);
  });
});

describe('DroppableStopEvent', () => {
  it('initializes with `type` of `droppable:stop`', () => {
    const event = new DroppableStopEvent({
      dropzone: document.createElement('div'),
      droppable: document.createElement('div'),
      dragEvent: new DragEvent(),
    });

    expect(event.type).toBe('droppable:stop');
  });

  it('is cancellable', () => {
    const event = new DroppableStopEvent({
      dropzone: document.createElement('div'),
      droppable: document.createElement('div'),
      dragEvent: new DragEvent(),
    });

    event.preventDefault();
    expect(event.defaultPrevented).toBe(true);
  });

  it('creates a clone of DroppableStopEvent', () => {
    const droppable = document.createElement('div');
    const event = new DroppableStopEvent({
      dropzone: document.createElement('div'),
      droppable: document.createElement('div'),
      dragEvent: new DragEvent(),
    });
    const clone = event.clone({ droppable });
    expect(clone.type).toBe('droppable:stop');

    expect(clone.droppable).toBe(droppable);
  });
});
