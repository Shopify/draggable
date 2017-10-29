import {
  createSandbox,
} from 'helper';

import Draggable, {
  defaultOptions,
} from './../Draggable';

import {
  DragStartEvent,
  DragMoveEvent,
  DragStopEvent,
} from './../DragEvent';

import {
  DraggableInitializedEvent,
  DraggableDestroyEvent,
} from './../DraggableEvent';

import {Accessibility, Mirror} from './../Plugins';

import {
  DragSensor,
  MouseSensor,
  TouchSensor,
} from './../Sensors';

const sampleMarkup = `
  <ul>
    <li>First item</li>
    <li>Second item</li>
  </ul>
`;

/**
 * A stub of the Plugin class
 *
 * @class PluginStub
 */
class PluginStub {

  /**
   * Constructor.
   *
   * @param {Draggable} draggable
   */
  constructor(draggable) {
    this.draggable = draggable;
    this.numTimesAttachCalled = 0;
    this.numTimesDetachCalled = 0;
  }

  /**
   * Set a testable property when `attach` is called
   */
  attach() {
    this.attachWasCalled = true;
    this.numTimesAttachCalled++;
  }

  /**
   * Set a testable property when `detach` is called
   */
  detach() {
    this.detachWasCalled = true;
    this.numTimesDetachCalled++;
  }
}

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

  describe('#constructor', () => {
    test('should be an instance of Draggable', () => {
      expect(draggable).toBeInstanceOf(Draggable);
    });

    test('should initialize with default options', () => {
      const containers = sandbox.querySelectorAll('ul');
      const newInstance = new Draggable(containers);

      for (const key in defaultOptions) {
        if (Object.prototype.hasOwnProperty.call(defaultOptions, key)) {
          expect(newInstance.options[key])
            .toBe(defaultOptions[key]);
        }
      }
    });

    test('should add event listeners to containers', () => {
      const containers = sandbox.querySelectorAll('ul');

      containers.forEach((container) => {
        container.addEventListener = jest.fn();
      });

      const newInstance = new Draggable(containers);

      containers.forEach((container) => {
        expect(container.addEventListener.mock.calls[0])
          .toMatchObject(['drag:start', newInstance.dragStart, true]);

        expect(container.addEventListener.mock.calls[1])
          .toMatchObject(['drag:move', newInstance.dragMove, true]);

        expect(container.addEventListener.mock.calls[2])
          .toMatchObject(['drag:stop', newInstance.dragStop, true]);

        expect(container.addEventListener.mock.calls[3])
          .toMatchObject(['drag:pressure', newInstance.dragPressure, true]);
      });
    });

    test('should attach default plugins', () => {
      const newInstance = new Draggable();

      expect(newInstance.activePlugins.length)
        .toBe(2);

      expect(newInstance.activePlugins[0])
        .toBeInstanceOf(Mirror);

      expect(newInstance.activePlugins[1])
        .toBeInstanceOf(Accessibility);
    });

    test('should attach custom plugins', () => {
      const newInstance = new Draggable([], {
        plugins: [
          PluginStub,
        ],
      });

      expect(newInstance.activePlugins.length)
        .toBe(3);

      const customPlugin = newInstance.activePlugins[2];

      expect(customPlugin.draggable).toBe(newInstance);

      expect(customPlugin.attachWasCalled)
        .toBe(true);
    });

    test('should attach sensors for native option', () => {
      const newInstance = new Draggable([], {
        native: true,
      });

      expect(newInstance.activeSensors.length)
        .toBe(2);

      expect(newInstance.activeSensors[0])
        .toBeInstanceOf(TouchSensor);

      expect(newInstance.activeSensors[1])
        .toBeInstanceOf(DragSensor);
    });

    test('should attach sensors for non-native option', () => {
      const newInstance = new Draggable([], {
        native: false,
      });

      expect(newInstance.activeSensors.length)
        .toBe(2);

      expect(newInstance.activeSensors[0])
        .toBeInstanceOf(TouchSensor);

      expect(newInstance.activeSensors[1])
        .toBeInstanceOf(MouseSensor);
    });

    test('should trigger DraggableInitializedEvent on init', () => {
      const spy = jest.spyOn(Draggable.prototype, 'triggerEvent');
      const newInstance = new Draggable();

      expect(spy.mock.calls.length)
        .toBe(1);

      expect(spy.mock.calls[0][0])
        .toBeInstanceOf(DraggableInitializedEvent);

      expect(spy.mock.calls[0][0].draggable)
        .toBe(newInstance);

      spy.mockReset();
      spy.mockRestore();
    });
  });

  describe('#destroy', () => {
    test('should remove event listeners from containers', () => {
      const containers = sandbox.querySelectorAll('ul');

      containers.forEach((container) => {
        container.removeEventListener = jest.fn();
      });

      const newInstance = new Draggable(containers);

      newInstance.destroy();

      containers.forEach((container) => {
        expect(container.removeEventListener.mock.calls[0])
          .toMatchObject(['drag:start', newInstance.dragStart, true]);

        expect(container.removeEventListener.mock.calls[1])
          .toMatchObject(['drag:move', newInstance.dragMove, true]);

        expect(container.removeEventListener.mock.calls[2])
          .toMatchObject(['drag:stop', newInstance.dragStop, true]);

        expect(container.removeEventListener.mock.calls[3])
          .toMatchObject(['drag:pressure', newInstance.dragPressure, true]);
      });
    });

    test('triggers `draggable:destroy` event on destroy', () => {
      const newInstance = new Draggable();
      const callback = jest.fn();

      newInstance.on('draggable:destroy', callback);

      newInstance.destroy();

      const call = callback.mock.calls[0][0];

      expect(call.type)
        .toBe('draggable:destroy');

      expect(call)
        .toBeInstanceOf(DraggableDestroyEvent);

      expect(call.draggable)
        .toBe(newInstance);
    });

    test('should call Plugin#detach once on each of provided plugins', () => {
      const newInstance = new Draggable([], {
        plugins: [PluginStub, PluginStub, PluginStub],
      });

      newInstance.destroy();

      expect(newInstance.activePlugins[2].detachWasCalled)
        .toBe(true);

      expect(newInstance.activePlugins[2].numTimesDetachCalled)
        .toBe(1);

      expect(newInstance.activePlugins[3].detachWasCalled)
        .toBe(true);

      expect(newInstance.activePlugins[3].numTimesDetachCalled)
        .toBe(1);

      expect(newInstance.activePlugins[4].detachWasCalled)
        .toBe(true);

      expect(newInstance.activePlugins[4].numTimesDetachCalled)
        .toBe(1);
    });
  });

  describe('#on', () => {
    test('should add an event handler to the list of callbacks', () => {
      const newInstance = new Draggable();
      function stubHandler() { /* do nothing */ }

      expect('my:event' in newInstance.callbacks)
        .toBe(false);

      newInstance.on('my:event', stubHandler);

      expect('my:event' in newInstance.callbacks)
        .toBe(true);

      expect(newInstance.callbacks['my:event'])
        .toMatchObject([stubHandler]);
    });

    test('should return draggable instance', () => {
      const newInstance = new Draggable();
      function stubHandler() { /* do nothing */ }

      expect('my:event' in newInstance.callbacks)
        .toBe(false);

      const returnValue = newInstance.on('my:event', stubHandler);

      expect(returnValue)
        .toBe(newInstance);
    });
  });

  describe('#off', () => {
    test('should return null if event was not bound', () => {
      const newInstance = new Draggable();
      function stubHandler() { /* do nothing */ }

      expect('my:event' in newInstance.callbacks)
        .toBe(false);

      const returnValue = newInstance.off('my:event', stubHandler);

      expect(returnValue).toBe(null);
    });

    test('should remove event handler from the list of callbacks', () => {
      const newInstance = new Draggable();
      function stubHandler() { /* do nothing */ }

      newInstance.on('my:event', stubHandler);

      expect('my:event' in newInstance.callbacks)
        .toBe(true);

      newInstance.off('my:event', stubHandler);

      expect('my:event' in newInstance.callbacks)
        .toBe(true);

      expect(newInstance.callbacks['my:event'])
        .toMatchObject([]);
    });

    test('should return draggable instance', () => {
      const newInstance = new Draggable();
      function stubHandler() { /* do nothing */ }

      newInstance.on('my:event', stubHandler);

      expect('my:event' in newInstance.callbacks)
        .toBe(true);

      const returnValue = newInstance.off('my:event', stubHandler);

      expect(returnValue)
        .toBe(newInstance);
    });
  });

  describe('#sensors', () => {
    test('should return default sensors for non-native option', () => {
      const containers = sandbox.querySelectorAll('ul');
      const newInstance = new Draggable(containers, {
        native: false,
      });
      const sensors = newInstance.sensors();

      expect(sensors.length)
        .toBe(2);

      expect(new sensors[0]())
        .toBeInstanceOf(TouchSensor);

      expect(new sensors[1]())
        .toBeInstanceOf(MouseSensor);
    });

    test('should return native sensors for native option', () => {
      const containers = sandbox.querySelectorAll('ul');
      const newInstance = new Draggable(containers, {
        native: true,
      });
      const sensors = newInstance.sensors();

      expect(sensors.length)
        .toBe(2);

      expect(new sensors[0]())
        .toBeInstanceOf(TouchSensor);

      expect(new sensors[1]())
        .toBeInstanceOf(DragSensor);
    });
  });


  describe('#trigger', () => {
    test('should invoke bound event', () => {
      const handler = jest.fn();

      draggable.on('my:event', handler);

      draggable.trigger('my:event', 'expectedArg', 'expectedArg2');

      expect(handler.mock.calls.length)
        .toBe(1);

      expect(handler.mock.calls[0].length)
        .toBe(2);

      expect(handler.mock.calls[0][0])
        .toBe('expectedArg');

      expect(handler.mock.calls[0][1])
        .toBe('expectedArg2');
    });
  });

  describe('#triggerEvent', () => {
    test('should invoke bound event by its type', () => {
      const handler = jest.fn();
      const event = {
        type: 'my:event',
        value: 'expectedValue',
      };

      draggable.on('my:event', handler);

      draggable.triggerEvent(event);

      expect(handler.mock.calls.length)
        .toBe(1);

      expect(handler.mock.calls[0].length)
        .toBe(1);

      expect(handler.mock.calls[0][0])
        .toMatchObject(event);
    });
  });

  test('triggers `drag:start` drag event on mousedown', () => {
    const draggableElement = sandbox.querySelector('li');
    document.elementFromPoint = () => draggableElement;

    const callback = jest.fn();
    draggable.on('drag:start', callback);

    const event = new MouseEvent('mousedown');

    draggableElement.dispatchEvent(event);

    // Wait for delay
    jest.runTimersToTime(100);

    const call = callback.mock.calls[0][0];

    expect(call.type)
      .toBe('drag:start');

    expect(call)
      .toBeInstanceOf(DragStartEvent);
  });

  test('should trigger `drag:start` drag event on dragstart', () => {
    const draggableElement = sandbox.querySelector('li');

    const callback = jest.fn();
    draggable.on('drag:start', callback);

    const event = new MouseEvent('mousedown');

    draggableElement.dispatchEvent(event);

    // Wait for delay
    jest.runTimersToTime(100);

    draggableElement.dispatchEvent(new MouseEvent('dragstart'));

    const call = callback.mock.calls[0][0];

    expect(call.type)
      .toBe('drag:start');

    expect(call)
      .toBeInstanceOf(DragStartEvent);
  });

  test('triggers `drag:move` drag event on mousedown', () => {
    const draggableElement = sandbox.querySelector('li');
    const expectedClientX = 39;
    const expectedClientY = 82;

    draggableElement.dispatchEvent(new MouseEvent('mousedown'));

    // Wait for delay
    jest.runTimersToTime(100);

    const callback = jest.fn();
    draggable.on('drag:move', callback);

    const event = new MouseEvent('mousemove', {
      clientX: expectedClientX,
      clientY: expectedClientY,
    });

    document.dispatchEvent(event);

    const call = callback.mock.calls[0][0];
    const sensorEvent = call.data.sensorEvent;

    expect(call.type)
      .toBe('drag:move');

    expect(call)
      .toBeInstanceOf(DragMoveEvent);

    expect(sensorEvent.clientX)
      .toBe(39);

    expect(sensorEvent.clientY)
      .toBe(82);
  });

  test('triggers `drag:stop` drag event on mouseup', () => {
    const draggableElement = sandbox.querySelector('li');
    document.elementFromPoint = () => draggableElement;

    draggableElement.dispatchEvent(new MouseEvent('mousedown'));

    // Wait for delay
    jest.runTimersToTime(100);

    const callback = jest.fn();
    draggable.on('drag:stop', callback);

    document.dispatchEvent(new MouseEvent('mouseup'));

    const call = callback.mock.calls[0][0];

    expect(call.type)
      .toBe('drag:stop');

    expect(call)
      .toBeInstanceOf(DragStopEvent);
  });

  test('adds `source:dragging` classname to draggable element on mousedown', () => {
    const draggableElement = sandbox.querySelector('li');

    draggableElement.dispatchEvent(new MouseEvent('mousedown'));

    // Wait for delay
    jest.runTimersToTime(100);

    expect(draggable.source.classList)
      .toContain('draggable-source--is-dragging');
  });

  test('removes `source:dragging` classname from draggable element on mouseup', () => {
    const draggableElement = sandbox.querySelector('li');
    document.elementFromPoint = () => draggableElement;

    draggableElement.dispatchEvent(new MouseEvent('mousedown'));

    // Wait for delay
    jest.runTimersToTime(100);

    const source = draggable.source;

    expect(source.classList)
      .toContain('draggable-source--is-dragging');

    document.dispatchEvent(new MouseEvent('mouseup'));

    expect(source.classList)
      .not
      .toContain('draggable-source--is-dragging');
  });

  test('removes `source:dragging` classname from draggable element on dragEvent.cancel()', () => {
    const draggableElement = sandbox.querySelector('li');
    document.elementFromPoint = () => draggableElement;

    draggable.on('drag:start', (event) => {
      expect(draggable.source.classList)
        .toContain('draggable-source--is-dragging');

      event.cancel();
    });

    draggableElement.dispatchEvent(new MouseEvent('mousedown'));

    // Wait for delay
    jest.runTimersToTime(100);

    const source = draggable.source;

    expect(source.classList)
      .not
      .toContain('draggable-source--is-dragging');
  });

  test('adds `body:dragging` classname to body on mousedown', () => {
    const draggableElement = sandbox.querySelector('li');
    document.elementFromPoint = () => draggableElement;

    draggableElement.dispatchEvent(new MouseEvent('mousedown'));

    // Wait for delay
    jest.runTimersToTime(100);

    expect(document.body.classList)
      .toContain('draggable--is-dragging');
  });

  test('removes `body:dragging` classname from body on mouseup', () => {
    const draggableElement = sandbox.querySelector('li');
    document.elementFromPoint = () => draggableElement;

    draggableElement.dispatchEvent(new MouseEvent('mousedown'));

    // Wait for delay
    jest.runTimersToTime(100);

    expect(document.body.classList)
      .toContain('draggable--is-dragging');

    document.dispatchEvent(new MouseEvent('mouseup'));

    expect(document.body.classList)
      .not
      .toContain('draggable--is-dragging');
  });

  test('removes `body:dragging` classname from body on dragEvent.cancel()', () => {
    const draggableElement = sandbox.querySelector('li');
    document.elementFromPoint = () => draggableElement;

    draggable.on('drag:start', (event) => {
      expect(document.body.classList)
        .toContain('draggable--is-dragging');

      event.cancel();
    });

    draggableElement.dispatchEvent(new MouseEvent('mousedown'));

    // Wait for delay
    jest.runTimersToTime(100);

    expect(document.body.classList)
      .not
      .toContain('draggable--is-dragging');
  });

  test('adds `container:placed` classname to draggable container element on mouseup', () => {
    const draggableElement = sandbox.querySelector('li');
    const container = sandbox.querySelector('ul');

    draggableElement.dispatchEvent(new MouseEvent('mousedown'));

    // Wait for delay
    jest.runTimersToTime(100);

    document.dispatchEvent(new MouseEvent('mouseup'));

    expect(container.classList)
      .toContain('draggable-container--placed');
  });

  test('removes `container:placed` classname from draggable container element on mouseup after delay', () => {
    const draggableElement = sandbox.querySelector('li');
    const container = sandbox.querySelector('ul');

    draggableElement.dispatchEvent(new MouseEvent('mousedown'));

    // Wait for delay
    jest.runTimersToTime(100);

    document.dispatchEvent(new MouseEvent('mouseup'));

    expect(container.classList)
      .toContain('draggable-container--placed');

    // Wait for default draggable.options.placedTimeout delay
    jest.runTimersToTime(800);

    expect(container.classList)
      .not
      .toContain('draggable-container--placed');
  });

  test('adds `container:dragging` classname to draggable container element on mousedown', () => {
    const draggableElement = sandbox.querySelector('li');
    const container = sandbox.querySelector('ul');

    draggableElement.dispatchEvent(new MouseEvent('mousedown'));

    // Wait for delay
    jest.runTimersToTime(100);

    expect(container.classList)
      .toContain('draggable-container--is-dragging');
  });

  test('removes `container:dragging` classname from draggable container element on mouseup', () => {
    const draggableElement = sandbox.querySelector('li');
    const container = sandbox.querySelector('ul');

    draggableElement.dispatchEvent(new MouseEvent('mousedown'));

    // Wait for delay
    jest.runTimersToTime(100);

    expect(container.classList)
      .toContain('draggable-container--is-dragging');

    document.dispatchEvent(new MouseEvent('mouseup'));

    expect(container.classList)
      .not
      .toContain('draggable-container--is-dragging');
  });

  test('removes `container:dragging` classname from draggable container element on dragEvent.cancel()', () => {
    const draggableElement = sandbox.querySelector('li');
    const container = sandbox.querySelector('ul');

    draggable.on('drag:start', (event) => {
      expect(container.classList)
        .toContain('draggable-container--is-dragging');

      event.cancel();
    });

    draggableElement.dispatchEvent(new MouseEvent('mousedown'));

    // Wait for delay
    jest.runTimersToTime(100);

    expect(container.classList)
      .not
      .toContain('draggable-container--is-dragging');
  });
});
