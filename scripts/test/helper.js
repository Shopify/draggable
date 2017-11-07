/**
 * Whitelist of sensor event types to keep track of.
 *
 * Helps avoid cluttering caught sensor events with unwanted events.
 *
 * @type {String[]}
 * @final
 */
const sensorEventTypes = [
  'drag:move',
  'drag:start',
  'drag:stop'
];

let sensorEvents = {};

export function listenToSensorEvents() {
  for (const type of sensorEventTypes) {
    document.addEventListener(type, catchSensorEvent);
  }
}

export function restoreSensorEvents() {
  sensorEvents = {};

  for (const type of sensorEventTypes) {
    document.removeEventListener(type, catchSensorEvent);
  }
}

function catchSensorEvent(event) {
  const sensorEvent = event.detail;

  if (!sensorEvents[event.type]) {
    sensorEvents[event.type] = [];
  }

  sensorEvents[event.type].push(sensorEvent);
}

export function getSensorEventsByType(type) {
  const events = sensorEvents[type] || [];
  return events;
}

export function getLastSensorEventByType(type) {
  const events = sensorEvents[type] || [];
  return events[events.length - 1];
}

export function createSandbox(content) {
  const sandbox = document.createElement('div');
  sandbox.innerHTML = content;
  document.body.appendChild(sandbox);
  return sandbox;
}

/**
 * Trigger an event with provided configuration on a given element
 *
 * @param {Element} element Element to dispatch event upon
 * @param {String} type The type of event to create
 * @param {Object} data Additional context data to set on the event
 * @return {Event}
 */
export function triggerEvent(element, type, data = {}) {
  const event = document.createEvent('Event');
  event.initEvent(type, true, true);
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      event[key] = data[key];
    }
  }
  element.dispatchEvent(event);
  return event;
}
