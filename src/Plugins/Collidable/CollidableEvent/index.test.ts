import { CollidableEvent, CollidableInEvent, CollidableOutEvent } from '.';
import { DragEvent } from '../../../Draggable';

describe('CollidableEvent', () => {
  describe('#constructor', () => {
    it('is instance of CollidableEvent', () => {
      const event = new CollidableEvent();

      expect(event).toBeInstanceOf(CollidableEvent);
    });

    it('initializes with `type` of `collidable`', () => {
      const event = new CollidableEvent();

      expect(event.type).toBe('collidable');
    });

    it('initializes with DragEvent', () => {
      const dragEvent = new DragEvent();
      const event = new CollidableEvent({
        detail: { dragEvent },
      });

      expect(event.dragEvent).toBe(dragEvent);
    });
  });
});

describe('CollidableInEvent', () => {
  describe('#constructor', () => {
    it('is instance of CollidableInEvent', () => {
      const event = new CollidableInEvent({
        collidingElement: document.createElement('div'),
        dragEvent: new DragEvent(),
      });

      expect(event).toBeInstanceOf(CollidableInEvent);
    });

    it('initializes with `type` of `collidable:in`', () => {
      const event = new CollidableInEvent({
        collidingElement: document.createElement('div'),
        dragEvent: new DragEvent(),
      });

      expect(event.type).toBe('collidable:in');
    });

    it('initializes with collidingElement', () => {
      const collidingElement = document.createElement('div');
      const event = new CollidableInEvent({
        collidingElement,
        dragEvent: new DragEvent(),
      });

      expect(event.collidingElement).toBe(collidingElement);
    });
  });
});

describe('CollidableOutEvent', () => {
  describe('#constructor', () => {
    it('is instance of CollidableOutEvent', () => {
      const event = new CollidableOutEvent({
        collidingElement: document.createElement('div'),
        dragEvent: new DragEvent(),
      });

      expect(event).toBeInstanceOf(CollidableOutEvent);
    });

    it('initializes with `type` of `collidable:out`', () => {
      const event = new CollidableOutEvent({
        collidingElement: document.createElement('div'),
        dragEvent: new DragEvent(),
      });

      expect(event.type).toBe('collidable:out');
    });

    it('initializes with collidingElement', () => {
      const collidingElement = document.createElement('div');
      const event = new CollidableOutEvent({
        collidingElement,
        dragEvent: new DragEvent(),
      });

      expect(event.collidingElement).toBe(collidingElement);
    });
  });
});
