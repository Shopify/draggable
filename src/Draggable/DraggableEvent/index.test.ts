import {
  DraggableEvent,
  DraggableInitializeEvent,
  DraggableDestroyEvent,
} from '.';
import Draggable from '../Draggable';

describe('DraggableEvent', () => {
  describe('#constructor', () => {
    it('is instance of DraggableEvent', () => {
      const event = new DraggableEvent();

      expect(event).toBeInstanceOf(DraggableEvent);
    });

    it('initializes with `type` of `draggable`', () => {
      const event = new DraggableEvent();

      expect(event.type).toBe('draggable');
    });

    it('initializes with a Draggable instance', () => {
      const draggable = new Draggable();
      const event = new DraggableEvent({ detail: { draggable } });

      expect(event.draggable).toBe(draggable);
    });

    it('initializes with a source', () => {
      const draggable = new Draggable();
      const source = document.createElement('div');
      const event = new DraggableEvent({ detail: { draggable, source } });

      expect(event.source).toBe(source);
    });
  });

  describe('#clone', () => {
    it('returns a DraggableEvent clone', () => {
      const draggable = new Draggable();
      const source = document.createElement('div');
      const event = new DraggableEvent({ detail: { draggable } });

      expect(event.source).not.toBe(source);
      expect(event.clone({ source }).source);
    });
  });
});

describe('DraggableInitializeEvent', () => {
  describe('#constructor', () => {
    it('is instance of DraggableInitializeEvent', () => {
      const event = new DraggableInitializeEvent({
        draggable: new Draggable(),
      });
      expect(event).toBeInstanceOf(DraggableInitializeEvent);
    });

    it('initializes with `type` of `draggable:initialize`', () => {
      const event = new DraggableInitializeEvent({
        draggable: new Draggable(),
      });
      expect(event.type).toBe('draggable:initialize');
    });
  });
});

describe('DraggableDestroyEvent', () => {
  describe('#constructor', () => {
    it('is instance of DraggableDestroyEvent', () => {
      const event = new DraggableDestroyEvent({
        draggable: new Draggable(),
      });
      expect(event).toBeInstanceOf(DraggableDestroyEvent);
    });

    it('initializes with `type` of `draggable:destroy`', () => {
      const event = new DraggableDestroyEvent({
        draggable: new Draggable(),
      });
      expect(event.type).toBe('draggable:destroy');
    });
  });
});
