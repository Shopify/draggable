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

  function setup(options = {delay: 0, distance: 0}) {
    sandbox = createSandbox(sampleMarkup);
    const containers = sandbox.querySelectorAll('ul');
    draggableElement = sandbox.querySelector('li');
    touchSensor = new TouchSensor(containers, options);
    touchSensor.attach();
  }

  function teardown() {
    touchSensor.detach();
    sandbox.parentNode.removeChild(sandbox);
  }
  describe('common', () => {
    beforeEach(setup);
    afterEach(teardown);
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

    it('prevents `drag:start` when trying to drag a none draggable element', () => {
      function dragFlow() {
        touchStart(document.body);
        waitForDragDelay();
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
  describe('using distance', () => {
    beforeEach(() => {
      setup({delay: 0, distance: 1});
    });

    afterEach(teardown);
    it('does not trigger `drag:start` before distance has been travelled', () => {
      function dragFlow() {
        touchStart(draggableElement);
        touchRelease(draggableElement);
      }

      expect(dragFlow).not.toHaveTriggeredSensorEvent('drag:start');
    });

    it('triggers `drag:start` sensor event after distance requirement has been met', () => {
      function dragFlow() {
        touchStart(draggableElement);
        touchMove(draggableElement, {touches: [{pageX: 1, pageY: 0}]});
      }

      expect(dragFlow).toHaveTriggeredSensorEvent('drag:start');
    });

    it('triggers `drag:move` event while moving the finger after delay', () => {
      function dragFlow() {
        touchStart(draggableElement);
        touchMove(draggableElement, {touches: [{pageX: 1, pageY: 0}]});
        touchMove(draggableElement);
        touchRelease(draggableElement);
      }

      expect(dragFlow).toHaveTriggeredSensorEvent('drag:move');
    });

    it('triggers `drag:stop` event when releasing the finger after dragging has started', () => {
      function dragFlow() {
        touchStart(draggableElement);
        touchMove(draggableElement, {touches: [{pageX: 1, pageY: 0}]});
        touchRelease(draggableElement);
      }

      expect(dragFlow).toHaveTriggeredSensorEvent('drag:stop');
    });

    it('does not triggers `drag:stop` event when releasing the finger before dragging has started', () => {
      function dragFlow() {
        touchStart(draggableElement);
        touchRelease(draggableElement);
      }

      expect(dragFlow).not.toHaveTriggeredSensorEvent('drag:stop');
    });
  });

  describe('using delay', () => {
    beforeEach(() => {
      setup({delay: DRAG_DELAY, distance: 0});
    });
    afterEach(teardown);

    it('does not trigger `drag:start` before delay ends', () => {
      function dragFlow() {
        touchStart(draggableElement);
        touchRelease(draggableElement);
      }

      expect(dragFlow).not.toHaveTriggeredSensorEvent('drag:start');
    });

    it('triggers `drag:start` sensor event on touchstart after delay', () => {
      function dragFlow() {
        touchStart(draggableElement);
        waitForDragDelay();
      }

      expect(dragFlow).toHaveTriggeredSensorEvent('drag:start');
    });

    it('triggers `drag:move` event while moving the finger after delay', () => {
      function dragFlow() {
        touchStart(draggableElement);
        waitForDragDelay();
        touchMove(draggableElement);
        touchRelease(draggableElement);
      }

      expect(dragFlow).toHaveTriggeredSensorEvent('drag:move');
    });

    it('triggers `drag:stop` event when releasing the finger after dragging has started', () => {
      function dragFlow() {
        touchStart(draggableElement);
        waitForDragDelay();
        touchMove(draggableElement);
        touchRelease(draggableElement);
      }

      expect(dragFlow).toHaveTriggeredSensorEvent('drag:stop');
    });

    it('does not triggers `drag:stop` event when releasing the finger before dragging has started', () => {
      function dragFlow() {
        touchStart(draggableElement);
        touchMove(draggableElement);
        touchRelease(draggableElement);
      }

      expect(dragFlow).not.toHaveTriggeredSensorEvent('drag:stop');
    });
  });

  describe('delay and distance', () => {
    beforeEach(() => {
      setup({delay: DRAG_DELAY, distance: 1});
    });
    afterEach(teardown);

    it('does not trigger `drag:start` before delay ends', () => {
      function dragFlow() {
        touchStart(draggableElement);
        touchMove(draggableElement, {touches: [{pageX: 1, pageY: 0}]});
        touchRelease(draggableElement);
      }

      expect(dragFlow).not.toHaveTriggeredSensorEvent('drag:start');
    });

    it('does not trigger `drag:start` before distance requirement is met', () => {
      function dragFlow() {
        touchStart(draggableElement);
        waitForDragDelay();
        touchRelease(draggableElement);
      }

      expect(dragFlow).not.toHaveTriggeredSensorEvent('drag:start');
    });

    it('only triggers `drag:start` sensor event once when delay ends after distance is met', () => {
      function dragFlow() {
        touchStart(draggableElement);
        touchMove(draggableElement, {touches: [{pageX: 1, pageY: 0}]});
        waitForDragDelay();
        touchRelease(draggableElement);
      }

      expect(dragFlow).toHaveTriggeredSensorEvent('drag:start', 1);
    });

    it('only triggers `drag:start` sensor event once when delay ends at the same time distance is met', () => {
      function dragFlow() {
        touchStart(draggableElement);
        const next = Date.now() + DRAG_DELAY;
        const dateMock = jest.spyOn(Date, 'now').mockImplementation(() => {
          return next;
        });
        jest.runTimersToTime(DRAG_DELAY);
        touchMove(draggableElement, {touches: [{pageX: 1, pageY: 0}]});
        touchRelease(draggableElement);
        dateMock.mockRestore();
      }

      expect(dragFlow).toHaveTriggeredSensorEvent('drag:start', 1);
    });

    it('only triggers `drag:start` sensor event once when distance is met after delay', () => {
      function dragFlow() {
        touchStart(draggableElement);
        // do not use waitForDragDelay as it will reset the mock before touchMove
        const next = Date.now() + DRAG_DELAY + 1;
        const dateMock = jest.spyOn(Date, 'now').mockImplementation(() => {
          return next;
        });
        jest.runTimersToTime(DRAG_DELAY + 1);
        touchMove(draggableElement, {touches: [{pageX: 1, pageY: 1}]});
        dateMock.mockRestore();
        touchRelease(draggableElement);
      }

      expect(dragFlow).toHaveTriggeredSensorEvent('drag:start', 1);
    });
  });
});
