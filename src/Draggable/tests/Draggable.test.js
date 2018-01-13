import {
  createSandbox,
  triggerEvent,
  PluginStub,
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

import {
  Accessibility,
  Mirror,
  AutoScroll,
} from './../Plugins';

import {
  MouseSensor,
  TouchSensor,
} from './../Sensors';

const sampleMarkup = `
  <ul>
    <li>First item</li>
    <li>Second item</li>
  </ul>
`;

describe('Draggable', () => {
  let sandbox;
  let containers;
  const expectedClientX = 39;
  const expectedClientY = 82;

  beforeEach(() => {
    jest.useFakeTimers();
    sandbox = createSandbox(sampleMarkup);
    containers = sandbox.querySelectorAll('ul');
  });

  afterEach(() => {
    sandbox.parentNode.removeChild(sandbox);
  });

  describe('.Plugins', () => {
    test('should be available statically', () => {
      expect(Draggable.Plugins).toBeDefined();
      expect(Draggable.Plugins.Mirror).toEqual(Mirror);
      expect(Draggable.Plugins.Accessibility).toEqual(Accessibility);
      expect(Draggable.Plugins.AutoScroll).toEqual(AutoScroll);
    });
  });

  describe('#constructor', () => {
    test('should be an instance of Draggable', () => {
      const draggable = new Draggable(containers, {
        draggable: 'li',
        delay: 0,
      });

      expect(draggable).toBeInstanceOf(Draggable);
    });

    test('should initialize with default options', () => {
      const newInstance = new Draggable(containers);

      for (const key in defaultOptions) {
        if (defaultOptions.hasOwnProperty(key)) {
          expect(newInstance.options[key])
            .toBe(defaultOptions[key]);
        }
      }
    });

    test('should set containers', () => {
      const newInstance = new Draggable(containers);

      expect(newInstance.containers)
        .toMatchObject(Array.prototype.slice.call(containers));
    });

    test('should set single container if a list is not passed', () => {
      const newInstance = new Draggable(containers[0]);

      expect(newInstance.containers)
        .toMatchObject([containers[0]]);
    });

    test('should throw error if `containers` argument is wrong type', () => {
      expect(() => {
        return new Draggable({});
      }).toThrow();

      expect(() => {
        return new Draggable('.li');
      }).toThrow();
    });

    test('should attach default plugins', () => {
      const newInstance = new Draggable();

      expect(newInstance.plugins.length)
        .toBe(3);

      expect(newInstance.plugins[0])
        .toBeInstanceOf(Mirror);

      expect(newInstance.plugins[1])
        .toBeInstanceOf(Accessibility);

      expect(newInstance.plugins[2])
        .toBeInstanceOf(AutoScroll);
    });

    test('should attach custom plugins', () => {
      const newInstance = new Draggable([], {
        plugins: [
          PluginStub,
        ],
      });

      expect(newInstance.plugins.length)
        .toBe(4);

      const customPlugin = newInstance.plugins[3];

      expect(customPlugin.draggable).toBe(newInstance);

      expect(customPlugin.attachWasCalled)
        .toBe(true);

      expect(customPlugin.detachWasCalled)
        .toBe(false);
    });

    test('should attach sensors', () => {
      const newInstance = new Draggable([], {
        native: false,
      });

      expect(newInstance.sensors.length)
        .toBe(2);

      expect(newInstance.sensors[0])
        .toBeInstanceOf(MouseSensor);

      expect(newInstance.sensors[1])
        .toBeInstanceOf(TouchSensor);
    });

    test('should trigger DraggableInitializedEvent on init', () => {
      const spy = jest.spyOn(Draggable.prototype, 'trigger');
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
      const plugins = [PluginStub, PluginStub, PluginStub];
      const newInstance = new Draggable([], {
        plugins,
      });
      const expectedPlugins = newInstance.plugins.slice();

      newInstance.destroy();

      expect(expectedPlugins[3].detachWasCalled)
        .toBe(true);

      expect(expectedPlugins[3].numTimesDetachCalled)
        .toBe(1);

      expect(expectedPlugins[4].detachWasCalled)
        .toBe(true);

      expect(expectedPlugins[4].numTimesDetachCalled)
        .toBe(1);

      expect(expectedPlugins[5].detachWasCalled)
        .toBe(true);

      expect(expectedPlugins[5].numTimesDetachCalled)
        .toBe(1);
    });

    test('should remove all sensor event listeners', () => {
      document.removeEventListener = jest.fn();

      const newInstance = new Draggable();

      newInstance.destroy();

      const mockCalls = document.removeEventListener.mock.calls;

      expect(mockCalls[0][0]).toEqual('drag:start');
      expect(mockCalls[1][0]).toEqual('drag:move');
      expect(mockCalls[2][0]).toEqual('drag:stop');
      expect(mockCalls[3][0]).toEqual('drag:pressure');

      document.removeEventListener.mockRestore();
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

  describe('#trigger', () => {
    test('should invoke bound event', () => {
      const newInstance = new Draggable(containers);
      const handler = jest.fn();
      const expectedEvent = new Event('my:event');

      newInstance.on('my:event', handler);

      newInstance.trigger(expectedEvent);

      expect(handler.mock.calls.length)
        .toBe(1);

      expect(handler.mock.calls[0].length)
        .toBe(1);

      expect(handler.mock.calls[0][0])
        .toBe(expectedEvent);
    });
  });

  test('triggers `drag:start` drag event on mousedown', () => {
    const newInstance = new Draggable(containers, {
      draggable: 'li',
    });
    const draggableElement = sandbox.querySelector('li');
    document.elementFromPoint = () => draggableElement;

    const callback = jest.fn();
    newInstance.on('drag:start', callback);

    triggerEvent(draggableElement, 'mousedown', {button: 0});

    // Wait for delay
    jest.runTimersToTime(100);

    const call = callback.mock.calls[0][0];

    expect(call.type)
      .toBe('drag:start');

    expect(call)
      .toBeInstanceOf(DragStartEvent);
  });

  test('should trigger `drag:start` drag event on dragstart', () => {
    const newInstance = new Draggable(containers, {
      draggable: 'li',
    });
    const draggableElement = sandbox.querySelector('li');
    document.elementFromPoint = () => draggableElement;

    const callback = jest.fn();
    newInstance.on('drag:start', callback);

    triggerEvent(draggableElement, 'mousedown', {button: 0});

    // Wait for delay
    jest.runTimersToTime(100);

    triggerEvent(draggableElement, 'dragstart', {button: 0});

    const call = callback.mock.calls[0][0];

    expect(call.type)
      .toBe('drag:start');

    expect(call)
      .toBeInstanceOf(DragStartEvent);
  });

  test('triggers `drag:move` drag event on mousedown', () => {
    const newInstance = new Draggable(containers, {
      draggable: 'li',
    });
    const draggableElement = sandbox.querySelector('li');
    document.elementFromPoint = () => draggableElement;

    triggerEvent(draggableElement, 'mousedown', {button: 0});

    // Wait for delay
    jest.runTimersToTime(100);

    const callback = jest.fn();
    newInstance.on('drag:move', callback);

    triggerEvent(document, 'mousemove', {
      clientX: expectedClientX,
      clientY: expectedClientY,
    });

    const call = callback.mock.calls[0][0];
    const sensorEvent = call.data.sensorEvent;

    expect(call.type)
      .toBe('drag:move');

    expect(call)
      .toBeInstanceOf(DragMoveEvent);

    expect(sensorEvent.clientX)
      .toBe(expectedClientX);

    expect(sensorEvent.clientY)
      .toBe(expectedClientY);
  });

  test('triggers `drag:stop` drag event on mouseup', () => {
    const newInstance = new Draggable(containers, {
      draggable: 'li',
    });
    const draggableElement = sandbox.querySelector('li');
    document.elementFromPoint = () => draggableElement;

    triggerEvent(draggableElement, 'mousedown', {button: 0});

    // Wait for delay
    jest.runTimersToTime(100);

    const callback = jest.fn();
    newInstance.on('drag:stop', callback);

    triggerEvent(draggableElement, 'mouseup', {button: 0});

    const call = callback.mock.calls[0][0];

    expect(call.type)
      .toBe('drag:stop');

    expect(call)
      .toBeInstanceOf(DragStopEvent);
  });

  test('adds `source:dragging` classname to draggable element on mousedown', () => {
    const newInstance = new Draggable(containers, {
      draggable: 'li',
    });
    const draggableElement = sandbox.querySelector('li');
    document.elementFromPoint = () => draggableElement;

    triggerEvent(draggableElement, 'mousedown', {button: 0});

    // Wait for delay
    jest.runTimersToTime(100);

    expect(newInstance.source.classList)
      .toContain('draggable-source--is-dragging');
  });

  test('removes `source:dragging` classname from draggable element on mouseup', () => {
    const newInstance = new Draggable(containers, {
      draggable: 'li',
    });
    const draggableElement = sandbox.querySelector('li');
    document.elementFromPoint = () => draggableElement;

    triggerEvent(draggableElement, 'mousedown', {button: 0});

    // Wait for delay
    jest.runTimersToTime(100);

    const source = newInstance.source;

    expect(source.classList)
      .toContain('draggable-source--is-dragging');

    triggerEvent(draggableElement, 'mouseup', {button: 0});

    expect(source.classList)
      .not
      .toContain('draggable-source--is-dragging');
  });

  test('removes `source:dragging` classname from draggable element on dragEvent.cancel()', () => {
    const newInstance = new Draggable(containers, {
      draggable: 'li',
    });
    const draggableElement = sandbox.querySelector('li');
    document.elementFromPoint = () => draggableElement;

    newInstance.on('drag:start', (event) => {
      expect(newInstance.source.classList)
        .toContain('draggable-source--is-dragging');

      event.cancel();
    });

    triggerEvent(draggableElement, 'mousedown', {button: 0});

    // Wait for delay
    jest.runTimersToTime(100);

    const source = newInstance.source;

    expect(source.classList)
      .not
      .toContain('draggable-source--is-dragging');
  });

  test('adds `body:dragging` classname to body on mousedown', () => {
    (() => new Draggable(containers, {
      draggable: 'li',
    }))();
    const draggableElement = sandbox.querySelector('li');
    document.elementFromPoint = () => draggableElement;

    triggerEvent(draggableElement, 'mousedown', {button: 0});

    // Wait for delay
    jest.runTimersToTime(100);

    expect(document.body.classList)
      .toContain('draggable--is-dragging');
  });

  test('removes `body:dragging` classname from body on mouseup', () => {
    (() => new Draggable(containers, {
      draggable: 'li',
    }))();
    const draggableElement = sandbox.querySelector('li');
    document.elementFromPoint = () => draggableElement;

    triggerEvent(draggableElement, 'mousedown', {button: 0});

    // Wait for delay
    jest.runTimersToTime(100);

    expect(document.body.classList)
      .toContain('draggable--is-dragging');

    triggerEvent(document, 'mouseup', {button: 0});

    expect(document.body.classList)
      .not
      .toContain('draggable--is-dragging');
  });

  test('removes `body:dragging` classname from body on dragEvent.cancel()', () => {
    const newInstance = new Draggable(containers, {
      draggable: 'li',
    });
    const draggableElement = sandbox.querySelector('li');
    document.elementFromPoint = () => draggableElement;

    newInstance.on('drag:start', (event) => {
      expect(document.body.classList)
        .toContain('draggable--is-dragging');

      event.cancel();
    });

    triggerEvent(draggableElement, 'mousedown', {button: 0});

    // Wait for delay
    jest.runTimersToTime(100);

    expect(document.body.classList)
      .not
      .toContain('draggable--is-dragging');
  });

  test('adds `container:placed` classname to draggable container element on mouseup', () => {
    (() => new Draggable(containers, {
      draggable: 'li',
    }))();
    const draggableElement = sandbox.querySelector('li');
    document.elementFromPoint = () => draggableElement;

    triggerEvent(draggableElement, 'mousedown', {button: 0});

    // Wait for delay
    jest.runTimersToTime(100);

    triggerEvent(draggableElement, 'mouseup', {button: 0});

    expect(containers[0].classList)
      .toContain('draggable-container--placed');
  });

  test('removes `container:placed` classname from draggable container element on mouseup after delay', () => {
    (() => new Draggable(containers, {
      draggable: 'li',
    }))();
    const draggableElement = sandbox.querySelector('li');
    document.elementFromPoint = () => draggableElement;

    triggerEvent(draggableElement, 'mousedown', {button: 0});

    // Wait for delay
    jest.runTimersToTime(100);

    triggerEvent(document, 'mouseup', {button: 0});

    expect(containers[0].classList)
      .toContain('draggable-container--placed');

    // Wait for default draggable.options.placedTimeout delay
    jest.runTimersToTime(800);

    expect(containers[0].classList)
      .not
      .toContain('draggable-container--placed');
  });

  test('adds `container:dragging` classname to draggable container element on mousedown', () => {
    (() => new Draggable(containers, {
      draggable: 'li',
    }))();
    const draggableElement = sandbox.querySelector('li');
    document.elementFromPoint = () => draggableElement;

    triggerEvent(draggableElement, 'mousedown', {button: 0});

    // Wait for delay
    jest.runTimersToTime(100);

    expect(containers[0].classList)
      .toContain('draggable-container--is-dragging');
  });

  test('removes `container:dragging` classname from draggable container element on mouseup', () => {
    (() => new Draggable(containers, {
      draggable: 'li',
    }))();
    const draggableElement = sandbox.querySelector('li');
    document.elementFromPoint = () => draggableElement;

    triggerEvent(draggableElement, 'mousedown', {button: 0});

    // Wait for delay
    jest.runTimersToTime(100);

    expect(containers[0].classList)
      .toContain('draggable-container--is-dragging');

    triggerEvent(document, 'mouseup', {button: 0});

    expect(containers[0].classList)
      .not
      .toContain('draggable-container--is-dragging');
  });

  test('removes `container:dragging` classname from draggable container element on dragEvent.cancel()', () => {
    const newInstance = new Draggable(containers, {
      draggable: 'li',
    });
    const draggableElement = sandbox.querySelector('li');

    newInstance.on('drag:start', (event) => {
      expect(containers[0].classList)
        .toContain('draggable-container--is-dragging');

      event.cancel();
    });

    triggerEvent(draggableElement, 'mousedown', {button: 0});

    // Wait for delay
    jest.runTimersToTime(100);

    expect(containers[0].classList)
      .not
      .toContain('draggable-container--is-dragging');
  });

  test('adds and removes `source:original` on start and stop', () => {
    const newInstance = new Draggable(containers, {
      draggable: 'li',
    });
    const draggableElement = sandbox.querySelector('li');
    document.elementFromPoint = () => draggableElement;

    triggerEvent(draggableElement, 'mousedown', {button: 0});

    // Wait for delay
    jest.runTimersToTime(100);

    expect(draggableElement.classList.contains(newInstance.getClassNameFor('source:original'))).toBeTruthy();

    triggerEvent(document, 'mouseup', {button: 0});

    expect(draggableElement.classList.contains(newInstance.getClassNameFor('source:original'))).toBeFalsy();
  });
});
