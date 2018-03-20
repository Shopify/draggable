import {createSandbox, triggerEvent, waitForDragDelay, DRAG_DELAY, clickMouse, moveMouse, releaseMouse} from 'helper';

import MouseSensor from '..';

const sampleMarkup = `
  <ul>
    <li>First item</li>
    <li>Second item</li>
  </ul>
`;

describe('MouseSensor', () => {
  let sandbox;
  let mouseSensor;
  let draggableElement;

  beforeEach(() => {
    sandbox = createSandbox(sampleMarkup);
    const containers = sandbox.querySelectorAll('ul');
    draggableElement = sandbox.querySelector('li');
    mouseSensor = new MouseSensor(containers, {delay: DRAG_DELAY});
    mouseSensor.attach();
  });

  afterEach(() => {
    mouseSensor.detach();
    sandbox.parentNode.removeChild(sandbox);
  });

  it('triggers `drag:start` sensor event on mousedown', () => {
    function dragFlow() {
      clickMouse(draggableElement);
      waitForDragDelay();
      releaseMouse(document.body);
    }

    expect(dragFlow).toHaveTriggeredSensorEvent('drag:start');
  });

  it('cancels `drag:start` event when canceling sensor event', () => {
    sandbox.addEventListener('drag:start', (event) => {
      event.detail.cancel();
    });

    function dragFlow() {
      clickMouse(draggableElement);
      waitForDragDelay();
      releaseMouse(draggableElement);
    }

    expect(dragFlow).toHaveCanceledSensorEvent('drag:start');
  });

  it('does not trigger `drag:start` event releasing mouse before timeout', () => {
    function dragFlow() {
      clickMouse(draggableElement);
      waitForDragDelay();
      releaseMouse(document.body);
    }

    function hastyDragFlow() {
      clickMouse(draggableElement);
      releaseMouse(document.body);
    }

    expect(hastyDragFlow).not.toHaveTriggeredSensorEvent('drag:start');

    expect(hastyDragFlow).not.toHaveTriggeredSensorEvent('drag:stop');

    expect(dragFlow).toHaveTriggeredSensorEvent('drag:start');

    expect(dragFlow).toHaveTriggeredSensorEvent('drag:stop');
  });

  it('triggers `drag:move` event while moving the mouse', () => {
    function dragFlow() {
      clickMouse(draggableElement);
      waitForDragDelay();
      moveMouse(document.body);
      releaseMouse(document.body);
    }

    expect(dragFlow).toHaveTriggeredSensorEvent('drag:move');
  });

  it('triggers `drag:stop` event when releasing mouse', () => {
    function dragFlow() {
      clickMouse(draggableElement);
      waitForDragDelay();
      moveMouse(document.body);
      releaseMouse(document.body);
    }

    expect(dragFlow).toHaveTriggeredSensorEvent('drag:stop');
  });

  it('does not trigger `drag:start` event when right clicking or holding ctrl or meta key', () => {
    function dragFlowWithRightClick() {
      clickMouse(draggableElement, {button: 2});
      waitForDragDelay();
      releaseMouse(document.body);
    }

    function dragFlowWithCtrlKey() {
      clickMouse(draggableElement, {ctrlKey: true});
      waitForDragDelay();
      releaseMouse(document.body);
    }

    function dragFlowWithMetaKey() {
      clickMouse(draggableElement, {metaKey: true});
      waitForDragDelay();
      releaseMouse(document.body);
    }

    [dragFlowWithRightClick, dragFlowWithCtrlKey, dragFlowWithMetaKey].forEach((dragFlow) => {
      expect(dragFlow).not.toHaveTriggeredSensorEvent('drag:start');
    });
  });

  it('does not trigger `drag:start` event when clicking on none draggable element', () => {
    function dragFlow() {
      clickMouse(document.body);
      waitForDragDelay();
    }

    expect(dragFlow).not.toHaveTriggeredSensorEvent('drag:start');
  });

  it('prevents context menu while dragging', () => {
    let contextMenuEvent = triggerEvent(draggableElement, 'contextmenu');

    expect(contextMenuEvent).not.toHaveDefaultPrevented();

    clickMouse(draggableElement);
    waitForDragDelay();
    contextMenuEvent = triggerEvent(draggableElement, 'contextmenu');

    expect(contextMenuEvent).toHaveDefaultPrevented();

    releaseMouse(draggableElement);
  });

  it('prevents native drag when initiating drag flow', () => {
    let dragEvent = triggerEvent(draggableElement, 'dragstart');

    expect(dragEvent).not.toHaveDefaultPrevented();

    clickMouse(draggableElement);
    waitForDragDelay();
    dragEvent = triggerEvent(draggableElement, 'dragstart');

    expect(dragEvent).toHaveDefaultPrevented();

    releaseMouse(document.body);
  });
});
