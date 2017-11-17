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

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runAllTimers();
  });

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
    beforeEach(() => {
      document.removeEventListener = jest.fn();
    });

    test('should remove event listeners', () => {
      const dragSensor = new DragSensor([]);

      dragSensor.detach();

      expect(document.removeEventListener.mock.calls.length).toBe(1);
    });
  });

  describe('#[onDragStart]', () => {
    let sandbox;
    let dragSensor;

    beforeEach(() => {
      listenToSensorEvents();
      sandbox = createSandbox(sampleMarkup);
      const containers = sandbox.querySelectorAll('ul');
      dragSensor = new DragSensor(containers, {
        delay: 0,
        type: 'expected type',
      });
      dragSensor.attach();
    });

    afterEach(() => {
      dragSensor.detach();
      restoreSensorEvents();
      sandbox.parentNode.removeChild(sandbox);
    });

    test('should trigger `drag:start` sensor event on dragstart', () => {
      const draggable = sandbox.querySelector('li');
      document.elementFromPoint = () => draggable;

      // Activate draggable attribute
      triggerEvent(draggable, 'mousedown');

      // Fire primary dragstart event
      triggerEvent(draggable, 'dragstart', {
        dataTransfer: getDataTransferStub(),
        clientX: 0,
        clientY: 0,
      });

      jest.runTimersToTime(1);

      expect(getSensorEventsByType('drag:start').length)
        .toBe(1);

      // Deactivate draggable attribute
      triggerEvent(draggable, 'mouseup');
    });

    xtest('should configure DragStartSensorEvent correctly', () => {
      const draggable = sandbox.querySelector('li');
      const dataTransferStub = getDataTransferStub();
      const expectedClientX = 37;
      const expectedClientY = 502;
      document.elementFromPoint = () => draggable;

      // Activate draggable attribute
      triggerEvent(draggable, 'mousedown');

      // Fire primary dragstart event
      const dispatchedBrowserEvent = triggerEvent(draggable, 'dragstart', {
        clientX: expectedClientX,
        clientY: expectedClientY,
        dataTransfer: dataTransferStub,
      });

      jest.runTimersToTime(1);

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

      // Activate draggable attribute
      triggerEvent(draggable, 'mousedown');

      // Fire primary dragstart event
      triggerEvent(draggable, 'dragstart', {
        dataTransfer: getDataTransferStub(),
      });

      jest.runTimersToTime(1);

      expect(dragSensor.dragging).toBe(true);

      // Deactivate draggable attribute
      triggerEvent(draggable, 'mouseup');
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

      // Activate draggable attribute
      triggerEvent(draggable, 'mousedown');

      // Fire dragstart event to initialize dragging state
      triggerEvent(draggable, 'dragstart', {
        dataTransfer: getDataTransferStub(),
      });

      jest.runTimersToTime(100);

      // Fire primary dragover event
      triggerEvent(draggable, 'dragover');

      expect(getSensorEventsByType('drag:move').length)
        .toBe(1);

      // Deactivate draggable attribute
      triggerEvent(draggable, 'mouseup');
    });

    test('should configure DragMoveSensorEvent correctly', () => {
      const draggable = sandbox.querySelector('li');
      const expectedClientX = 88;
      const expectedClientY = 2;
      document.elementFromPoint = () => draggable;

      // Activate draggable attribute
      triggerEvent(draggable, 'mousedown');

      // Fire dragstart to initialize dragging state
      triggerEvent(draggable, 'dragstart', {
        dataTransfer: getDataTransferStub(),
      });

      jest.runTimersToTime(100);

      // Fire primary dragover event
      const dispatchedBrowserEvent = triggerEvent(draggable, 'dragover', {
        clientX: expectedClientX,
        clientY: expectedClientY,
      });

      const expectedCurrentContainer = document.querySelector('ul');
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

      expect(actualDragMoveSensorEvent.originalEvent)
        .toBe(dispatchedBrowserEvent);

      // Deactivate draggable attribute
      triggerEvent(draggable, 'mouseup');
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

      // Activate draggable attribute
      triggerEvent(draggable, 'mousedown');

      // Fire dragstart event to initialize dragging state
      triggerEvent(draggable, 'dragstart', {
        dataTransfer: getDataTransferStub(),
      });

      jest.runTimersToTime(100);

      // Fire primary dragover event
      triggerEvent(draggable, 'dragover');

      // Deactivate draggable attribute
      triggerEvent(draggable, 'mouseup');

      expect(dragOverEvent.defaultPrevented).toBe(true);
    });

    test('should not trigger DragMoveSensorEvent if not in dragging state', () => {
      const draggable = sandbox.querySelector('li');
      document.elementFromPoint = () => draggable;

      // Activate draggable attribute
      triggerEvent(draggable, 'mousedown');

      // Fire primary dragstart event
      triggerEvent(draggable, 'dragstart', {
        dataTransfer: getDataTransferStub(),
      });

      // Deactivate draggable attribute
      triggerEvent(draggable, 'mouseup');

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

      // Activate draggable attribute
      triggerEvent(draggable, 'mousedown');

      // Fire dragstart event to initialize dragging state
      triggerEvent(draggable, 'dragstart', {
        dataTransfer: getDataTransferStub(),
      });

      jest.runTimersToTime(1);

      // Fire primary dragend event
      triggerEvent(draggable, 'dragend');

      expect(getSensorEventsByType('drag:stop').length)
        .toBe(1);

      // Deactivate draggable attribute
      triggerEvent(draggable, 'mouseup');
    });

    test('should configure DragStopSensorEvent correctly', () => {
      const draggable = sandbox.querySelector('li');
      const expectedClientX = 15;
      const expectedClientY = 984;
      document.elementFromPoint = () => draggable;

      // Activate draggable attribute
      triggerEvent(draggable, 'mousedown');

      // Fire dragstart to initialize dragging state
      triggerEvent(draggable, 'dragstart', {
        dataTransfer: getDataTransferStub(),
      });

      jest.runTimersToTime(1);

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

      dragSensor.detach();
    });
  });

});
