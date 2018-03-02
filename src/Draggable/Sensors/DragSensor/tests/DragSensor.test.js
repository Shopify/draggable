import {
  createSandbox,
  dragStart,
  dragOver,
  dragStop,
  clickMouse,
  releaseMouse,
  DRAG_DELAY,
  waitForDragDelay,
} from 'helper';

import DragSensor from './..';

const sampleMarkup = `
  <ul>
    <li>First item</li>
    <li>Second item</li>
  </ul>
`;

describe('DragSensor', () => {
  let sandbox;
  let dragSensor;
  let draggableElement;

  beforeEach(() => {
    sandbox = createSandbox(sampleMarkup);
    const containers = sandbox.querySelectorAll('ul');
    draggableElement = sandbox.querySelector('li');
    dragSensor = new DragSensor(containers, {
      draggable: 'li',
      delay: DRAG_DELAY,
    });
    dragSensor.attach();
  });

  afterEach(() => {
    dragSensor.detach();
    sandbox.parentNode.removeChild(sandbox);
  });

  test('mousedown handler adds draggable attribute', () => {
    expect(draggableElement.draggable)
      .toBeUndefined();

    clickMouse(draggableElement);
    waitForDragDelay();

    expect(draggableElement.draggable)
      .toBe(true);

    releaseMouse(draggableElement);

    expect(draggableElement.draggable)
      .toBe(false);
  });

  test('triggers `drag:start` sensor event on dragstart', () => {
    function dragFlow() {
      clickMouse(draggableElement);
      waitForDragDelay();
      dragStart(draggableElement);
      waitForDragDelay();
      dragStop(draggableElement);
      releaseMouse(document.body);
    }

    expect(dragFlow)
      .toHaveTriggeredSensorEvent('drag:start');
  });

  test('cancels `drag:start` event when canceling sensor event', () => {
    sandbox.addEventListener('drag:start', (event) => {
      event.detail.cancel();
    });

    function dragFlow() {
      clickMouse(draggableElement);
      waitForDragDelay();
      dragStart(draggableElement);
      waitForDragDelay();
      dragStop(draggableElement);
      releaseMouse(document.body);
    }

    expect(dragFlow)
      .toHaveCanceledSensorEvent('drag:start');
  });

  test('does not trigger `drag:start` event releasing mouse before timeout', () => {
    function dragFlow() {
      clickMouse(draggableElement);
      waitForDragDelay();
      dragStart(draggableElement);
      waitForDragDelay();
      dragStop(draggableElement);
      releaseMouse(document.body);
    }

    function hastyDragFlow() {
      clickMouse(draggableElement);
      dragStart(draggableElement);
      releaseMouse(document.body);
    }

    expect(hastyDragFlow)
      .not
      .toHaveTriggeredSensorEvent('drag:start');

    expect(hastyDragFlow)
      .not
      .toHaveTriggeredSensorEvent('drag:stop');

    expect(dragFlow)
      .toHaveTriggeredSensorEvent('drag:start');

    expect(dragFlow)
      .toHaveTriggeredSensorEvent('drag:stop');
  });

  test('triggers `drag:move` event while moving the mouse', () => {
    function dragFlow() {
      clickMouse(draggableElement);
      waitForDragDelay();
      dragStart(draggableElement);
      waitForDragDelay();
      dragOver(document.body);
      dragStop(draggableElement);
      releaseMouse(document.body);
    }

    expect(dragFlow)
      .toHaveTriggeredSensorEvent('drag:move');
  });

  test('triggers `drag:stop` event when releasing mouse', () => {
    function dragFlow() {
      clickMouse(draggableElement);
      waitForDragDelay();
      dragStart(draggableElement);
      waitForDragDelay();
      dragOver(document.body);
      dragStop(draggableElement);
      releaseMouse(document.body);
    }

    expect(dragFlow)
      .toHaveTriggeredSensorEvent('drag:stop');
  });

  test('does not trigger `drag:start` event when clicking on none draggable element', () => {
    function dragFlow() {
      clickMouse(document.body);
      waitForDragDelay();
      dragStart(document.body);
      waitForDragDelay();
    }

    expect(dragFlow)
      .not
      .toHaveTriggeredSensorEvent('drag:start');
  });
});
