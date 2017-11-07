import {
  createSandbox,
  triggerEvent,
  listenToSensorEvents,
  restoreSensorEvents,
  getSensorEventsByType,
} from 'helper';

import DragSensor from './..';

const sampleMarkup = `
  <ul>
    <li>First item</li>
    <li>Second item</li>
  </ul>
`;

/**
 * Manually firing drag events will require us to mock the `DragEvent.dataTransfer`
 *
 * @return {Object}
 */
function getDataTransferStub() {
  return {
    setData: jest.fn(),
    effectAllowed: null,
  };
}

describe('DragSensor', () => {

  describe('#constructor', () => {
    test('should be instance of DragSensor', () => {
      const dragSensor = new DragSensor();

      expect(dragSensor).toBeInstanceOf(DragSensor);
    });

    test('should initialize dragging state to false', () => {
      const dragSensor = new DragSensor();

      expect(dragSensor.dragging).toBe(false);
    });

    test('should initialize the current container to null', () => {
      const dragSensor = new DragSensor();

      expect(dragSensor.currentContainer).toBe(null);
    });
  });

  describe('#attach', () => {
    test('should add event listeners to each container', () => {
      const containers = [{}, {}, {}];

      // Mock addEventListener for each container
      containers.forEach((container) => {
        container.addEventListener = jest.fn();
      });

      const dragSensor = new DragSensor(containers);

      // Before calling attach, no events should have been added
      containers.forEach((container) => {
        expect(container.addEventListener.mock.calls.length).toBe(0);
      });

      dragSensor.attach();

      // After calling attach, 5 events should have been added
      containers.forEach((container) => {
        expect(container.addEventListener.mock.calls.length).toBe(5);
      });

      // And the events should be correct
      containers.forEach((container) => {
        expect(container.addEventListener.mock.calls[0])
          .toMatchObject(['mousedown', dragSensor._onMouseDown, true]);

        expect(container.addEventListener.mock.calls[1])
          .toMatchObject(['dragstart', dragSensor._onDragStart, false]);

        expect(container.addEventListener.mock.calls[2])
          .toMatchObject(['dragover', dragSensor._onDragOver, false]);

        expect(container.addEventListener.mock.calls[3])
          .toMatchObject(['dragend', dragSensor._onDragEnd, false]);

        expect(container.addEventListener.mock.calls[4])
          .toMatchObject(['drop', dragSensor._onDragDrop, false]);
      });
    });

    test('should add mouseup event listener to document', () => {
      const dragSensor = new DragSensor();

      const originalAddEventListener = document.addEventListener;

      document.addEventListener = jest.fn();

      dragSensor.attach();

      expect(document.addEventListener.mock.calls.length).toBe(1);

      document.addEventListener = originalAddEventListener;
    });
  });

  describe('#detach', () => {
    let container = null;

    beforeEach(() => {
      container = document.createElement('div');
      container.removeEventListener = jest.fn();
      document.removeEventListener = jest.fn();
    });

    afterEach(() => {
      container = null;
    });

    test('should remove event listeners', () => {
      const dragSensor = new DragSensor([container]);

      dragSensor.detach();

      expect(container.removeEventListener.mock.calls.length).toBe(5);

      expect(container.removeEventListener.mock.calls[0])
        .toMatchObject(['mousedown', dragSensor._onMouseDown, true]);

      expect(container.removeEventListener.mock.calls[1])
        .toMatchObject(['dragstart', dragSensor._onDragStart, false]);

      expect(container.removeEventListener.mock.calls[2])
        .toMatchObject(['dragover', dragSensor._onDragOver, false]);

      expect(container.removeEventListener.mock.calls[3])
        .toMatchObject(['dragend', dragSensor._onDragEnd, false]);

      expect(container.removeEventListener.mock.calls[4])
        .toMatchObject(['drop', dragSensor._onDragDrop, false]);
    });
  });

  describe('#[onDragStart]', () => {
    let sandbox;
    let dragSensor;

    beforeEach(() => {
      listenToSensorEvents();
      sandbox = createSandbox(sampleMarkup);
      const container = sandbox.querySelectorAll('ul');
      dragSensor = new DragSensor(container, {
        delay: 0,
        type: 'expected type',
      });
      dragSensor.attach();
    });

    afterEach(() => {
      restoreSensorEvents();
      sandbox.parentNode.removeChild(sandbox);
    });

    test('should trigger `drag:start` sensor event on dragstart', () => {
      const draggable = sandbox.querySelector('li');
      document.elementFromPoint = () => draggable;

      // Fire primary dragstart event
      triggerEvent(draggable, 'dragstart', {
        dataTransfer: getDataTransferStub(),
        clientX: 0,
        clientY: 0,
      });

      expect(getSensorEventsByType('drag:start').length)
        .toBe(1);
    });

    test('should configure DragStartSensorEvent correctly', () => {
      const draggable = sandbox.querySelector('li');
      const dataTransferStub = getDataTransferStub();
      const expectedClientX = 37;
      const expectedClientY = 502;
      document.elementFromPoint = () => draggable;

      // Fire primary dragstart event
      const dispatchedBrowserEvent = triggerEvent(draggable, 'dragstart', {
        clientX: expectedClientX,
        clientY: expectedClientY,
        dataTransfer: dataTransferStub,
      });

      const setDataMock = dataTransferStub.setData.mock;
      const expectedCurrentContainer = document.querySelectorAll('ul')[0];
      const actualDragStartSensorEvent = getSensorEventsByType('drag:start')[0];

      expect(setDataMock.calls.length)
        .toBe(1);

      expect(setDataMock.calls[0])
        .toMatchObject(['text', '']);

      expect(dataTransferStub.effectAllowed)
        .toBe('expected type');

      expect(dragSensor.currentContainer)
        .toBe(expectedCurrentContainer);

      expect(actualDragStartSensorEvent.clientX)
        .toBe(expectedClientX);

      expect(actualDragStartSensorEvent.clientY)
        .toBe(expectedClientY);

      expect(actualDragStartSensorEvent.target)
        .toBe(draggable);

      expect(actualDragStartSensorEvent.container)
        .toBe(expectedCurrentContainer);

      expect(actualDragStartSensorEvent.originalEvent)
        .toBe(dispatchedBrowserEvent);
    });

    test('should set `dragSensor.dragging` to `true`', () => {
      const draggable = sandbox.querySelector('li');
      document.elementFromPoint = () => draggable;

      // Fire primary dragstart event
      triggerEvent(draggable, 'dragstart', {
        dataTransfer: getDataTransferStub(),
      });

      expect(dragSensor.dragging).toBe(true);
    });

    test('should not set `dragSensor.dragging` to be true if event is canceled', () => {
      const draggable = sandbox.querySelector('li');
      const container = document.querySelectorAll('ul')[0];
      document.elementFromPoint = () => draggable;

      // Cancel the DragStartSensorEvent as soon as it is fired
      container.addEventListener('drag:start', (event) => {
        event.detail.cancel();
      }, true);

      // Fire primary dragstart event
      triggerEvent(draggable, 'dragstart', {
        dataTransfer: getDataTransferStub(),
      });

      expect(dragSensor.dragging).toBe(false);
    });
  });

  describe('#[onDragOver]', () => {
    let sandbox;
    let dragSensor;

    beforeEach(() => {
      listenToSensorEvents();
      sandbox = createSandbox(sampleMarkup);
      const container = sandbox.querySelectorAll('ul');
      dragSensor = new DragSensor(container, {
        delay: 0,
        type: 'expected type',
      });
      dragSensor.attach();
    });

    afterEach(() => {
      restoreSensorEvents();
      sandbox.parentNode.removeChild(sandbox);
    });

    test('should trigger `drag:move` sensor event on dragover', () => {
      const draggable = sandbox.querySelector('li');
      document.elementFromPoint = () => draggable;

      // Fire dragstart event to initialize dragging state
      triggerEvent(draggable, 'dragstart', {
        dataTransfer: getDataTransferStub(),
      });

      // Fire primary dragover event
      triggerEvent(draggable, 'dragover');

      expect(getSensorEventsByType('drag:move').length)
        .toBe(1);
    });

    test('should configure DragMoveSensorEvent correctly', () => {
      const draggable = sandbox.querySelector('li');
      const expectedClientX = 88;
      const expectedClientY = 2;
      document.elementFromPoint = () => draggable;

      // Fire dragstart to initialize dragging state
      triggerEvent(draggable, 'dragstart', {
        dataTransfer: getDataTransferStub(),
      });

      // Fire primary dragover event
      const dispatchedBrowserEvent = triggerEvent(draggable, 'dragover', {
        clientX: expectedClientX,
        clientY: expectedClientY,
      });

      const expectedCurrentContainer = document.querySelectorAll('ul')[0];
      const actualDragMoveSensorEvent = getSensorEventsByType('drag:move')[0];

      expect(dragSensor.currentContainer)
        .toBe(expectedCurrentContainer);

      expect(actualDragMoveSensorEvent.clientX)
        .toBe(expectedClientX);

      expect(actualDragMoveSensorEvent.clientY)
        .toBe(expectedClientY);

      expect(actualDragMoveSensorEvent.target)
        .toBe(draggable);

      expect(actualDragMoveSensorEvent.container)
        .toBe(expectedCurrentContainer);

      expect(actualDragMoveSensorEvent.overContainer)
        .toBe(expectedCurrentContainer);

      expect(actualDragMoveSensorEvent.originalEvent)
        .toBe(dispatchedBrowserEvent);
    });

    test('should prevent default on `DragOver` event when `DragMoveSensorEvent` is canceled', () => {
      const draggable = sandbox.querySelector('li');
      const container = sandbox.querySelectorAll('ul')[0];
      let dragOverEvent = null;
      document.elementFromPoint = () => draggable;

      // Cancel the DragMoveSensorEvent to cause the DragOver event to prevent
      // its default behavior
      container.addEventListener('dragover', (event) => {
        dragOverEvent = event;
        dragOverEvent.detail.cancel();
      });

      // Fire dragstart event to initialize dragging state
      triggerEvent(draggable, 'dragstart', {
        dataTransfer: getDataTransferStub(),
      });

      // Fire primary dragover event
      triggerEvent(draggable, 'dragover');

      expect(dragOverEvent.defaultPrevented).toBe(true);
    });

    test('should not trigger DragMoveSensorEvent if not in dragging state', () => {
      const draggable = sandbox.querySelector('li');
      document.elementFromPoint = () => draggable;

      // Fire primary dragstart event
      triggerEvent(draggable, 'dragstart', {
        dataTransfer: getDataTransferStub(),
      });

      expect(getSensorEventsByType('drag:move').length)
        .toBe(0);
    });
  });

  describe('#[onDragEnd]', () => {
    let sandbox;
    let dragSensor;

    beforeEach(() => {
      listenToSensorEvents();
      sandbox = createSandbox(sampleMarkup);
      const container = sandbox.querySelectorAll('ul');
      dragSensor = new DragSensor(container, {
        delay: 0,
      });
      dragSensor.attach();
    });

    afterEach(() => {
      restoreSensorEvents();
      sandbox.parentNode.removeChild(sandbox);
    });

    test('should trigger `drag:stop` sensor event on dragend', () => {
      const draggable = sandbox.querySelector('li');
      document.elementFromPoint = () => draggable;

      // Fire dragstart event to initialize dragging state
      triggerEvent(draggable, 'dragstart', {
        dataTransfer: getDataTransferStub(),
      });

      // Fire primary dragend event
      triggerEvent(draggable, 'dragend');

      expect(getSensorEventsByType('drag:stop').length)
        .toBe(1);
    });

    test('should configure DragStopSensorEvent correctly', () => {
      const draggable = sandbox.querySelector('li');
      const expectedClientX = 15;
      const expectedClientY = 984;
      document.elementFromPoint = () => draggable;

      // Fire dragstart to initialize dragging state
      triggerEvent(draggable, 'dragstart', {
        dataTransfer: getDataTransferStub(),
      });

      // Fire primary dragend event
      const dispatchedBrowserEvent = triggerEvent(draggable, 'dragend', {
        clientX: expectedClientX,
        clientY: expectedClientY,
      });

      const expectedContainer = document.querySelectorAll('ul')[0];
      const actualDragStopSensorEvent = getSensorEventsByType('drag:stop')[0];

      expect(actualDragStopSensorEvent.clientX)
        .toBe(expectedClientX);

      expect(actualDragStopSensorEvent.clientY)
        .toBe(expectedClientY);

      expect(actualDragStopSensorEvent.container)
        .toBe(expectedContainer);

      expect(actualDragStopSensorEvent.originalEvent)
        .toBe(dispatchedBrowserEvent);
    });

    test('should prevent default on `DragEnd` event', () => {
      const draggable = sandbox.querySelector('li');
      document.elementFromPoint = () => draggable;

      // Fire dragstart event to initialize dragging state
      triggerEvent(draggable, 'dragstart', {
        dataTransfer: getDataTransferStub(),
      });

      // Fire primary dragend event
      const dispatchedBrowserEvent = triggerEvent(draggable, 'dragend');

      expect(dispatchedBrowserEvent.defaultPrevented).toBe(true);
    });

    test('should end dragging state', () => {
      const draggable = sandbox.querySelector('li');
      document.elementFromPoint = () => draggable;

      // Fire dragstart event to initialize dragging state
      triggerEvent(draggable, 'dragstart', {
        dataTransfer: getDataTransferStub(),
      });

      // Fire primary dragend event
      triggerEvent(draggable, 'dragend');

      expect(dragSensor.dragging).toBe(false);
    });
  });

  describe('#[onMouseUp]', () => {
    test('should clear mousedown timeout on mouseup', () => {
      jest.useFakeTimers();

      const sandbox = createSandbox(sampleMarkup);
      const containers = sandbox.querySelectorAll('ul');
      const draggable = sandbox.querySelector('li');
      const dragSensor = new DragSensor(containers, {
        delay: 0,
        draggable: 'li',
      });

      dragSensor.attach();

      triggerEvent(draggable, 'mousedown');

      jest.runTimersToTime(1);

      expect(draggable.draggable).toBe(true);

      triggerEvent(draggable, 'mouseup');

      expect(draggable.draggable).toBe(false);
    });
  });

});
