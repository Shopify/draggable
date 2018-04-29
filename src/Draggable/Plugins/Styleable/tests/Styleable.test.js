import {createSandbox, clickMouse, moveMouse, releaseMouse, waitForDragDelay, DRAG_DELAY} from 'helper';

import Draggable from '../../..';
import Styleable from '..';

const sampleMarkup = `
  <ul>
    <li>First item</li>
  </ul>
  <ul>
    <li>Second item</li>
  </ul>
`;

const PLACED_TIMEOUT = 100;

describe('Styleable', () => {
  let sandbox;
  let containers;
  let draggable;
  let draggables;

  beforeEach(() => {
    sandbox = createSandbox(sampleMarkup);
    containers = sandbox.querySelectorAll('ul');
    draggables = sandbox.querySelectorAll('li');
  });

  afterEach(() => {
    draggable.destroy();
    sandbox.parentNode.removeChild(sandbox);
  });

  it('is included by default', () => {
    draggable = new Draggable(containers, {
      draggable: 'li',
    });

    const focusablePlugin = draggable.plugins.find((plugin) => plugin.constructor === Styleable);

    expect(focusablePlugin).toBeInstanceOf(Styleable);

    draggable.destroy();
  });

  describe('with custom classes', () => {
    beforeEach(() => {
      draggable = new Draggable(containers, {
        draggable: 'li',
        delay: DRAG_DELAY,
        styleable: {
          classes: {
            'container:dragging': ['DraggableContainer', 'isDragging'],
            'source:dragging': ['DraggableSource', 'isDragging'],
            'body:dragging': ['Draggable', 'isDragging'],
            'source:placed': ['DraggableSource', 'placed'],
            'container:placed': ['DraggableContainer', 'placed'],
            'draggable:over': ['Draggable', 'isOver'],
            'container:over': ['DraggableContainer', 'isOver'],
            'source:original': ['DraggableSource', 'isOriginal'],
            mirror: 'DraggableMirror',
          },
          placedTimeout: PLACED_TIMEOUT,
        },
      });
    });

    afterEach(() => {
      draggable.destroy();
    });

    it('sets classes on `drag:start`', () => {
      clickMouse(draggables[0]);

      waitForDragDelay();

      expect(draggable.source.className).toBe('DraggableSource isDragging');
      expect(draggable.originalSource.className).toBe('DraggableSource isOriginal');
      expect(draggable.sourceContainer.className).toBe('DraggableContainer isDragging');
      expect(draggable.originalSource.className).toBe('DraggableSource isOriginal');

      releaseMouse(draggable.source);
    });

    it('does not set dragging classes on `drag:start` when canceled', () => {
      draggable.on('drag:start', (dragEvent) => {
        dragEvent.cancel();
      });

      clickMouse(draggables[0]);

      waitForDragDelay();

      expect(draggable.source.className).not.toBe('DraggableSource isDragging');
      expect(draggable.originalSource.className).not.toBe('DraggableSource isOriginal');
      expect(draggable.sourceContainer.className).not.toBe('DraggableContainer isDragging');
      expect(document.body.className).not.toBe('DraggableSource isOriginal');

      releaseMouse(draggable.source);
    });

    it('sets classes on `drag:over`', () => {
      clickMouse(draggables[0]);

      waitForDragDelay();

      moveMouse(draggables[1]);

      expect(draggables[1].className).toBe('Draggable isOver');

      releaseMouse(draggable.source);
    });

    it('sets classes on `drag:out`', () => {
      clickMouse(draggables[0]);

      waitForDragDelay();

      moveMouse(draggables[1]);
      moveMouse(document.body);

      expect(draggables[1].className).not.toBe('Draggable isOver');

      releaseMouse(draggable.source);
    });

    it('sets classes on `drag:over:container`', () => {
      clickMouse(draggables[0]);

      waitForDragDelay();

      moveMouse(containers[1]);

      expect(containers[1].className).toBe('DraggableContainer isOver');

      releaseMouse(draggable.source);
    });

    it('sets classes on `drag:out:container`', () => {
      clickMouse(draggables[0]);

      waitForDragDelay();

      moveMouse(containers[1]);
      moveMouse(document.body);

      expect(containers[1].className).not.toBe('DraggableContainer isOver');

      releaseMouse(draggable.source);
    });

    it('sets classes on `drag:stop`', () => {
      clickMouse(draggables[0]);

      waitForDragDelay();

      moveMouse(draggables[1]);

      const {source, originalSource, sourceContainer} = draggable;

      releaseMouse(draggable.source);

      expect(source.className).toBe('');
      expect(originalSource.className).toBe('DraggableSource placed');
      expect(sourceContainer.className).toBe('DraggableContainer placed');
      expect(document.body.className).toBe('');

      jest.runTimersToTime(PLACED_TIMEOUT);

      expect(originalSource.className).toBe('');
      expect(sourceContainer.className).toBe('');
    });

    it('removes over classes on `drag:stop`', () => {
      clickMouse(draggables[0]);

      waitForDragDelay();

      moveMouse(draggables[1]);
      releaseMouse(draggable.source);

      expect(draggables[1].className).toBe('');
      expect(containers[1].className).toBe('');
    });
  });
});
