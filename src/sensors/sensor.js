export default class Sensor {
  constructor(containers = [], options = {}) {
    this.containers = containers;
    this.options = options;
  }

  attach() {
    return this;
  }

  detach() {
    return this;
  }

  trigger(element, sensorEvent) {
    const event = document.createEvent('Event');
    event.detail = sensorEvent;
    event.initEvent(sensorEvent.type, true, true);
    element.dispatchEvent(event);
    this.lastEvent = sensorEvent;
    return sensorEvent;
  }
}
