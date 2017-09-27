import MouseSensor from 'sensors/mouse-sensor';

import {
  createSandbox,
  triggerEvent,
  listenToSensorEvents,
  restoreSensorEvents,
  getSensorEventsByType,
  getLastSensorEventByType,
} from 'helper';

const sampleMarkup = `
  <ul>
    <li>First item</li>
    <li>Second item</li>
  </ul>
`;

describe('MouseSensor', () => {
  let sandbox;
  let mouseSensor;

  beforeEach(() => {
    jest.useFakeTimers();
    listenToSensorEvents();
    sandbox = createSandbox(sampleMarkup);
    const containers = sandbox.querySelectorAll('ul');
    mouseSensor = new MouseSensor(containers, {delay: 0});
    mouseSensor.attach();
  });

  afterEach(() => {
    restoreSensorEvents();
    sandbox.parentNode.removeChild(sandbox);
  });

  test('triggers `drag:start` sensor event on mousedown', () => {
    const draggable = sandbox.querySelector('li');
    document.elementFromPoint = () => draggable;
    triggerEvent(draggable, 'mousedown');

    // Wait for delay
    jest.runTimersToTime(1);

    const sensorEvent = getLastSensorEventByType('drag:start');
    expect(sensorEvent.type).toBe('drag:start');
  });

  test('cancels `drag:start` event when canceling sensor event', () => {
    const draggable = sandbox.querySelector('li');
    document.elementFromPoint = () => draggable;
    triggerEvent(draggable, 'mousedown');

    sandbox.addEventListener('drag:start', (event) => {
      event.detail.cancel();
    });

    // Wait for delay
    jest.runTimersToTime(1);

    const sensorEvent = getLastSensorEventByType('drag:start');
    expect(mouseSensor.dragging).toBe(false);
    expect(sensorEvent.canceled()).toBe(true);
  });

  test('does not trigger `drag:start` event releasing mouse before timeout', () => {
    const draggable = sandbox.querySelector('li');
    document.elementFromPoint = () => draggable;
    triggerEvent(draggable, 'mousedown');
    triggerEvent(document.body, 'mouseup');

    // Wait for delay
    jest.runTimersToTime(1);

    expect(mouseSensor.dragging).toBe(false);
    expect(getLastSensorEventByType('drag:start')).toBeUndefined();
    expect(getLastSensorEventByType('drag:move')).toBeUndefined();
    expect(getLastSensorEventByType('drag:stop')).toBeUndefined();
  });

  test('triggers `drag:move` event while moving the mouse', () => {
    const draggable = sandbox.querySelector('li');
    document.elementFromPoint = () => draggable;
    triggerEvent(draggable, 'mousedown');

    // Wait for delay
    jest.runTimersToTime(1);

    triggerEvent(document.body, 'mousemove');
    expect(getSensorEventsByType('drag:move').length).toBe(1);

    triggerEvent(document.body, 'mousemove');
    expect(getSensorEventsByType('drag:move').length).toBe(2);
  });

  test('triggers `drag:stop` event when releasing mouse', () => {
    const draggable = sandbox.querySelector('li');
    document.elementFromPoint = () => draggable;
    triggerEvent(draggable, 'mousedown');

    // Wait for delay
    jest.runTimersToTime(1);

    triggerEvent(document.body, 'mousemove');
    expect(getSensorEventsByType('drag:move').length).toBe(1);

    triggerEvent(document.body, 'mouseup');
    expect(getLastSensorEventByType('drag:stop')).toBeDefined();
  });

  test('does not trigger `drag:start` event when right clicking', () => {
    const draggable = sandbox.querySelector('li');
    document.elementFromPoint = () => draggable;
    triggerEvent(draggable, 'mousedown', {button: 2});

    // Wait for delay
    jest.runTimersToTime(1);

    expect(getLastSensorEventByType('drag:start')).toBeUndefined();
  });

  test('does not trigger `drag:start` event when clicking on none draggable element', () => {
    const draggable = sandbox.querySelector('li');
    document.elementFromPoint = () => draggable;
    triggerEvent(document.body, 'mousedown');

    // Wait for delay
    jest.runTimersToTime(1);

    expect(getLastSensorEventByType('drag:start')).toBeUndefined();
  });
});
