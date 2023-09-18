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

import DragSensor from '..';

const sampleMarkup = `
  <ul>
    <li class="draggable">First item</li>
    <li class="draggable">Second item</li>
    <li class="non-draggable">Non draggable item</li>
  </ul>
`;

describe('DragSensor', () => {
  let sandbox;
  let dragSensor;
  let draggableElement;
  let nonDraggableElement;

  function setup(optionsParam = {}) {
    const options = {
      draggable: '.draggable',
      delay: 0,
      distance: 0,
      ...optionsParam,
    };

    sandbox = createSandbox(sampleMarkup);
    const containers = sandbox.querySelectorAll('ul');
    draggableElement = sandbox.querySelector('.draggable');
    nonDraggableElement = sandbox.querySelector('.non-draggable');
    dragSensor = new DragSensor(containers, options);
    dragSensor.attach();
  }

  function teardown() {
    dragSensor.detach();
    sandbox.remove();
  }

  describe('common', () => {
    beforeEach(setup);

    afterEach(teardown);

    /* eslint-disable jest/no-disabled-tests */
    it.skip('mousedown handler adds draggable attribute', () => {
      expect(draggableElement.draggable).toBeUndefined();

      clickMouse(draggableElement);
      waitForDragDelay();

      expect(draggableElement.draggable).toBe(true);

      releaseMouse(draggableElement);

      expect(draggableElement.draggable).toBe(false);
    });
    /* eslint-enable jest/no-disabled-tests */

    it('triggers `drag:start` sensor event on dragstart', () => {
      function dragFlow() {
        clickMouse(draggableElement);
        waitForDragDelay();
        dragStart(draggableElement);
        waitForDragDelay();
        dragStop(draggableElement);
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
        dragStart(draggableElement);
        waitForDragDelay();
        dragStop(draggableElement);
        releaseMouse(document.body);
      }

      expect(dragFlow).toHaveCanceledSensorEvent('drag:start');
    });

    it('does not trigger `drag:start` event releasing mouse before timeout', () => {
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

      expect(hastyDragFlow).not.toHaveTriggeredSensorEvent('drag:start');

      expect(hastyDragFlow).not.toHaveTriggeredSensorEvent('drag:stop');

      expect(dragFlow).toHaveTriggeredSensorEvent('drag:start');

      expect(dragFlow).toHaveTriggeredSensorEvent('drag:stop');
    });

    it('triggers `drag:move` event while moving the mouse', () => {
      function dragFlow() {
        clickMouse(draggableElement);
        waitForDragDelay();
        dragStart(draggableElement);
        waitForDragDelay();
        dragOver(document.body);
        dragStop(draggableElement);
        releaseMouse(document.body);
      }

      expect(dragFlow).toHaveTriggeredSensorEvent('drag:move');
    });

    it('triggers `drag:stop` event when releasing mouse', () => {
      function dragFlow() {
        clickMouse(draggableElement);
        waitForDragDelay();
        dragStart(draggableElement);
        waitForDragDelay();
        dragOver(document.body);
        dragStop(draggableElement);
        releaseMouse(document.body);
      }

      expect(dragFlow).toHaveTriggeredSensorEvent('drag:stop');
    });

    it('does not trigger `drag:start` event when clicking on none draggable element', () => {
      function dragFlow() {
        clickMouse(document.body);
        waitForDragDelay();
        dragStart(document.body);
        waitForDragDelay();
        dragStop(draggableElement);
        releaseMouse(document.body);

        clickMouse(nonDraggableElement);
        waitForDragDelay();
        dragStart(nonDraggableElement);
        waitForDragDelay();
        dragStop(draggableElement);
        releaseMouse(document.body);
      }

      expect(dragFlow).not.toHaveTriggeredSensorEvent('drag:start');
    });
  });

  describe('using delay', () => {
    beforeEach(() => {
      setup({delay: DRAG_DELAY});
    });

    afterEach(teardown);

    it('triggers `drag:start` sensor event after delay', () => {
      function dragFlow() {
        clickMouse(draggableElement);
        waitForDragDelay();
        dragStart(draggableElement);
        waitForDragDelay();
        dragStop(draggableElement);
        releaseMouse(document.body);
      }

      expect(dragFlow).toHaveTriggeredSensorEvent('drag:start');
    });

    it('does not trigger `drag:start` event releasing mouse before delay', () => {
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
        dragStop(draggableElement);
        releaseMouse(document.body);
      }

      expect(hastyDragFlow).not.toHaveTriggeredSensorEvent('drag:start');

      expect(hastyDragFlow).not.toHaveTriggeredSensorEvent('drag:stop');

      expect(dragFlow).toHaveTriggeredSensorEvent('drag:start');

      expect(dragFlow).toHaveTriggeredSensorEvent('drag:stop');
    });

    it('triggers `drag:move` event while moving the mouse after delay', () => {
      function dragFlow() {
        clickMouse(draggableElement);
        waitForDragDelay();
        dragStart(draggableElement);
        waitForDragDelay();
        dragOver(document.body);
        dragStop(draggableElement);
        releaseMouse(document.body);
      }

      expect(dragFlow).toHaveTriggeredSensorEvent('drag:move');
    });
  });
});
