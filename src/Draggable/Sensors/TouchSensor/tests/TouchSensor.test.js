import {createSandbox, triggerEvent, waitForDragDelay, DRAG_DELAY, touchStart, touchMove, touchRelease} from 'helper';

import TouchSensor from '..';

const sampleMarkup = `
  <ul>
    <li>First item</li>
    <li>Second item</li>
  </ul>
`;

describe('TouchSensor', () => {
  let sandbox;
  let touchSensor;
  let draggableElement;

  beforeEach(() => {
    sandbox = createSandbox(sampleMarkup);
    const containers = sandbox.querySelectorAll('ul');
    draggableElement = sandbox.querySelector('li');
    touchSensor = new TouchSensor(containers, {delay: DRAG_DELAY});
    touchSensor.attach();
  });

  afterEach(() => {
    touchSensor.detach();
    sandbox.parentNode.removeChild(sandbox);
  });

  it('triggers `drag:start` sensor event on touchstart', () => {
    function dragFlow() {
      touchStart(draggableElement);
      waitForDragDelay();
      touchRelease(draggableElement);
    }

    expect(dragFlow).toHaveTriggeredSensorEvent('drag:start');
  });

  it('cancels `drag:start` event when canceling sensor event', () => {
    sandbox.addEventListener('drag:start', (event) => {
      event.detail.cancel();
    });

    function dragFlow() {
      touchStart(draggableElement);
      waitForDragDelay();
      touchRelease(draggableElement);
    }

    expect(dragFlow).toHaveCanceledSensorEvent('drag:start');
  });

  it('does not trigger `drag:start` event releasing finger before timeout', () => {
    function dragFlow() {
      touchStart(draggableElement);
      waitForDragDelay();
      touchRelease(document.body);
    }

    function hastyDragFlow() {
      touchStart(draggableElement);
      touchRelease(document.body);
    }

    expect(hastyDragFlow).not.toHaveTriggeredSensorEvent('drag:start');

    expect(hastyDragFlow).not.toHaveTriggeredSensorEvent('drag:stop');

    expect(dragFlow).toHaveTriggeredSensorEvent('drag:start');

    expect(dragFlow).toHaveTriggeredSensorEvent('drag:stop');
  });

  it('triggers `drag:move` event while moving the finger', () => {
    function dragFlow() {
      touchStart(draggableElement);
      waitForDragDelay();
      touchMove(draggableElement);
      touchRelease(draggableElement);
    }

    expect(dragFlow).toHaveTriggeredSensorEvent('drag:move');
  });

  it('triggers `drag:stop` event when releasing the finger', () => {
    function dragFlow() {
      touchStart(draggableElement);
      waitForDragDelay();
      touchMove(draggableElement);
      touchRelease(draggableElement);
    }

    expect(dragFlow).toHaveTriggeredSensorEvent('drag:stop');
  });

  it('prevents `drag:start` when trying to drag a none draggable element', () => {
    function dragFlow() {
      touchStart(document.body);
      waitForDragDelay();
    }

    expect(dragFlow).not.toHaveTriggeredSensorEvent('drag:start');
  });

  it('prevents `drag:start` when touch moved before drag delay', () => {
    function dragFlow() {
      touchStart(draggableElement);
      touchMove(draggableElement);
    }

    expect(dragFlow).not.toHaveTriggeredSensorEvent('drag:start');
  });

  it('prevents context menu while dragging', () => {
    touchStart(draggableElement);
    let contextMenuEvent = triggerEvent(draggableElement, 'contextmenu');
    waitForDragDelay();

    expect(contextMenuEvent.defaultPrevented).toBe(true);

    expect(contextMenuEvent.stoppedPropagation).toBe(true);

    touchRelease(draggableElement);
    contextMenuEvent = triggerEvent(draggableElement, 'contextmenu');

    expect(contextMenuEvent.defaultPrevented).toBe(false);

    expect(contextMenuEvent.stoppedPropagation).toBeUndefined();
  });

  it('prevents scroll on touchmove while dragging', () => {
    let touchMoveEvent = touchMove(draggableElement);

    expect(touchMoveEvent.defaultPrevented).toBe(false);

    touchStart(draggableElement);
    waitForDragDelay();
    touchMoveEvent = touchMove(draggableElement);

    expect(touchMoveEvent.defaultPrevented).toBe(true);

    touchRelease(draggableElement);
  });

  it('prevents clicking on touchend after dragging', () => {
    let touchEndEvent = touchRelease(draggableElement);

    expect(touchEndEvent.defaultPrevented).toBe(false);

    touchStart(draggableElement);
    waitForDragDelay();
    touchEndEvent = touchRelease(draggableElement);

    expect(touchEndEvent.defaultPrevented).toBe(true);
  });
});
