import Draggable from 'draggable';
import {
  DragMoveEvent,
  DragStartEvent,
  DragStopEvent,
} from 'events/drag-event';
import {
  DraggableDestroyEvent,
} from 'events/draggable-event';

import {
  createSandbox,
  triggerEvent,
} from 'helper';

const sampleMarkup = `
  <ul>
    <li>First item</li>
    <li>Second item</li>
  </ul>
`;

describe('Draggable', () => {
  let sandbox;
  let draggable;

  beforeEach(() => {
    jest.useFakeTimers();
    sandbox = createSandbox(sampleMarkup);
    const containers = sandbox.querySelectorAll('ul');
    draggable = new Draggable(containers, {
      draggable: 'li',
      delay: 0,
    });
  });

  afterEach(() => {
    sandbox.parentNode.removeChild(sandbox);
  });

  test('triggers `drag:start` drag event on mousedown', () => {
    const draggableElement = sandbox.querySelector('li');
    document.elementFromPoint = () => draggableElement;

    const callback = jest.fn();
    draggable.on('drag:start', callback);
    triggerEvent(draggableElement, 'mousedown');

    // Wait for delay
    jest.runTimersToTime(100);

    const call = callback.mock.calls[0][0];
    expect(call.type).toBe('drag:start');
    expect(call).toBeInstanceOf(DragStartEvent);
  });

  test('should trigger `drag:start` drag event on dragstart', () => {
    const draggableElement = sandbox.querySelector('li');

    const callback = jest.fn();
    draggable.on('drag:start', callback);

    // Wait for delay
    triggerEvent(draggableElement, 'mousedown');

    jest.runTimersToTime(100);

    triggerEvent(draggableElement, 'dragstart');

    const call = callback.mock.calls[0][0];
    expect(call.type).toBe('drag:start');
    expect(call).toBeInstanceOf(DragStartEvent);
  });

  test('triggers `drag:move` drag event on mousedown', () => {
    const draggableElement = sandbox.querySelector('li');

    triggerEvent(draggableElement, 'mousedown');

    // Wait for delay
    jest.runTimersToTime(100);

    const callback = jest.fn();
    draggable.on('drag:move', callback);
    triggerEvent(draggableElement, 'mousemove', {
      clientX: 39,
      clientY: 82,
    });

    const call = callback.mock.calls[0][0];
    const sensorEvent = call.data.sensorEvent;
    expect(call.type).toBe('drag:move');
    expect(call).toBeInstanceOf(DragMoveEvent);
    expect(sensorEvent.clientX).toBe(39);
    expect(sensorEvent.clientY).toBe(82);
  });

  test('triggers `drag:stop` drag event on mouseup', () => {
    const draggableElement = sandbox.querySelector('li');

    triggerEvent(draggableElement, 'mousedown');

    // Wait for delay
    jest.runTimersToTime(100);

    const callback = jest.fn();
    draggable.on('drag:stop', callback);
    triggerEvent(draggableElement, 'mouseup');

    const call = callback.mock.calls[0][0];
    const sensorEvent = call.data.sensorEvent;
    expect(call.type).toBe('drag:stop');
    expect(call).toBeInstanceOf(DragStopEvent);
  });

  test('triggers `draggable:destroy` event on destroy', () => {
    const callback = jest.fn();
    draggable.on('draggable:destroy', callback);

    draggable.destroy();

    const call = callback.mock.calls[0][0];
    expect(call.type).toBe('draggable:destroy');
    expect(call).toBeInstanceOf(DraggableDestroyEvent);
    expect(call.draggable).toBe(draggable);
  });

  test('adds `source:dragging` classname to draggable element on mousedown', () => {
    const draggableElement = sandbox.querySelector('li');

    // Wait for delay
    triggerEvent(draggableElement, 'mousedown');

    jest.runTimersToTime(100);

    expect(draggable.source.classList)
      .toContain('draggable-source--is-dragging');
  });

  test('adds `source:placed` classname to draggable source element on mouseup', () => {
    const draggableElement = sandbox.querySelector('li');

    triggerEvent(draggableElement, 'mousedown');

    // Wait for delay
    jest.runTimersToTime(100);

    const source = draggable.source;

    triggerEvent(draggableElement, 'mouseup');

    expect(source.classList)
      .toContain('draggable-source--placed');
  });

  test('removes `source:placed` classname from draggable source element on mouseup', () => {
    const draggableElement = sandbox.querySelector('li');

    triggerEvent(draggableElement, 'mousedown');

    // Wait for delay
    jest.runTimersToTime(100);

    const source = draggable.source;

    triggerEvent(draggableElement, 'mouseup');

    expect(source.classList)
      .toContain('draggable-source--placed');

    // Wait for default draggable.options.placedTimeout delay
    jest.runTimersToTime(700);

    expect(source.classList)
      .not
      .toContain('draggable-source--placed');
  });
});
