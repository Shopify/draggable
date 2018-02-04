import {createSandbox, clickMouse, moveMouse, releaseMouse, waitForDragDelay, DRAG_DELAY} from 'helper';

import Droppable, {DroppableStartEvent, DroppableDroppedEvent, DroppableReturnedEvent, DroppableStopEvent} from '..';

const sampleMarkup = `
  <div class="Container">
    <div class="Dropzone isOccupied">
      <div class="Draggable"></div>
    </div>
    <div class="Dropzone"></div>
    <div class="Dropzone isOccupied">
      <div class="Draggable"></div>
    </div>
    <div class="Draggable"></div>
  </div>
`;

describe('Droppable', () => {
  let sandbox;
  let containers;
  let draggableElement;
  let dropzoneElements;
  let droppable;
  let firstDropzone;
  let secondDropzone;
  let occupiedDropzone;
  let dropzonelessDraggableElement;

  beforeEach(() => {
    sandbox = createSandbox(sampleMarkup);
    containers = sandbox.querySelectorAll('.Container');
    draggableElement = sandbox.querySelector('.Draggable');
    dropzoneElements = sandbox.querySelectorAll('.Dropzone');
    dropzonelessDraggableElement = sandbox.querySelectorAll('.Draggable')[2];
    firstDropzone = dropzoneElements[0];
    secondDropzone = dropzoneElements[1];
    occupiedDropzone = dropzoneElements[2];
    droppable = new Droppable(containers, {
      draggable: '.Draggable',
      dropzone: '.Dropzone',
      delay: DRAG_DELAY,
      classes: {
        'droppable:occupied': 'isOccupied',
      },
    });
  });

  afterEach(() => {
    droppable.destroy();
    sandbox.parentNode.removeChild(sandbox);
  });

  describe('triggers', () => {
    let eventHandler;
    let originalDragEvents;

    beforeEach(() => {
      eventHandler = jest.fn();
      originalDragEvents = [];
    });

    it('droppable:start event', () => {
      droppable.on('drag:start', (dragEvent) => originalDragEvents.push(dragEvent));
      droppable.on('droppable:start', eventHandler);

      move();

      expect(eventHandler).toHaveBeenCalledWithEvent(DroppableStartEvent);

      expect(eventHandler).toHaveBeenCalledWithEventProperties({
        dragEvent: originalDragEvents[0],
        dropzone: firstDropzone,
      });
    });

    it('droppable:dropped event', () => {
      droppable.on('drag:move', (dragEvent) => originalDragEvents.push(dragEvent));
      droppable.on('droppable:dropped', eventHandler);

      move();

      expect(eventHandler).toHaveBeenCalledWithEvent(DroppableDroppedEvent);

      expect(eventHandler).toHaveBeenCalledWithEventProperties({
        dragEvent: originalDragEvents[0],
        dropzone: secondDropzone,
      });
    });

    it('droppable:returned event', () => {
      droppable.on('drag:move', (dragEvent) => originalDragEvents.push(dragEvent));
      droppable.on('droppable:returned', eventHandler);

      move(() => {
        moveMouse(firstDropzone);
        moveMouse(secondDropzone);
      });

      expect(eventHandler).toHaveBeenCalledWithEvent(DroppableReturnedEvent);

      expect(eventHandler).toHaveBeenCalledWithEventProperties({
        dragEvent: originalDragEvents[1],
        dropzone: secondDropzone,
      });
    });

    it('droppable:stop event', () => {
      droppable.on('drag:stop', (dragEvent) => originalDragEvents.push(dragEvent));
      droppable.on('droppable:stop', eventHandler);

      move();

      expect(eventHandler).toHaveBeenCalledWithEvent(DroppableStopEvent);

      expect(eventHandler).toHaveBeenCalledWithEventProperties({
        dragEvent: originalDragEvents[0],
        dropzone: secondDropzone,
      });
    });
  });

  it('prevents drag when canceling sortable start event', () => {
    droppable.on('droppable:start', (droppableEvent) => {
      droppableEvent.cancel();
    });

    clickMouse(draggableElement);
    waitForDragDelay();
    moveMouse(secondDropzone);

    expect(droppable.isDragging()).toBe(false);

    releaseMouse(droppable.source);
  });

  it('drops draggable element in an empty droppable element', () => {
    expect(draggableElement.parentNode).toBe(firstDropzone);

    clickMouse(draggableElement);
    waitForDragDelay();
    moveMouse(secondDropzone);

    expect(droppable.source.parentNode).toBe(secondDropzone);

    releaseMouse(droppable.source);
  });

  it('prevents drop on occupied droppable element', () => {
    const handler = jest.fn();

    droppable.on('droppable:dropped', handler);

    expect(draggableElement.parentNode).toBe(firstDropzone);

    clickMouse(draggableElement);
    waitForDragDelay();
    moveMouse(occupiedDropzone);

    expect(droppable.source.parentNode).toBe(firstDropzone);

    expect(handler).not.toHaveBeenCalled();

    releaseMouse(droppable.source);
  });

  it('prevents drop when droppable:dropped event gets canceled', () => {
    droppable.on('droppable:dropped', (droppableEvent) => {
      droppableEvent.cancel();
    });

    clickMouse(draggableElement);
    waitForDragDelay();
    moveMouse(secondDropzone);

    expect(droppable.source.parentNode).toBe(firstDropzone);

    releaseMouse(droppable.source);
  });

  it('prevents release when droppable:returned event gets canceled', () => {
    droppable.on('droppable:returned', (droppableEvent) => {
      droppableEvent.cancel();
    });

    clickMouse(draggableElement);
    waitForDragDelay();
    moveMouse(secondDropzone);
    moveMouse(firstDropzone);

    expect(droppable.source.parentNode).toBe(secondDropzone);

    releaseMouse(droppable.source);
  });

  describe('when dragging element without dropzone as parent', () => {
    it('does not trigger droppable:start event', () => {
      const droppableStartHandler = jest.fn();
      droppable.on('droppable:start', droppableStartHandler);

      clickMouse(dropzonelessDraggableElement);
      waitForDragDelay();

      expect(droppableStartHandler).not.toHaveBeenCalled();

      releaseMouse(droppable.source);
    });

    it('cancels drag:start event', () => {
      droppable.on('drag:start', (dragEvent) => {
        requestAnimationFrame(() => {
          // because user defined get triggered first we need to
          // wait for droppable to cancel the event
          expect(dragEvent.canceled()).toBe(true);
        });
      });

      clickMouse(dropzonelessDraggableElement);
      waitForDragDelay();

      releaseMouse(droppable.source);
    });
  });

  function move(
    optionalMoves = () => {
      /* noop */
    },
  ) {
    clickMouse(draggableElement);
    waitForDragDelay();
    moveMouse(secondDropzone);
    optionalMoves();
    releaseMouse(droppable.source);
  }
});
