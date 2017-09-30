import Draggable,
{
  defaultOptions
} from 'draggable';

import Accessibility from 'core/accessibility';
import Mirror from 'core/mirror';

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

import DragSensor from 'sensors/drag-sensor';
import MouseSensor from 'sensors/mouse-sensor';
import TouchSensor from 'sensors/touch-sensor';
import ForceTouchSensor from 'sensors/force-touch-sensor';

const sampleMarkup = `
  <ul>
    <li>First item</li>
    <li>Second item</li>
  </ul>
`;

/**
 * A test stub for a Plugin
 *
 * @class StubPlugin
 */
class StubPlugin {
  /**
   * Constructor.
   *
   * @constructor
   * @param {Draggable} draggable
   */
  constructor(draggable) {
    this.numTimesAttachCalled = 0;
    this.numTimesDetachCalled = 0;
    this.draggable = draggable;
    this.wasAttached = false;
    this.wasDetached = false;
  }

  /**
   * Stubbed attach method
   */
  attach() {
    this.numTimesAttachCalled++;
    this.wasAttached = true;
  }

  /**
   * Stubbed detach method
   */
  detach() {
    this.numTimesDetachCalled++;
    this.wasDetached = true;
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
        expect(newInstance.options[key])
          .toBe(defaultOptions[key]);
      }
    });

    test('should call Plugin#attach once on each of provided plugins', () => {
      const containers = sandbox.querySelectorAll('ul');
      const newInstance = new Draggable(containers, {
        plugins: [StubPlugin, StubPlugin, StubPlugin]
      });

      expect(newInstance.activePlugins.length).toBe(3);

      newInstance.activePlugins.forEach((plugin) => {
        expect(plugin).toBeInstanceOf(StubPlugin);
      });

      expect(newInstance.activePlugins[0].wasAttached).toBe(true);
      expect(newInstance.activePlugins[0].numTimesAttachCalled).toBe(1);

      expect(newInstance.activePlugins[1].wasAttached).toBe(true);
      expect(newInstance.activePlugins[1].numTimesAttachCalled).toBe(1);

      expect(newInstance.activePlugins[2].wasAttached).toBe(true);
      expect(newInstance.activePlugins[2].numTimesAttachCalled).toBe(1);
    });

    // TODO: Add coverage for calling Sensor#attach
    test('should register sensors', () => {
      const containers = sandbox.querySelectorAll('ul');
      const newInstance = new Draggable(containers);

      expect(newInstance.activeSensors.length).toBe(3);
    });
  });

  describe('#sensors', () => {
    test('should return default sensors for non-native (web) configuration', () => {
      const containers = sandbox.querySelectorAll('ul');
      const newInstance = new Draggable(containers, {
        native: false,
      });
      const sensors = newInstance.sensors();

      expect(new sensors[0]).toBeInstanceOf(TouchSensor);
      expect(new sensors[1]).toBeInstanceOf(ForceTouchSensor);
      expect(new sensors[2]).toBeInstanceOf(MouseSensor);
    });

    test('should return native sensors for native (mobile) configuration', () => {
      const containers = sandbox.querySelectorAll('ul');
      const newInstance = new Draggable(containers, {
        native: true,
      });
      const sensors = newInstance.sensors();

      expect(new sensors[0]).toBeInstanceOf(TouchSensor);
      expect(new sensors[1]).toBeInstanceOf(ForceTouchSensor);
      expect(new sensors[2]).toBeInstanceOf(DragSensor);
    });
  });

  describe('#destroy', () => {
    test('triggers `draggable:destroy` event on destroy', () => {
      const callback = jest.fn();
      draggable.on('draggable:destroy', callback);

      draggable.destroy();

      const call = callback.mock.calls[0][0];
      expect(call.type).toBe('draggable:destroy');
      expect(call).toBeInstanceOf(DraggableDestroyEvent);
      expect(call.draggable).toBe(draggable);
    });

    test('should call Plugin#detach once on each of provided plugins', () => {
      const containers = sandbox.querySelectorAll('ul');
      const newInstance = new Draggable(containers, {
        plugins: [StubPlugin, StubPlugin, StubPlugin]
      });

      newInstance.destroy();

      expect(newInstance.activePlugins[0].wasDetached).toBe(true);
      expect(newInstance.activePlugins[0].numTimesDetachCalled).toBe(1);

      expect(newInstance.activePlugins[1].wasDetached).toBe(true);
      expect(newInstance.activePlugins[1].numTimesDetachCalled).toBe(1);

      expect(newInstance.activePlugins[2].wasDetached).toBe(true);
      expect(newInstance.activePlugins[2].numTimesDetachCalled).toBe(1);
    });
  });

  describe('#on', () => {
    test('should add an event handler to the list of callbacks', () => {
      const stubHandler = () => {};

      expect('my:event' in draggable.callbacks).toBe(false);

      draggable.on('my:event', stubHandler);

      expect('my:event' in draggable.callbacks).toBe(true);
      expect(draggable.callbacks['my:event']).toMatchObject([stubHandler]);
    });

    test('should return draggable instance', () => {
      const stubHandler = () => {};

      expect('my:event' in draggable.callbacks).toBe(false);

      const returnValue = draggable.on('my:event', stubHandler);

      expect(returnValue).toBe(draggable);
    });
  });

  describe('#off', () => {
    test('should return null if event was not bound', () => {
      const stubHandler = () => {};

      expect('my:event' in draggable.callbacks).toBe(false);

      const returnValue = draggable.off('my:event', stubHandler);

      expect(returnValue).toBe(null);
    });

    test('should remove event handler from the list of callbacks', () => {
      const stubHandler = () => {};

      draggable.on('my:event', stubHandler);

      expect('my:event' in draggable.callbacks).toBe(true);

      draggable.off('my:event', stubHandler);

      expect('my:event' in draggable.callbacks).toBe(true);
      expect(draggable.callbacks['my:event']).toMatchObject([]);
    });
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

    triggerEvent(draggableElement, 'mousedown');

    // Wait for delay
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

  test('adds `source:dragging` classname to draggable element on mousedown', () => {
    const draggableElement = sandbox.querySelector('li');

    triggerEvent(draggableElement, 'mousedown');

    // Wait for delay
    jest.runTimersToTime(100);

    expect(draggable.source.classList)
      .toContain('draggable-source--is-dragging');
  });

  test('removes `source:dragging` classname from draggable element on mouseup', () => {
    const draggableElement = sandbox.querySelector('li');

    triggerEvent(draggableElement, 'mousedown');

    // Wait for delay
    jest.runTimersToTime(100);

    const source = draggable.source;

    expect(source.classList)
      .toContain('draggable-source--is-dragging');

    triggerEvent(draggableElement, 'mouseup');

    expect(source.classList)
      .not
      .toContain('draggable-source--is-dragging');
  });

  test('removes `source:dragging` classname from draggable element on dragEvent.cancel()', () => {
    const draggableElement = sandbox.querySelector('li');

    draggable.on('drag:start', (event) => {
      event.cancel();
    });

    triggerEvent(draggableElement, 'mousedown');

    // Wait for delay
    jest.runTimersToTime(100);

    const source = draggable.source;

    expect(source.classList)
      .not
      .toContain('draggable-source--is-dragging');
  });

  test('adds `body:dragging` classname to body on mousedown', () => {
    const draggableElement = sandbox.querySelector('li');

    triggerEvent(draggableElement, 'mousedown');

    // Wait for delay
    jest.runTimersToTime(100);

    expect(document.body.classList)
      .toContain('draggable--is-dragging');
  });

  test('removes `body:dragging` classname from body on mouseup', () => {
    const draggableElement = sandbox.querySelector('li');

    triggerEvent(draggableElement, 'mousedown');

    // Wait for delay
    jest.runTimersToTime(100);

    expect(document.body.classList)
      .toContain('draggable--is-dragging');

    triggerEvent(draggableElement, 'mouseup');

    expect(document.body.classList)
      .not
      .toContain('draggable--is-dragging');
  });

  test('removes `body:dragging` classname from body on dragEvent.cancel()', () => {
    const draggableElement = sandbox.querySelector('li');

    draggable.on('drag:start', (event) => {
      event.cancel();
    });

    triggerEvent(draggableElement, 'mousedown');

    // Wait for delay
    jest.runTimersToTime(100);

    expect(document.body)
      .not
      .toContain('draggable--is-dragging');
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

  test('removes `source:placed` classname from draggable source element on mouseup after delay', () => {
    const draggableElement = sandbox.querySelector('li');

    triggerEvent(draggableElement, 'mousedown');

    // Wait for delay
    jest.runTimersToTime(100);

    const source = draggable.source;

    triggerEvent(draggableElement, 'mouseup');

    expect(source.classList)
      .toContain('draggable-source--placed');

    // Wait for default draggable.options.placedTimeout delay
    jest.runTimersToTime(800);

    expect(source.classList)
      .not
      .toContain('draggable-source--placed');
  });

  test('adds `container:placed` classname to draggable container element on mouseup', () => {
    const draggableElement = sandbox.querySelector('li');
    const container = sandbox.querySelector('ul');

    triggerEvent(draggableElement, 'mousedown');

    // Wait for delay
    jest.runTimersToTime(100);

    triggerEvent(draggableElement, 'mouseup');

    expect(container.classList)
      .toContain('draggable-container--placed');
  });

  test('removes `container:placed` classname from draggable container element on mouseup after delay', () => {
    const draggableElement = sandbox.querySelector('li');
    const container = sandbox.querySelector('ul');

    triggerEvent(draggableElement, 'mousedown');

    // Wait for delay
    jest.runTimersToTime(100);

    triggerEvent(draggableElement, 'mouseup');

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

    triggerEvent(draggableElement, 'mousedown');

    // Wait for delay
    jest.runTimersToTime(100);

    expect(container.classList)
      .toContain('draggable-container--is-dragging');
  });

  test('removes `container:dragging` classname from draggable container element on mouseup', () => {
    const draggableElement = sandbox.querySelector('li');
    const container = sandbox.querySelector('ul');

    triggerEvent(draggableElement, 'mousedown');

    // Wait for delay
    jest.runTimersToTime(100);

    expect(container.classList)
      .toContain('draggable-container--is-dragging');

    triggerEvent(draggableElement, 'mouseup');

    expect(container.classList)
      .not
      .toContain('draggable-container--is-dragging');
  });

  test('removes `container:dragging` classname from draggable container element on dragEvent.cancel()', () => {
    const draggableElement = sandbox.querySelector('li');
    const container = sandbox.querySelector('ul');

    draggable.on('drag:start', (event) => {
      event.cancel();
    });

    triggerEvent(draggableElement, 'mousedown');

    // Wait for delay
    jest.runTimersToTime(100);

    expect(container.classList)
      .not
      .toContain('draggable-container--is-dragging');
  });
});
